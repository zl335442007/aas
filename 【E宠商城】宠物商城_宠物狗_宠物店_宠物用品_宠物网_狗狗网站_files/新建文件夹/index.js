var _c = _h = 0;
var iad = $(".indexmidpic");
function play()
{
    _h = setInterval("auto()", 5000);
}
function change(i)
{
    var ctime = 200;
    var opc = 0.3;
    iad.find('.playpic > a.hov').removeClass('hov');
    iad.find('.playpic > a').eq(i).addClass('hov').blur();
    var fcs = iad.find(".indexaapic > div").eq(i);
    var hov = iad.find(".indexaapic > div.hov");
    if(!fcs.hasClass("hov")){        
        hov.stop().animate({opacity:opc},ctime);
    }
    fcs.css({opacity:opc}).stop().show().animate({opacity:1},ctime,function(){
        if(hov.length > 0){
            hov.removeClass("hov").hide();
        }
        $(this).addClass("hov").show();
	});
    var color = fcs.css("background-color");
    if(fcs.attr('data-barcolor') != ''){
        color = fcs.attr('data-barcolor');
    }
    $(".maincates-title .hov").css({"background-color":color,opacity:opc,"border-color":color}).animate({opacity:1});
    $(".catelist").css({"border-color":color});
}
function auto()
{    
	var ttal = iad.find('.playpic > a').length-2;
    _c = _c > ttal ? 0 : _c + 1;
    change(_c);
}
function disbuy(gid,atid){
    cart_ctl('add',{
        gid:0,
        buytype:'discount',
        buynum:1,
        pam:atid,
        pam1:gid
    });	
}
function ffdbuy(){
    $('#fdbuy').load(reurl('share/goods.html?do=fdbuy&inajax=1'));
}
//$("[name='keyword']").focus();
$(document).ready(function(){
    var topadv = $('#index-topadv');
    var topadvten = $('#index-topadvten'); //显示10秒
    if(topadvten.length > 0){
        $('.headerTop').removeClass('fixed');
        $('.header').css({'padding-top':'10px'});
        var oldh = topadvten.height();
        topadvten.hide();
        $('.head-newyear').prepend(topadvten);
        topadvten.show().height(0).animate({height:oldh},'slow',function(){
            setTimeout(function(){
        		topadvten.animate({height:0},'slow',function(){
        		    topadvten.remove();
        		});
        	},15000);    
        });
    }
    if(topadv.length > 0){
        $('.headerTop').removeClass('fixed');
        $('.header').css({'padding-top':'10px'});
        var oldh = topadv.height();
        $('.head-newyear').prepend(topadv);
    }
    //最新动态
    ScrollStart(".newact",90,3000);
    //联动
    iad.find('.playpic > a').mouseover(function(){
		var i = $(this).attr('alt') - 1;
		clearInterval(_h);
		_c = i;
		play();
		change(i);        
	})
	iad.mouseover(function(){clearInterval(_h)}).mouseout(function(){play()});
    change(0);
	play();
	/*
    $(".fuwu a").mouseover(function(){
        $(".fuwu a.hov").removeClass("hov");
        $(this).addClass("hov");
        $(".fuwu div").hide().eq($(this).index()).show();    
    });*/
    $(".zhis span a").mouseover(function(){
        $(".zhis span a.hov").removeClass("hov");
        $(this).addClass("hov");
        $(".zhistxt").hide().eq($(this).index()).show();
    });
    
    
    //首页活动tab切换
    var tab_num = $(".cx_nav a").length;
    var current_tab = 0;
    var timer = '';
    autoSwitchTab();
    $(".cx_nav a").hover(function(){//手动切换
        clearInterval(timer);
        switchTab($(this));
    },function(){
        autoSwitchTab();
    });
    $(".cx_nav a").click(function(){//自动切换用
        switchTab($(this));
    });
    function switchTab(obj){
        $(".cx_nav a.hov").removeClass("hov");
        var a = obj;
        a.addClass("hov");
        var hov = a.parents(".cx_nav").siblings(".cx_listbox").find("ul").hide().eq(a.index()).show();
        if(hov.html() == ''){
            hov.html('<em class="loading"></em>');
            hov.load(reurl('share/run.html?act=indexcx&tp='+a.attr('lang')),{inajax:1},function(data){
                lazyload({evt:hov.get(0)});
            });
        }
    }
    function autoSwitchTab(){
        timer = setInterval(function(){
            $('.cx_nav a').eq(current_tab).trigger('click');
            current_tab++; 
            current_tab = current_tab > tab_num - 1 ? 0 : current_tab;
        },5000);
    }
    
    $(".bdlist a").hover(function(){
        var img = $(this).find('img');
        img.hide();
        $(this).append('<span>'+img.attr('alt')+'</span>');    
    },function(){
        $(this).find('span').remove();
        $(this).find('img').show();
    });
    //首页品牌中心上方的幻灯片
    function slider(classname){
        var index = 0;
        var length = $("."+classname).find(".slider li").length;
        $("."+classname).find(".num li").mouseover(function(){
            index = $("."+classname).find(".num li").index(this);
            myShow(index);
        }).eq(0).mouseover();

        function myShow(index){
            $("."+classname).find(".num li").eq(index).addClass("on").siblings().removeClass("on");
            $("."+classname).find(".slider li").eq(index).stop(true,true).fadeIn(600).siblings("li").fadeOut(600);
        }
        //滑入停止动画，滑出开始动画
        $("."+classname).find(".slider li").hover(function(){
            clearInterval(myTime);
        },function(){
            myTime = setInterval(function(){
                myShow(index)
                index++;
                if(index==length){index=0;}
            } , 3000);
        });
        //自动开始
        var myTime = setInterval(function(){
            myShow(index)
            index++;
            if(index==length){index=0;}
        } , 3000);	
    }
    slider("dc-slider");
    loadNewGoodsFastBuy();
//guanggao
$(".pp-img a:first").css("opacity","1");
(function($,win){
	var ppSlider={
		auto: function() {
			this.timer = setInterval(function() {
				_self.fx(_self.def++ < _self.pplen - 1 ? _self.def : 0);
			}, this.pptime);
		},
	autoShow:function(){
		this.auto();
		this.ttwrap.hover(function(){
			clearInterval(_self.timer);
		},function(){
			_self.auto();
		})
	},
	fx:function(idx){
			this.ppimg.stop(true).eq(idx).css("z-index","3").animate({"opacity":1},1000,function(){
				$(this).css({"z-index":"2"}).siblings().css({"opacity":0,"z-index":"1"});
			})
			this.ppico.eq(idx).show().siblings().hide();
			this.def = idx;
	},
	bindEvent:function(){
			this.pprev.click(function() {
				_self.fx(_self.def-- > 0 ? _self.def : _self.pplen - 1);
			});
			this.ppnext.click(function() {
				_self.fx(_self.def++ < _self.pplen - 1 ? _self.def : 0);
			});
	},
	init:function(obj){
		_self=this;
		this.ppimg=$(obj.ppimg);
		this.ppico=$(obj.ppico);
		this.ttwrap=$(obj.ttwrap);
		this.pprev=$(obj.pprev);
		this.ppnext=$(obj.ppnext);
		this.pplen=this.ppimg.length;
		this.def=0;
		this.pptime=obj.pptime||4000;
		this.autoShow();
		this.bindEvent();
	}
	}
	win.ppSlider=ppSlider;
	
})(jQuery,window);

ppSlider.init({
	ppimg:".pp-img a",
	ttwrap:".ttjx-r",
	ppico:".ico-img a",
	pprev:".pp-prev",
	ppnext:".pp-next",
	pptime:"4000"
	
})

//口碑评价翻转效果
function Epetads(obj){
	var that=this;
	this.adsNum=0;
	this.adsTime=80;
	this.hele=obj.hele;
	this.state=false;
	this.numm=$(">div",obj.hele).length;
	this.btime=(parseInt(Math.random()*3000)+3000);
	this.adsTimer=setInterval(function(){that.adsScroll()},this.btime);
	$(this.hele).hover(function(){
		clearInterval(that.adsTimer);
	},function(){
		that.adsTimer=setInterval(function(){that.adsScroll()},that.btime);
	})
}
Epetads.prototype={
	adsScroll:function(obj){
		var _sel=this;
		$(">div",_sel.hele).eq(this.adsNum).stop().animate({"height":0},this.adsTime,function(){
		$(this).hide();
		if(_sel.state){
			_sel.adsNum=parseInt(Math.random()*(_sel.numm-1));
		}else{
			_sel.adsNum=_sel.numm-1;
		}
			_sel.state=!_sel.state;
		$(">div",_sel.hele).eq(_sel.adsNum).show().animate({"height":200},_sel.adsTime);
	})
}
}

new Epetads({hele:".ads-l"});
new Epetads({hele:".ads-r"});

    var scroll=$(".sale-info"), rtimer;
    function noticeScroll(){
        clearInterval(rtimer);
        scroll.animate({"top":"-68px"},1500,function(){
            scroll.find("li:first").appendTo(this);
            scroll.css("top","0px");
        });
        rtimer=setInterval(noticeScroll,3000);
    }

    rtimer=setInterval(noticeScroll,3000);

    $(".sale-info li").hover(function(){
        clearInterval(rtimer);
    },function(){
        rtimer=setInterval(noticeScroll,3000);
    })
});

