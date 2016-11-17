(function($){$(document).ready(function(){$('.cloud-zoom, .cloud-zoom-gallery').CloudZoom();$('.cloud-zoom').click(function(){return false})});function format(str){for(var i=1;i<arguments.length;i++){str=str.replace('%'+(i-1),arguments[i])}return str}function CloudZoom(jWin,opts){var sImg=$('img',jWin);var img1;var img2;var zoomDiv=null;var $mouseTrap=null;var lens=null;var $tint=null;var softFocus=null;var $ie6Fix=null;var zoomImage;var controlTimer=0;var cw,ch;var destU=0;var destV=0;var currV=0;var currU=0;var filesLoaded=0;var mx,my;var ctx=this,zw;setTimeout(function(){if($mouseTrap===null){var w=jWin.width();jWin.parent().append(format('<div style="width:%0px;position:absolute;top:75%;left:%1px;text-align:center" class="cloud-zoom-loading" >Loading...</div>',w/3,(w/ 2) - (w /6))).find(':last').css('opacity',0.5)}},200);var ie6FixRemove=function(){if($ie6Fix!==null){$ie6Fix.remove();$ie6Fix=null}};this.removeBits=function(){if(lens){lens.remove();lens=null}if($tint){$tint.remove();$tint=null}if(softFocus){softFocus.remove();softFocus=null}ie6FixRemove();$('.cloud-zoom-loading',jWin.parent()).remove()};this.destroy=function(){jWin.data('zoom',null);if($mouseTrap){$mouseTrap.unbind();$mouseTrap.remove();$mouseTrap=null}if(zoomDiv){zoomDiv.remove();zoomDiv=null}this.removeBits()};this.fadedOut=function(){if(zoomDiv){zoomDiv.remove();zoomDiv=null}this.removeBits()};this.controlLoop=function(){if(lens){var l=$('.mousetrap').position().left;var t=$('.mousetrap').position().top;var x=(mx-sImg.offset().left+l-(cw*0.5))>>0;var y=(my-sImg.offset().top+t-(ch*0.5))>>0;if(x<l){x=l}else if(x>(sImg.outerWidth()+l-cw)){x=(sImg.outerWidth()+l-cw)}if(y<t){y=t}else if(y>(sImg.outerHeight()+t-ch)){y=(sImg.outerHeight()+t-ch)}lens.css({left:x,top:y});lens.css('background-position',(-x)+'px '+(-y)+'px');destU=(((x)/sImg.outerWidth())*zoomImage.width)>>0;destV=(((y)/sImg.outerHeight())*zoomImage.height)>>0;currU+=(destU-currU)/opts.smoothMove;currV+=(destV-currV)/opts.smoothMove;zoomDiv.css('background-position',(-(currU>>0)+'px ')+(-(currV>>0)+'px'))}controlTimer=setTimeout(function(){ctx.controlLoop()},30)};this.init2=function(img,id){filesLoaded++;if(id===1){zoomImage=img}if(filesLoaded===2){this.init()}};this.init=function(){$('.cloud-zoom-loading',jWin.parent()).remove();$mouseTrap=jWin.parent().append(format("<div class='mousetrap' style='width:%0px;height:%1px;\'></div>",sImg.outerWidth(),sImg.outerHeight())).find(':last');$mouseTrap.bind('mousemove',this,function(event){mx=event.pageX;my=event.pageY});$mouseTrap.bind('mouseleave',this,function(event){clearTimeout(controlTimer);if(lens){lens.fadeOut(299)}if($tint){$tint.fadeOut(299)}if(softFocus){softFocus.fadeOut(299)}zoomDiv.fadeOut(300,function(){ctx.fadedOut()});return false});$mouseTrap.bind('mouseenter',this,function(event){if(img2.width<opts.minWidth){return}if(img2.height<opts.minHeight){return}mx=event.pageX;my=event.pageY;zw=event.data;if(zoomDiv){zoomDiv.stop(true,false);zoomDiv.remove()}var dWidth=document.documentElement.clientWidth,dHeight=document.documentElement.clientHeight;var xPos=opts.adjustX,yPos=opts.adjustY;var siw=393;var sih=sImg.outerHeight();var w=opts.zoomWidth;var h=opts.zoomHeight;if(opts.zoomWidth=='auto'){w=siw}if(opts.zoomHeight=='auto'){h=sih}var appendTo=jWin.parent();var aLeft=appendTo.offset().left,aTop=appendTo.offset().top;var dLeft=$(document).scrollLeft(),dTop=$(document).scrollTop();var l=$('.mousetrap').position().left;var t=$('.mousetrap').position().top;switch(opts.position){case'top':if(((h+yPos)>(aTop-dTop))&&((aTop-dTop+sih/2)<dHeight/2))opts.position='bottom';break;case'right':if(((dWidth-(aLeft-dLeft+siw))<(w+xPos))&&((aLeft-dLeft+siw/2)>(dWidth/2)))opts.position='left';break;case'bottom':if(((h+yPos)>(dHeight-(aTop-dTop+sih)))&&((aTop-dTop+sih/2)>dHeight/2))opts.position='top';break;case'left':if(((aLeft-dLeft)<(w+xPos))&&((aLeft-dLeft+siw/2)<(dWidth/2)))opts.position='right';break}switch(opts.position){case'top':yPos=-yPos-h;break;case'right':xPos+=siw;yPos=-(383-sImg.outerHeight())/2;break;case'bottom':yPos+=sih;break;case'left':xPos=-xPos-w;break;case'inside':w=siw;h=sih;xPos=xPos+l;yPos=yPos+t;break;default:appendTo=$('#'+opts.position);if(!appendTo.length){appendTo=jWin;xPos+=siw;yPos+=sih}else{w=appendTo.innerWidth();h=appendTo.innerHeight()}}zoomDiv=appendTo.append(format('<div id="cloud-zoom-big" class="cloud-zoom-big" style="display:none;position:absolute;left:%0px;top:%1px;width:%2px;height:%3px;background-image:url(\'%4\');z-index:99;"></div>',xPos,yPos,w,h,zoomImage.src)).find(':last');if(sImg.attr('title')&&opts.showTitle){zoomDiv.append(format('<div class="cloud-zoom-title">%0</div>',sImg.attr('title'))).find(':last').css('opacity',opts.titleOpacity)}if($.browser.msie&&$.browser.version<7){$ie6Fix=$('<iframe frameborder="0" src="#"></iframe>').css({position:"absolute",left:xPos,top:yPos,zIndex:99,width:w,height:h}).insertBefore(zoomDiv)}zoomDiv.fadeIn(500);if(lens){lens.remove();lens=null}cw=(sImg.outerWidth()/zoomImage.width)*zoomDiv.width();ch=(sImg.outerHeight()/zoomImage.height)*zoomDiv.height();lens=jWin.append(format("<div class = 'cloud-zoom-lens' style='display:none;z-index:98;position:absolute;width:%0px;height:%1px;'></div>",cw,ch)).find(':last');$mouseTrap.css('cursor',lens.css('cursor'));var noTrans=false;if(opts.tint){lens.css('background','url("'+sImg.attr('src')+'")');$tint=jWin.append(format('<div style="display:none;position:absolute; left:0px; top:0px; width:%0px; height:%1px; background-color:%2;" />',sImg.outerWidth(),sImg.outerHeight(),opts.tint)).find(':last');$tint.css('opacity',opts.tintOpacity);noTrans=true;$tint.fadeIn(500)}if(opts.softFocus){lens.css('background','url("'+sImg.attr('src')+'")');softFocus=jWin.append(format('<div style="position:absolute;display:none;top:2px; left:2px; width:%0px; height:%1px;" />',sImg.outerWidth()-2,sImg.outerHeight()-2,opts.tint)).find(':last');softFocus.css('background','url("'+sImg.attr('src')+'")');softFocus.css('opacity',0.5);noTrans=true;softFocus.fadeIn(500)}if(!noTrans){lens.css('opacity',opts.lensOpacity)}if(opts.position!=='inside'){lens.fadeIn(500)}zw.controlLoop();return})};img1=new Image();$(img1).load(function(){ctx.init2(this,0)});img1.src=sImg.attr('src');img2=new Image();$(img2).load(function(){ctx.init2(this,1)});img2.src=jWin.attr('href')}$.fn.CloudZoom=function(options){try{document.execCommand("BackgroundImageCache",false,true)}catch(e){}this.each(function(){var relOpts,opts;eval('var	a = {'+$(this).attr('rel')+'}');relOpts=a;if($(this).is('.cloud-zoom')){$(this).css({'position':'relative','display':'block'});$('img',$(this)).css({'display':'block'});if($(this).parent().attr('id')!='wrap'){$(this).wrap('<div id="wrap"  class="cloud-zoom-wrap"></div>')}opts=$.extend({},$.fn.CloudZoom.defaults,options);opts=$.extend({},opts,relOpts);$(this).data('zoom',new CloudZoom($(this),opts))}else if($(this).is('.cloud-zoom-gallery')){opts=$.extend({},relOpts,options);$(this).data('relOpts',opts);$(this).bind('click',$(this),function(event){var data=event.data.data('relOpts');$('#'+data.useZoom).data('zoom').destroy();$('#'+data.useZoom).css({'marginTop':event.data.data('relOpts').marginTop,'marginLeft':event.data.data('relOpts').marginLeft});$('#'+data.useZoom).attr('href',event.data.attr('href'));$('#'+data.useZoom+' img').attr('src',event.data.data('relOpts').smallImage);$('#'+event.data.data('relOpts').useZoom).CloudZoom();return false})}});return this};$.fn.CloudZoom.defaults={zoomWidth:'auto',zoomHeight:'auto',position:'right',tint:false,tintOpacity:0.5,lensOpacity:0.5,softFocus:false,smoothMove:3,showTitle:true,titleOpacity:0.5,adjustX:0,adjustY:0,minWidth:1200,minHeight:1200}})(jQuery);


