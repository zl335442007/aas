/**
 * Created by JKH on 2016/10/9.
 */
$(function () {
    var addressimg = shareurl+"/static_www/activity/redrain/images";//图片地址
    var addressimgup = shareurl+"/static_www/activity/redrain/images";//上级图片地址
    var starttime = null;
    var endtime = null;
    var nowtime = null;
    var packagebag = [];
    var packageCount = 0;
    var moneyCount = 0;
    var ticketCount = 0;
    var ticketnum = 0;
    var cashquan = '';//现金通用券非0
    var brandquan = '';//品牌通用券0
    var rankper;
    var top;
    var cidArr = [];
    var reback = {
                    season:null,//场次
                    totalmoney:null,//总金额
                    list:null,//得到券的id
                    totalquan:null,//得到的总券ID
                    totalcash:null//得到的总红包金额
                }; 
    var indexTemp=[];
    $.ajax({
        type:'post',
        datatype:'jsonp',
        xhrFields:{
            withCredentials:true
        },
        crossDomain:true,
        jsonp:"jsoncallback",
        url:'http://sale'+cookiedomain+'/1610/apiredrain.html?app='+app+'&action='+action,
        success:function(data){
                var time = $.parseJSON(data);
                var timerval = setInterval(function(){
                   time.nowtime++;
                   if(time.nowtime >= time.starttime && time.nowtime < time.endtime){
                       module.init();
                       clearInterval(timerval);
                   }
               },1000);
        }
    });
    var module = {
        _elements:{
            packageContainer:$('.package-container')
        },
        init:function(){
            this.setContainer();
            this.setStep2();
            $("#rbrain").on("click",".shut",function(){
                module.close();
            });
        },
        /*最外层*/
        setContainer:function(){
            $("body").prepend($('<div id="rbrain"><div class="medal medalbg"></div></div>'));
        },
        /** 设置遮罩层高度*/
        setDiv:function () {
            $('<div class="step3"><div class="title clearfix"><img class="fr shut" src="'+addressimg+'/close.png" alt=""></div><div class="rlogo rela ftc"><div class="time abs"><img src="'+addressimg+'/time.png" alt=""><span class="second abs bold">10</span></div><img src="'+addressimg+'/xx.png" alt=""><div class="quan abs ftc ft18 cfff">代金券：<span class="num">0</span></div><div class="cash abs ftc ft18 cfff">红包：¥<span class="num">0</span></div></div><div class="package-container"><div class="pre-load"><img src="'+addressimg+'/red_full.png"><img src="'+addressimg+'/red_empty.png"><img src="'+addressimg+'/money.png"><img src="'+addressimg+'/ticket.png"><img src="'+addressimg+'/yellow_empty.png"><img src="'+addressimg+'/yellow_full.png"></div></div></div>')
                .clone().appendTo($("#rbrain .medal"));
        },
        /*关闭遮罩层*/
        close:function(){
            $("#rbrain").remove();
        },
        /*进入为开抢页面*/
        setStep2:function(){
            $("#rbrain .medal").html('<div class="step2"><div class="title clearfix"><img class="fr shut" src="'+addressimg+'/close.png" alt=""></div><div class="pic"><img src="'+addressimg+'/countdown.png" alt=""></div><div class="begin"><a class="bold">开始游戏</a></div><p class="tips cfff ft18 ftc mt5"><span>10</span>秒内<span class="bold"> 代金券、现金红包 </span>多抢夺得！</p></div>');
            $("#rbrain .medal .step2").on("click",".begin",function(){
                    $.ajax({
                        type: 'post',
                        url: 'http://sale' + cookiedomain + '/1610/apiredrain.html?do=isLog',
                        data: reback,
                        datatype: 'jsonp',
                        xhrFields:{
                            withCredentials:true
                        },
                        crossDomain:true,
                        jsonp: "jsoncallback",
                        success: function (data) {
                            if (data=='nologin') {
                                var href = window.location.href;
                                window.location.href = 'http://passport.gutou.com/login.html?referer=' + href;
                            } else {
                                $.ajax({
                                    type:'post',
                                    datatype:'jsonp',
                                    xhrFields:{
                                        withCredentials:true
                                    },   
                                    crossDomain:true,
                                    jsonp:"jsoncallback",
                                    url:'http://sale'+cookiedomain+'/1610/apiredrain.html?app='+app+'&action='+action,
                                    success:function(data){
                                        packagebag = $.parseJSON(data);
                                        module.begin();
                                    }
                                });
                                $("#rbrain .medal").html('');
                                module.setDiv();
                                timer = setInterval(module.countdown,1000);
                            }
                        }
                    });

            });
        },
        /*开始抢红包*/
        begin:function(){
            this.redPackage();
            this.yellowPackage();
            this.newPackage();
        },
        /*倒计时10秒*/
        countdown:function(){
            var val = parseInt($("#rbrain .medal .step3 .rlogo .second").html());
            if(val > 0) {
                val--;
                val = '0' + val;
                $("#rbrain .medal .step3 .rlogo .second").html(val);
            }else{
                clearInterval(timer);
                for(var i = 0;i<indexTemp.length;i++) {
                    cidArr.push(packagebag.list[indexTemp[i]].cid);
                }
                var reback = {
                    season:packagebag.season,//场次
                    totalmoney:packagebag.totalmoney,//总金额
                    list:cidArr.length>0?cidArr:null,//得到券的id
                    totalquan:$("#rbrain .medal .step3 .rlogo .quan .num").text(),//得到的总券ID
                    totalcash:$("#rbrain .medal .step3 .rlogo .cash .num").text()//得到的总红包金额
                };
             $.ajax({
                    type:'post',
                    url:'http://sale'+cookiedomain+'/1610/apiredrain.html?do=addcodes&app='+app+'&action='+action,
                    data:reback,
                    datatype:'jsonp',
                    xhrFields:{
                        withCredentials:true
                    },
                    crossDomain:true,
                    jsonp:"jsoncallback",
                    success:function(data){
                        //if(data.name == "0") {
                        //    //$("#rbain .rlogo .duo").prepend("<img class='duo' src='''+addressimg+'/1.png' alt=''>");
                        //    $("#rbain .rlogo .duo").attr("src","'+addressimg+'/1.png");
                        //}else if(data.name == "1"){
                        //    $("#rbain .rlogo .duo").attr("src","'+addressimg+'/2.png");
                        //}else if(data.name == "2"){
                        //    $("#rbain .rlogo .duo").attr("src","'+addressimg+'/3.png");
                        //}else {
                        //    $("#rbain .rlogo .duo").attr("src","'+addressimg+'/4.png");
                        //}
                        if(data.code == "alert") {
                            alert(data.msg);
                        }else {
                            top = $.parseJSON(data);
                            val = '0' + val;
                            $("#rbrain .medal .step3 .rlogo .second").html(val);
                            if(ticketnum == 0 && moneyCount.toFixed(2) == 0) {
                                $("#rbrain .medal").html('<div class="step4"><div class="title clearfix"><img class="fr shut" src="'+addressimg+'/close.png" alt=""></div><div class="rlogo rela ftc"><img class="duo" src="'+addressimg+'/duo.png" alt=""><div class="quan abs ftc ft18 cfff">代金券：<span class="num">0</span></div><div class="cash abs ftc ft18 cfff">红包：¥<span class="num">0</span></div></div><div class="info clearfix"><div class="fl con left"><div class="pic ftc"><img src="'+addressimg+'/prise.png" alt=""></div><div class="wrapper"><div class="none ftc mt20"><img src="'+addressimg+'/none.png" alt=""></div></div></div><div class="fr con right"><div class="pic ftc"><img src="'+addressimg+'/top.png" alt=""></div><div class="top pur ft16 top1"><img class="" src="'+addressimg+'/top1.png" alt=""><span class="name cfff">'+top[0].nickname+'</span><span class="ticketq"><img class="ticket" src="'+addressimg+'/tickets.png" alt="">代金券:<span class="numt">'+top[0].code_num+'</span></span><span class="moneyc"><img class="money" src="'+addressimg+'/moneys.png" alt="">红包:<span class="numt">'+top[0].redbag_money+'</span></span></div><div class="top pur ft16 top2"><img class="" src="'+addressimg+'/top2.png" alt=""><span class="name cfff">'+top[1].nickname+'</span><span class="ticketq"><img class="ticket" src="'+addressimg+'/tickets.png" alt="">代金券:<span class="numt">'+top[1].code_num+'</span></span><span class="moneyc"><img class="money" src="'+addressimg+'/moneys.png" alt="">红包:<span class="numt">'+top[1].redbag_money+'</span></span></div><div class="top pur ft16 top3"><img class="" src="'+addressimg+'/top3.png" alt=""><span class="name cfff">'+top[2].nickname+'</span><span class="ticketq"><img class="ticket" src="'+addressimg+'/tickets.png" alt="">代金券:<span class="numt">'+top[2].code_num+'</span></span><span class="moneyc"><img class="money" src="'+addressimg+'/moneys.png" alt="">红包:<span class="numt">'+top[2].redbag_money+'</span></span></div></div></div><div class="mark ftc ft24 bold"><img class="left" src="'+addressimg+'/star.png" alt="">战胜了<span class="cfff ft33 per"></span>的宠友<img class="right" src="'+addressimg+'/star.png" alt=""></div></div>');
                                $("#rbrain .medal .step4 .quan .num").text("0");
                                $("#rbrain .medal .step4 .cash .num").text("0");
                                $("#rbrain .medal .step4 .per").text(0);
                            }else {
                                for(var i = 0;i<indexTemp.length;i++) {
                                    if(packagebag.list[indexTemp[i]].common > 0) {
                                        var normal = '<div class="total ft16"><img class="vermiddle" src="'+addressimg+'/5quan.png" alt=""><span class="sum cfff">x1</span><span class="pur">'+packagebag.list[indexTemp[i]].description+'</span></div>';
                                        cashquan += normal;

                                    }else {
                                        var normal = '<div class="total ft16"><img class="vermiddle" src="'+addressimg+'/100quan.png" alt=""><span class="sum cfff">x1</span><span class="pur">'+packagebag.list[indexTemp[i]].description+'</span></div>';
                                        brandquan +=normal;
                                    }
                                }
                                $("#rbrain .medal").html('<div class="step4"><div class="title clearfix"><img class="fr shut" src="'+addressimg+'/close.png" alt=""></div><div class="rlogo rela ftc"><img class="duo" src="'+addressimg+'/duo.png" alt=""><div class="quan abs ftc ft18 cfff">代金券：<span class="num">0</span></div><div class="cash abs ftc ft18 cfff">红包：¥<span class="num"></span></div></div><div class="info clearfix"><div class="fl con left"><div class="pic ftc"><img src="'+addressimg+'/prise.png" alt=""></div><div class="wrapper"><div class="total ft16"><img class="vermiddle" src="'+addressimg+'/cashq.png" alt=""><span class="sum sumcash cfff">¥4.5</span></div>'+cashquan+''+brandquan+'<p class="tips ft14 pur">说明：双11当天可使用，在“我的代金券” 和 “我的双11红包”查看。</p></div></div><div class="fr con right"><div class="pic ftc"><img src="'+addressimg+'/top.png" alt=""></div><div class="top pur ft16 top1"><img class="" src="'+addressimg+'/top1.png" alt=""><span class="name cfff">'+top[0].nickname+'</span><span class="ticketq"><img class="ticket" src="'+addressimg+'/tickets.png" alt="">代金券:<span class="numt">'+top[0].code_num+'</span></span><span class="moneyc"><img class="money" src="'+addressimg+'/moneys.png" alt="">红包:<span class="numt">'+top[0].redbag_money+'</span></span></div><div class="top pur ft16 top2"><img class="" src="'+addressimg+'/top2.png" alt=""><span class="name cfff">'+top[1].nickname+'</span><span class="ticketq"><img class="ticket" src="'+addressimg+'/tickets.png" alt="">代金券:<span class="numt">'+top[1].code_num+'</span></span><span class="moneyc"><img class="money" src="'+addressimg+'/moneys.png" alt="">红包:<span class="numt">'+top[1].redbag_money+'</span></span></div><div class="top pur ft16 top3"><img class="" src="'+addressimg+'/top3.png" alt=""><span class="name cfff">'+top[2].nickname+'</span><span class="ticketq"><img class="ticket" src="'+addressimg+'/tickets.png" alt="">代金券:<span class="numt">'+top[2].code_num+'</span></span><span class="moneyc"><img class="money" src="'+addressimg+'/moneys.png" alt="">红包:<span class="numt">'+top[2].redbag_money+'</span></span></div></div></div><div class="mark ftc ft24 bold"><img class="left" src="'+addressimg+'/star.png" alt="">战胜了<span class="cfff ft33 per"></span>的宠友<img class="right" src="'+addressimg+'/star.png" alt=""></div></div>');
                                $("#rbrain .medal .step4 .quan .num").text(ticketnum);
                                $("#rbrain .medal .step4 .cash .num").text(moneyCount.toFixed(2));
                                $("#rbrain .medal .step4 .total .sumcash").text('¥'+moneyCount.toFixed(2));
                            }
                            $("#rbrain .medal .step4 .per").text(top.percentage + '%');
                        }

                    }
                });
                
            }
        },
        /** 红包事件*/
         redPackage:function () {
            $('.red-package').live('click',function(){
                var packageTemp = $(this);
                var emptyFlag = packageTemp.attr('empty'),
                    indexFlag = packageTemp.attr('index'),
                    priceFlag = packageTemp.attr('price');
                if(emptyFlag == 0){
                    packageTemp.css({'background':'url("'+addressimg+'/red_full.png")','background-size':'100%'}).stop();
                    $('.money'+indexFlag).css({'visibility':'visible','z-index':2}).stop().animate({top:350+'px',left:$(window).width()/2+100,width:20+'px',height:20+'px'},500,function () {
                        $(this).remove();
                    });
                    //if(packageTemp.attr('price') != "0"){
                    //    moneyCount += priceFlag*1;
                    //}
                    moneyCount += priceFlag*1;
                    packageTemp.attr('price',0);
                    $(".cash .num").text(moneyCount.toFixed(2));
                }else{
                    packageTemp.css({'background':'url("'+addressimg+'/red_empty.png")','background-size':'100%'}).stop();
                }

                var timer = setInterval(function(){
                    packageTemp.remove();
                    window.clearInterval(timer);
                },500)
            })
        },
        /** 黄包事件*/
        yellowPackage:function(){
            $('.yellow-package').live('click',function(){
                var packageTemp = $(this);
                var emptyFlag = packageTemp.attr('empty'),
                    indexFlag = packageTemp.attr('index');
                    priceFlag = packageTemp.attr('price');
                if(emptyFlag == 0){
                     packageTemp.css({'background':'url("'+addressimg+'/yellow_full.png")','background-size':'100%'}).stop();
                    $('.ticket'+indexFlag).css({'visibility':'visible','z-index':2}).stop().animate({top:350+'px',left:$(window).width()/2-100,width:20+'px',height:20+'px'},500,function () {
                        $(this).remove(); 
                    });
                    packageTemp.attr('price',0);
                    if(priceFlag != 0) {
                        ticketnum++;
                    }
                    $(".quan .num").text(ticketnum);
                    indexTemp.push(Number(indexFlag));
                }else{
                    packageTemp.css({'background':'url("'+addressimg+'/yellow_empty.png")','background-size':'100%'}).stop();
                }
                var timer = setInterval(function(){
                    packageTemp.remove();
            },500)
                    window.clearInterval(timer);
            })
        },
        /** 红包，黄包随机生成*/
        newPackage:function(){
            var setInt = setInterval(function(){
                if(packageCount<packagebag.list.length){
                    var startleft = $(window).width()/2-300+Math.random()*600;
                    if(packagebag.list[packageCount].type == 1){
                        $('<div class="red-package" index="'+packageCount+'" empty="'+packagebag.list[packageCount].empty+'" price="'+packagebag.list[packageCount].prize+'"></div><div class="money money'+packageCount+'"></div>')
                            .clone().appendTo('.package-container').css({left:startleft,top:400+'px'}).animate({top:$(window).height()},2000,'linear',function(){
                            $(this).remove();
                        });
                    }else{
                        $('<div class="yellow-package" index="'+packageCount+'" empty="'+packagebag.list[packageCount].empty+'" price="'+packagebag.list[packageCount].prize+'"></div><div class="ticket ticket'+packageCount+'"></div>')
                            .clone().appendTo('.package-container').css({left:startleft,top:400+'px'}).animate({top:$(window).height()},2000,'linear',function(){
                            $(this).remove();
                        });
                    }
                    packageCount++;
                }else{
                    window.clearInterval(setInt);
                }
            },500)

        }
    };
});