//提示框
$(".tip-cont div a").hover(function(){
	$(this).addClass("hov").siblings().removeClass();
})
$(".tip-close").live('click',function(){
    tipClose();
});
function tipClose(){
    $('.tip-cont').hide();
    $('.zindex-cont').hide();
    $(".epet-tip").hide();
	$(".epet-gift").hide();
}

$(".ttjx-l li").hover(function(){
	$(".imgBox span",this).stop().animate({"bottom":"0px"},500);
},function(){
	$(".imgBox span",this).stop().animate({"bottom":"-54px"},200);
})
var newgoods_scroll;
function loadNewGoodsFastBuy(){
    clearInterval(newgoods_scroll);
    var gid = '';
    var dot = '';
    $('.newgoods_fastbuy li.have_num').each(function(){
        gid = gid + dot + $(this).attr('data-gid');
        dot = ',';
    });
    if (gid != '') {
        $.getJSON(reurl('share/new/fastbuy.html?inajax=1&do=getPrice&gid=' + gid), function(data){
            for (gid in data){
                var num = parseInt(data[gid].num);
                var li = $('.newgoods_fastbuy li[data-gid="'+ gid +'"]');
                li.find('.fastbuy_price').text(data[gid].price);
                li.find('.fastbuy_num').text('还剩下：' + num + data[gid].unit);
                li.attr('startLenght', data[gid].startLength);
                if (data[gid].startLength < 0) {
                    li.find('.xp-buy a').addClass('not_start');
                    setTimeout('loadNewGoodsFastBuy()', Math.abs(data[gid].startLength) * 1000 + 10);
                } else {
                    li.find('.xp-buy a').removeClass('not_start');
                }
                if (num == 0) {
                    li.removeClass('have_num');
                    li.find('.xp-buy a').addClass('not_can_buy');
                }
                li.attr('start_price', data[gid].start_price);
                li.attr('step_money', data[gid].step_money);
                li.attr('sale_price', data[gid].sale_price);
            }
            newgoods_scroll = setInterval('matchNewGoodsPrice()', 50);
        });
    }
}