//添加到购物车
function addto_cart(){
    var opts = {
        gid:$("#cart_gid").val(),                                                                                       //获取主商品id
        buynum:$("#cart_buynum").val(),                                                                                 //获取购买数量
        buytype:$("#cart_buymode").val(),                                                                               //获取购买模式
        pam:$("#cart_pam").val(),                                                                                       //获取购买的搭配商品id
        pam1:$("#cart_pam1").val(),                                                                                     //获取搭配id
        show_cart:false,                                                                                               //是否展示购物车
        succeed_box:1                                                                                                   //是否展示成功界面
    }
    cart_ctl('add',opts);                                                                                               //将这些配置参数传入
}
//促销模式购买
function special_buy(buymode){
    switch(buymode){
        case 'exchange':
            alert_box('确定要兑换吗？一旦兑换成功，积分会立即扣除并不再退回，如果从购物车删除该商品或撤销购物车，积分不会返还。',function(b){
                if(b){
                    addto_cart();
                }
            });
            break;
        case 'groupbuy':
            gpbuy_alert($('#gpid').val());
            break;
        case 'gongyi':
            var pam1 = parseInt($("#cart_pam1").val());
            var gid = $("#cart_gid").val();
            if (pam1 == 0) {
                dialog('捐助确认', 'url:' + reurl('share/goods.html?do=gongyi&gid=' + gid), {height:350});
            } else {
                dialog('捐助确认', 'url:' + reurl('share/goods.html?do=gongyi&gid=' + gid + '&orgid=' + pam1), {height:250});
            }
            break;
        case 'withbuy':
            var gids = $("#cart_pam").val();                                                                            
            alert(gids);
            if (gids == 'sendgoods') {
                $("#cart_buymode").val('');//普通方式购买
                $("#cart_pam").val('');
                //$("#cart_pam1").val('');
            } else {
                $("#cart_buymode").val('withbuy');
            }
            addto_cart();
            break;
        default:
            addto_cart();
    }
}

function addgongyi(){
    var pam1 = $('[name="orgs"]:checked').val();
    $("#cart_pam1").val(pam1);
    addto_cart();
}
//变更商品价格
function chg_price(num){
    num = parseInt(num);
    var price = $(".oldprice").text();
    var oprice = parseFloat($('.oldprice').attr('title'));
    var nprice = 0;
    var chgmode = false;
    $("[name='multibuy']").each(function(){
        var tnum = parseInt($(this).attr('value'));
        if(num >= tnum){
            price = $(this).attr('lang');
            nprice = parseFloat($(this).attr('title'));
            chgmode = true;
        }
    });
    if(chgmode){
        $(".mtprice").show();
        $('#lim_price').html('可节省：<span class="price">￥ '+(oprice*num - nprice*num).toFixed(2)+'</span>').show();
    }else{
        $(".mtprice").hide();
        $('#lim_price').hide();
    }
    $("#cart_buynum").val(num);
    $(".nowprice").text(price);
}

//加载评价 咨询
function get_reps(tp,gspid,fm_shareid,tar_gspid){
    if(tp == 'reply' && $('#reply_display .lazy_ajax').length > 0){
        ajax_page('#reply_display',reurl('share/goods.html?do=reply_list&gspid='+gspid+'&fm_shareid='+fm_shareid+'&tar_gspid='+tar_gspid),1,false);
    }else if($('#ask_display .lazy_ajax').length > 0){
        ajax_page('#ask_display',reurl('share/goods.html?do=ask_list&gspid='+gspid+'&fm_shareid='+fm_shareid+'&tar_gspid='+tar_gspid),1,false);
    }
}
//评价晒图相关
$('.re_photos li').live({
    click:function(){
        var big_photo = $(this).parents('ul').find(".big_photo");
        var len = big_photo.length;
        var src_old = big_photo.find('img').attr('src');
        var src_new = $(this).find('img').attr('src');
        var index = src_new.indexOf('@!');
        src_old = src_old ? src_old.substr(0,index) : '';
        src_new = src_new.substr(0,index);
        $(this).addClass("active").siblings().removeClass("active");
        if(len == 0){
             $(this).parents('ul').append('<div class="big_photo"><img src="'+src_new+'@!400wf"/></div>');
             big_photo.slideDown();
             $(this).css('cursor',"url("+shareurl+"/my/zoom_out.cur),move");
        }else{
            if(src_old == src_new){
                big_photo.remove();
                $(this).removeClass('active');
                $(this).css('cursor',"url("+shareurl+"/my/zoom_in.cur),move");
            }else{
                big_photo.find('img').attr('src',src_new+'@!400wf');
                $(this).css('cursor',"url("+shareurl+"/my/zoom_in.cur),move");
            }
        }
    },
    //鼠标样式
    mouseover:function(){
        var big_photo = $(this).parents('ul').find(".big_photo");
        var len = big_photo.length;
        var src_old = big_photo.find('img').attr('src');
        var src_new = $(this).find('img').attr('src');
        var index = src_new.indexOf('@!');
        src_old = src_old ? src_old.substr(0,index) : '';
        src_new = src_new.substr(0,index);
        if(len == 0){
            $(this).css('cursor',"url("+shareurl+"/my/zoom_in.cur),move");
        }else{
            if(src_old == src_new){
                $(this).css('cursor',"url("+shareurl+"/my/zoom_out.cur),move");
            }else{
                $(this).css('cursor',"url("+shareurl+"/my/zoom_in.cur),move");
            }
        }
    }
});
$('.big_photo').live({
    mouseover:function(){
        $(this).css('cursor',"url("+shareurl+"/my/zoom_out.cur),move");
    },
    click:function(){
        $(this).siblings().removeClass('active');
        $(this).remove();
    }
});