var scorll_num = 0;
var lastSynTime = new Date().getTime();
function matchNewGoodsPrice(){
    scorll_num++;
    var outnum = 1;
    if (scorll_num % 100 == 0) {
        var nowSynTime = new Date().getTime();
        outnum = nowSynTime - lastSynTime;
        if (outnum > 5000) {
            outnum = outnum - 5000;
        }
        lastSynTime = nowSynTime;
        outnum = Math.ceil(outnum / 50) + 1;
    }
    if ($('.newgoods_fastbuy li.have_num').length == 0) {
        clearInterval(newgoods_scroll);
    }
    $('.newgoods_fastbuy li.have_num').each(function(){
        var start = parseFloat($(this).attr('startLenght'));
        if (start >= 0) {
            var now_price = parseFloat($(this).find('.fastbuy_price').text());
            var start_price = parseFloat($(this).attr('start_price'));
            var sale_price = parseFloat($(this).attr('sale_price'));
            var step_money = parseFloat($(this).attr('step_money'));
            var now_price = now_price - parseFloat(step_money * outnum);
            if (now_price <= start_price) {
                now_price = sale_price;
            }
            $(this).find('.fastbuy_price').text(now_price.toFixed(4));
        }
    });
}

function newGoodsFastBuy(nfid, gid, evt){
    var prs = parseFloat($(evt).next().next('.fastbuy_price').text());
    cart_ctl('add',{
        gid:gid,
        buytype:'newgoods_fastbuy',
        buynum:1,
        pam:nfid,
        pam1:prs
    });
}