function del_def(evt){
    if($(evt).hasClass('c999')){
        $(evt).removeClass('c999').val('');
    }
}

//搭配购买
function withbuy(wtid, gid){
    var gd = $("#gd_"+ wtid +'_'+gid);
    var lis = $(".dpl" + wtid + " li.hov");
    if(gd.hasClass('hov')){
        gd.removeClass("hov");
        gd.find(".picBg").removeClass("checkBoxIco-on").addClass("checkBoxIco-no");

    }else{
        if(lis.length >= parseInt($("#randnum" + wtid).val())){
            alert_box('可挑选的数量已满。');
            return;
        }
        gd.addClass("hov");
        gd.find(".picBg").removeClass("checkBoxIco-no").addClass("checkBoxIco-on");
    }
    lis = $(".dpl" + wtid + " li.hov");;
    var baseprice = parseFloat($("#baseprice").val());
    var yj = baseprice,xj = baseprice,js = 0;
    lis.each(function(){
        yj += parseFloat($(this).attr('sprice'));
        xj += parseFloat($(this).attr('zprice'));
    });
    js = yj - xj;
    var wp = $(".dpl"+wtid).parent().parent();
    wp.find(".dp_num").text(lis.length);
    wp.find(".dp_yj").text('￥'+xj.toFixed(2));
    wp.find(".dp_xj").text('￥'+yj.toFixed(2));
    wp.find(".dp_js").text('￥'+js.toFixed(2));
}
function add_withbuy(wtid, gid){
    var lis = $(".dpl" + wtid + " li.hov");
    if(lis.length < 1){
		alert_box("请挑选要搭配的商品。");
	} else {
		var gids = '';
		var dot = '';
		lis.each(function(){
            var gdid = $(this).attr("gdid");
			gids += dot + gdid;
            dot = ',';
		});
        cart_ctl('add',{
            gid:gid,
            buytype:'withbuy',
            buynum:1,
            pam:gids,
            pam1:wtid
        });
	}
}
//搭配选择属性
function changeattr(fgid,fm_shareid,gid){
    var lis = $(".dplist li.fm_shareid_"+fm_shareid);
    var changeattr = $(".dplist li.changeattr_"+fm_shareid);
    s_load();
    changeattr.load(reurl('share/goods.html?do=choose_withbuy&act=attr&gid=' + gid+'&fgid='+fgid+'&fm_shareid='+fm_shareid),{},function(data){
        h_load();
        var zprice = changeattr.find(".zprice").attr("zprice");
        var sale_price = changeattr.find(".sale_price").attr("sale_price");
        var img = changeattr.find(".imgs img").attr("src");
        lis.attr({"id":"gd_"+fgid,"gdid":fgid,"zprice":zprice,"sprice":sale_price});
        lis.find(".zprice").html(zprice);
        lis.find(".sprice").html(sale_price);
        lis.find(".imgs img").attr('src',img);
        lis.removeClass("hov");
        lis.find(".picBg").attr('onclick','withbuy('+fgid+')').removeClass("checkBoxIco-on").addClass("checkBoxIco-no");
        withbuy(fgid);
    });
}

/*o元赠送选择赠品*/
function checkGift(evt,wtid){
    var li = $(evt).parent(".rela").siblings(".rela").find(".checked-yel");
    var ligray = $(evt).parent(".rela").siblings(".rela").find(".checked-gray");
    var gids ='';
    var dot = '';
    li.each(function() {
        var gdid = $(this).attr("sgid");
        gids += dot + gdid;
        dot = ',';
    });
   if($(evt).hasClass('checked-yel')){
       $(evt).removeClass("checked-yel");
   } else{
       if((li.length >= parseInt($("#giftrandnum" + wtid).val())-1 && ligray.length>0)||(li.length >= parseInt($("#giftrandnum" + wtid).val()) && ligray.length<1)){
            alert_box('可挑选的赠品已满。');
            return;
        }
        $(evt).addClass("checked-yel");
        gids += dot + $(evt).attr("sgid");
   }
   if(!gids){
       gids = 'sendgoods';
   }
   $("#cart_pam").attr('value',gids);
}
function repos(){
    var jqimg = $(".cloud-zoom img");
    $("#wrap").width(jqimg.width()).height(jqimg.height()).css({'margin-top':(300-jqimg.height())/2});
}
$(function(){
    //图片滚动
    $(".oborder li a").click(function(){
        repos();
    }).mouseover(function(){
       $(this).trigger("click");
    });
    $(".oborder li a:first").trigger('click');
    if($("#bdshell_js").length > 0){
        document.getElementById("bdshell_js").src = "http://bdimg.share.baidu.com/static/js/shell_v2.js?cdnversion=" + new Date().getHours();
    }
});
$(".picroll").silder({speed:"normal",slideBy:4,step:1});
//多件折扣
if($("[name='multibuy']").length > 0){
    $(".chgnum").click(function(){
        chg_price($("#cart_buynum").val());
    });
}
//倒计时
if($(".down_time").length > 0){
    down_time(".down_time",function(){
        location.reload();
    });
}
//小提示
min_tip(".disbuy");
//搭配购买
if($(".dplist").length > 0){
    min_tip(".dplist img");
    $(".dpdiv").mouseover(function(){
        $(".dplist").css({height:'auto'});
    });
}
//tip
$(".gdicos > img,.hpd >a.unerline").tipsy({gravity:'n'});
$(".ats[tipid!='']").tipsy({gravity:'w'});
$(".multi-menu a").click(function(){
    set_multi_menu();
    $(".multi-content .box").css({'border-top':'none'});
    $(".multi-content .box > h2").remove();
});
//设置滚动条
function set_multi_menu(){
    var ofc = $('.floatbar').next('.multi-content').offset().top;
    var sh = $(window).scrollTop();
    if(sh >0 && sh > ofc){
       $(window).scrollTop(ofc);
    }
}
function nextdy(gid,page,fromhot){
    s_load();
    $("#dylist").load(reurl('share/goods.html?do=dylist&page='+page+'&gid='+gid+'&fromhot='+fromhot),{},function(data){
        h_load();
    });
}

function pl_list(act,gspid,fm_shareid,tar_gspid,pos,cpage,flush){
	var url  = reurl('share/box.html?act='+act+'&gspid='+gspid+'&fm_shareid='+fm_shareid+'&tar_gspid='+tar_gspid);
    $(".tipsy-inner >.pl_list > div").eq(pos).show().siblings().hide();
    if($("#pl_tip >.pl_list > div > ul").length < 2 || flush==true){
        $(".pl_list > div").eq(pos).find('p.loadbox').show("fast");
    	$.get(url,{inajax:'1',page:cpage},function(data){
    	    $(".pl_list > div").eq(pos).find('p.loadbox').hide("fast");
            $("#pl_tip >.pl_list > div").eq(pos).html(data);
            $(".tipsy-inner >.pl_list > div").eq(pos).html(data);
    	});
    }
}
function plzx_list(obj){
    var pos = obj.index();
	var gspid = obj.attr("data-gspid");
	var fmshareid = obj.attr("data-fmshareid");
	var targspid = obj.attr("data-targspid");
    var act = obj.attr("data-act");
    pl_list(act,gspid,fmshareid,targspid,pos,1,false);
}

function getWithbuyList(wtid, gid) {
    if ($('.dpcontent' + wtid).html() == '') {
        $.get(reurl('share/goods.html?do=withbuy&inajax=1&wtid=' + wtid + '&gid=' + gid), function(data){
            var dpcontent = $('.dpcontent' + wtid);
            dpcontent.empty();
            dpcontent.append(data);
            var lilength = parseInt(dpcontent.find('li').length);
            if (lilength > 3) {
                var w = (lilength + 1) * 330 / 2 - 36;
                dpcontent.parent().css('overflow-x', 'scroll');
                dpcontent.css('width', w);
            }

        });
    }
}

$(document).ready(function(){
    $('.hpd label a.ats').mouseover(function(){
        var t = $('.pl_list > div').eq(0).find('ul').html();
        if(t =="" || t == null){
            plzx_list($(".pl_menu li").eq(0));
        }else{
            $('.tipsy-inner >.pl_list >div').eq(0).show("fast");
        }
    });
   $('.pl_menu > li').live('mouseover',function(){
         var pos = $(this).index();
         $(this).addClass('pl_munu_sel').show().siblings().removeClass('pl_munu_sel');
         $(".tipsy-inner >.pl_list > div").eq(pos).show().siblings().hide();
         var data = $('.pl_list > div').eq(pos).find('ul').html();
         if(data =='' || data==null){
            plzx_list($(this));
         }
   });
	$("#zoom1 > img").load(function(){
		repos();
	});

	$('#add_favors').bind('click',function(){
		var ggid = parseInt($(this).attr("data-ggid"));
		if(typeof(add_favors) == "function"){
			add_favors(ggid);
		}
	});
    $('.headerTop').removeClass('fixed');
    $('.header').css({'padding-top':'10px'});
    if(app == 'goods' && $('.floatbar').length > 0 ){
        ofc = $('.floatbar').next('.multi-content').offset().top;
        $(window).bind("scroll",function(){
            var t = $(window).scrollTop();
            if(t >= ofc){
                $('.floatbar').addClass('mbar-hov');
                $('.floatbar .buybtn').show();
            }else{
                $('.floatbar').removeClass('mbar-hov');
                $('.floatbar .buybtn').hide();
            }
            });
        getPieData();   
    }
});

function getPieData(){
    if (goodsPieData.code != false) {
        setHighchartJson('petage_pie', goodsPieData.petage_pie, '购买过该商品的年龄分布');
        setHighchartJson('pettype_pie', goodsPieData.pettype_pie, '购买过该商品的品种分布');
    }
}

function setHighchartJson(content, data, name) {
    var chart = new Highcharts.Chart({
            chart : {
                'renderTo' : content
            },
            title : {
                style: {'font-family': 'Microsoft Yahei'},
                text : name
            },
            tooltip:{
                formatter : function(){
                    return this.point.name + ':<b>' + Highcharts.numberFormat(this.point.percentage, 2) + '%</b>';
                }
            },
            plotOptions : {
                pie : {
                    allowPointSelect : true,
                    cursor : 'pointer'
                }
            },
            series : [{
                type : 'pie',
                name : '所占比例',
                data : data
            }],
            credits : {
                enabled :false
            }
    });
}
function ScrollImgLeft(){
        var speed=50
        var scroll_begin =$(".scroll_begin")[1];// document.getElementById("scroll_begin");
        var scroll_end = $(".scroll_end")[1];//document.getElementById("scroll_end");
        var scroll_div =$(".scroll_div")[1]; //document.getElementById("scroll_div");
        if(!scroll_begin || !scroll_div){
            return false;
        }
        scroll_end.innerHTML=scroll_begin.innerHTML;
        function Marquee(){
            
            if(scroll_end.offsetWidth-scroll_div.scrollLeft<=0)
            scroll_div.scrollLeft-=scroll_begin.offsetWidth
            else
            scroll_div.scrollLeft++
        }
        var MyMar=setInterval(Marquee,speed)
        scroll_div.onmouseover=function() {clearInterval(MyMar)}
        scroll_div.onmouseout=function() {MyMar=setInterval(Marquee,speed)}
    }
$(".picroll ul li").eq(0).addClass("on");
$(".picroll ul li").mouseover(function(){	
$(this).addClass("on").siblings().removeClass("on");	
})

function add_like(evt,rid,flag) {
    var n = $(".evaluation").index($("#"+rid));
    if(n == 1){
        var pchid = $("input[name='pchid']").val();
        if(pchid > 0){
            get_daoju(pchid); 
            $(evt).removeAttr('onclick');
            $(evt).attr('onclick',"add_like(this,"+rid+","+flag+")");
        }
    }
    var id = rid;
    if (flag == 1) {
        rid = "sub_"+rid;
    }
    $.post(reurl("share/ajax.html"), {id:id,flag:flag,action:'addLike'}, function(data){
        if (data == 1) {
            var num = Number($("#like_"+rid).text());
            $("#like_"+rid).text(num+1);
        } else if (data == 2) {
            $("#liked_"+rid).text('您还没买过任何东西呢,不能点赞哦');
        } else {
            $("#liked_"+rid).text('已点过赞啦');
        }
    });
}
function get_daoju(pchid){
    $.post('?do=getBox&inajax=1&position=reply',{pchid:pchid},function(data){
                    var darr = data.split(':',2);
                    var code = darr[0];
                    var msg = darr[1];
                    if (code == 'suc') {
                        var windowHeight=$(window).height(); 
                        var windowWidth=$(window).width(); 
                        var popHeight=$(".chestbox-tc").height(); 
                        var popWidth=$(".chestbox-tc").width(); 
                        var popY=(windowHeight-popHeight)/2; 
                        var popX=(windowWidth-popWidth)/2;
                        $(".chestbox-tc").css("top",popY).css("left",popX);
                        $(".chestbox-tc").find('.tmp_img').after(msg);
                        $(".chestbox-tc").show();
                        $(".ztip").remove();
                        var bagbox = $(".bagBox");
                        bagbox.load(reurl('share/prop.html?do=ShowMyBag&inajax=1'));
                        hovershow(bagbox);
                        bagbox.show("slow");
                        setTimeout(closeBox,6000);
                    }else{
                        alert_box(msg);
                    }
                    this.destory();
                });
}
function closeBox(){
    $(".chestbox-tc").hide();
}
function show_post(evt,rid,srid,suid,latestbuy) {
    var rform = $("#replymin_form");
    rform.remove();
    rform.remove();
    rform.remove();
    $.get(reurl("share/goods.html"),{do:"replyminForm",rid:rid,suid:suid,srid:srid,latestbuy:latestbuy},function(data){
        $(evt).parent().after(data);
        $("#replymin_form textarea").focus();
    });
}

function expand_replies(rid,showFrom,latestbuy) {
    $.post(reurl("share/ajax.html"), {rid:rid,showFrom:showFrom,latestbuy:latestbuy,action:'showReplies'}, function(data){
        showFrom = showFrom+3;
        if (data.affectedrows < 3) {
            $("#showall_"+rid).hide();;
        } else {
            $("#showall_"+rid).attr('onclick','expand_replies('+rid+','+showFrom+')');
            $("#showall_"+rid).text('显示更多');
        }
        $("#reply_container_"+rid).append(data.str);
    },'json');
}

if($("#CuPlayer").length > 0){
    var player_list = $("#player_video").html();
    var p_width = 482;
    var p_height = 400;
    var v_width = parseInt($("#v_width").html());
    var v_height = parseInt($("#v_height").html());
    if(v_width > 0){
        p_width = v_width;
    }
    if(v_height > 0){
        p_height = v_height;
    }
    var so = new SWFObject(share_url+"/js/player/PlayerLite.swf","CuPlayerV4",p_width,p_height,"9","#000000");
    so.addParam("allowfullscreen","true");
    so.addParam("allowscriptaccess","always");
    so.addParam("wmode","opaque");
    so.addParam("quality","high");
    so.addParam("salign","lt");
    so.addVariable("videoDefault",player_list); //视频文件地址
    so.addVariable("autoHide","true");
    so.addVariable("hideType","fade");
    so.addVariable("autoStart","false");
    //so.addVariable("holdImage","start.jpg");
    so.addVariable("startVol","60");
    so.addVariable("hideDelay","60");
    so.addVariable("bgAlpha","75");
    so.write("CuPlayer");
}
//预定E宠没有的商品 
function bookbymoney() {
    var gid = arguments[0] ? parseInt(arguments[0]) : 0;
    var type = arguments[1] ? arguments[1] : 0;
    dialog('预定商品',  'url:/share/reserve/buy.html?inajax=1&gid=' + gid + '&type=' + type, {width: 750, height: 600});
}
//更多优惠(从html文件移过来的)
$(".more-cheap").hover(function(){
    $(this).toggleClass("tc-block");
});
//团购二维码显示
$(function(){
    $(".groupbuy").hover(function(){
        $(this).parents(".cx-first2").find(".tubiaoimg").show();
    },function(){
        $(this).parents(".cx-first2").find(".tubiaoimg").hide();
    });
});



