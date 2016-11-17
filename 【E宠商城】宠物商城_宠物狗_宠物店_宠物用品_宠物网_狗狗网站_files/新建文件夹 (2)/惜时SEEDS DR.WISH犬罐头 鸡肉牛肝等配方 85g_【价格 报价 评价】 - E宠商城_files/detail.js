/**
 * 商品详情
 */
//普通商品图片放大镜
(function($){$(document).ready(function(){$('.cloud-zoom, .cloud-zoom-gallery').CloudZoom();$('.cloud-zoom').click(function(){return false})});function format(str){for(var i=1;i<arguments.length;i++){str=str.replace('%'+(i-1),arguments[i])}return str}function CloudZoom(jWin,opts){var sImg=$('img',jWin);var img1;var img2;var zoomDiv=null;var $mouseTrap=null;var lens=null;var $tint=null;var softFocus=null;var $ie6Fix=null;var zoomImage;var controlTimer=0;var cw,ch;var destU=0;var destV=0;var currV=0;var currU=0;var filesLoaded=0;var mx,my;var ctx=this,zw;setTimeout(function(){if($mouseTrap===null){var w=jWin.width();jWin.parent().append(format('<div style="width:%0px;position:absolute;top:75%;left:%1px;text-align:center" class="cloud-zoom-loading" >Loading...</div>',w/3,(w/ 2) - (w /6))).find(':last').css('opacity',0.5)}},200);var ie6FixRemove=function(){if($ie6Fix!==null){$ie6Fix.remove();$ie6Fix=null}};this.removeBits=function(){if(lens){lens.remove();lens=null}if($tint){$tint.remove();$tint=null}if(softFocus){softFocus.remove();softFocus=null}ie6FixRemove();$('.cloud-zoom-loading',jWin.parent()).remove()};this.destroy=function(){jWin.data('zoom',null);if($mouseTrap){$mouseTrap.unbind();$mouseTrap.remove();$mouseTrap=null}if(zoomDiv){zoomDiv.remove();zoomDiv=null}this.removeBits()};this.fadedOut=function(){if(zoomDiv){zoomDiv.remove();zoomDiv=null}this.removeBits()};this.controlLoop=function(){if(lens){var l=$('.mousetrap').position().left;var t=$('.mousetrap').position().top;var x=(mx-sImg.offset().left+l-(cw*0.5))>>0;var y=(my-sImg.offset().top+t-(ch*0.5))>>0;if(x<l){x=l}else if(x>(sImg.outerWidth()+l-cw)){x=(sImg.outerWidth()+l-cw)}if(y<t){y=t}else if(y>(sImg.outerHeight()+t-ch)){y=(sImg.outerHeight()+t-ch)}lens.css({left:x,top:y});lens.css('background-position',(-x)+'px '+(-y)+'px');destU=(((x)/sImg.outerWidth())*zoomImage.width)>>0;destV=(((y)/sImg.outerHeight())*zoomImage.height)>>0;currU+=(destU-currU)/opts.smoothMove;currV+=(destV-currV)/opts.smoothMove;zoomDiv.css('background-position',(-(currU>>0)+'px ')+(-(currV>>0)+'px'))}controlTimer=setTimeout(function(){ctx.controlLoop()},30)};this.init2=function(img,id){filesLoaded++;if(id===1){zoomImage=img}if(filesLoaded===2){this.init()}};this.init=function(){$('.cloud-zoom-loading',jWin.parent()).remove();$mouseTrap=jWin.parent().append(format("<div class='mousetrap' style='width:%0px;height:%1px;\'></div>",sImg.outerWidth(),sImg.outerHeight())).find(':last');$mouseTrap.bind('mousemove',this,function(event){mx=event.pageX;my=event.pageY});$mouseTrap.bind('mouseleave',this,function(event){clearTimeout(controlTimer);if(lens){lens.fadeOut(299)}if($tint){$tint.fadeOut(299)}if(softFocus){softFocus.fadeOut(299)}zoomDiv.fadeOut(300,function(){ctx.fadedOut()});return false});$mouseTrap.bind('mouseenter',this,function(event){if(img2.width<opts.minWidth){return}if(img2.height<opts.minHeight){return}mx=event.pageX;my=event.pageY;zw=event.data;if(zoomDiv){zoomDiv.stop(true,false);zoomDiv.remove()}var dWidth=document.documentElement.clientWidth,dHeight=document.documentElement.clientHeight;var xPos=opts.adjustX,yPos=opts.adjustY;var siw=393;var sih=sImg.outerHeight();var w=opts.zoomWidth;var h=opts.zoomHeight;if(opts.zoomWidth=='auto'){w=siw}if(opts.zoomHeight=='auto'){h=sih}var appendTo=jWin.parent();var aLeft=appendTo.offset().left,aTop=appendTo.offset().top;var dLeft=$(document).scrollLeft(),dTop=$(document).scrollTop();var l=$('.mousetrap').position().left;var t=$('.mousetrap').position().top;switch(opts.position){case'top':if(((h+yPos)>(aTop-dTop))&&((aTop-dTop+sih/2)<dHeight/2))opts.position='bottom';break;case'right':if(((dWidth-(aLeft-dLeft+siw))<(w+xPos))&&((aLeft-dLeft+siw/2)>(dWidth/2)))opts.position='left';break;case'bottom':if(((h+yPos)>(dHeight-(aTop-dTop+sih)))&&((aTop-dTop+sih/2)>dHeight/2))opts.position='top';break;case'left':if(((aLeft-dLeft)<(w+xPos))&&((aLeft-dLeft+siw/2)<(dWidth/2)))opts.position='right';break}switch(opts.position){case'top':yPos=-yPos-h;break;case'right':xPos+=siw;yPos=-(383-sImg.outerHeight())/2;break;case'bottom':yPos+=sih;break;case'left':xPos=-xPos-w;break;case'inside':w=siw;h=sih;xPos=xPos+l;yPos=yPos+t;break;default:appendTo=$('#'+opts.position);if(!appendTo.length){appendTo=jWin;xPos+=siw;yPos+=sih}else{w=appendTo.innerWidth();h=appendTo.innerHeight()}}zoomDiv=appendTo.append(format('<div id="cloud-zoom-big" class="cloud-zoom-big" style="display:none;position:absolute;left:%0px;top:%1px;width:%2px;height:%3px;background-image:url(\'%4\');z-index:99;"></div>',xPos,yPos,w,h,zoomImage.src)).find(':last');if(sImg.attr('title')&&opts.showTitle){zoomDiv.append(format('<div class="cloud-zoom-title">%0</div>',sImg.attr('title'))).find(':last').css('opacity',opts.titleOpacity)}if($.browser.msie&&$.browser.version<7){$ie6Fix=$('<iframe frameborder="0" src="#"></iframe>').css({position:"absolute",left:xPos,top:yPos,zIndex:99,width:w,height:h}).insertBefore(zoomDiv)}zoomDiv.fadeIn(500);if(lens){lens.remove();lens=null}cw=(sImg.outerWidth()/zoomImage.width)*zoomDiv.width();ch=(sImg.outerHeight()/zoomImage.height)*zoomDiv.height();lens=jWin.append(format("<div class = 'cloud-zoom-lens' style='display:none;z-index:98;position:absolute;width:%0px;height:%1px;'></div>",cw,ch)).find(':last');$mouseTrap.css('cursor',lens.css('cursor'));var noTrans=false;if(opts.tint){lens.css('background','url("'+sImg.attr('src')+'")');$tint=jWin.append(format('<div style="display:none;position:absolute; left:0px; top:0px; width:%0px; height:%1px; background-color:%2;" />',sImg.outerWidth(),sImg.outerHeight(),opts.tint)).find(':last');$tint.css('opacity',opts.tintOpacity);noTrans=true;$tint.fadeIn(500)}if(opts.softFocus){lens.css('background','url("'+sImg.attr('src')+'")');softFocus=jWin.append(format('<div style="position:absolute;display:none;top:2px; left:2px; width:%0px; height:%1px;" />',sImg.outerWidth()-2,sImg.outerHeight()-2,opts.tint)).find(':last');softFocus.css('background','url("'+sImg.attr('src')+'")');softFocus.css('opacity',0.5);noTrans=true;softFocus.fadeIn(500)}if(!noTrans){lens.css('opacity',opts.lensOpacity)}if(opts.position!=='inside'){lens.fadeIn(500)}zw.controlLoop();return})};img1=new Image();$(img1).load(function(){ctx.init2(this,0)});img1.src=sImg.attr('src');img2=new Image();$(img2).load(function(){ctx.init2(this,1)});img2.src=jWin.attr('href')}$.fn.CloudZoom=function(options){try{document.execCommand("BackgroundImageCache",false,true)}catch(e){}this.each(function(){var relOpts,opts;eval('var	a = {'+$(this).attr('rel')+'}');relOpts=a;if($(this).is('.cloud-zoom')){$(this).css({'position':'relative','display':'block'});$('img',$(this)).css({'display':'block'});if($(this).parent().attr('id')!='wrap'){$(this).wrap('<div id="wrap"  class="cloud-zoom-wrap"></div>')}opts=$.extend({},$.fn.CloudZoom.defaults,options);opts=$.extend({},opts,relOpts);$(this).data('zoom',new CloudZoom($(this),opts))}else if($(this).is('.cloud-zoom-gallery')){opts=$.extend({},relOpts,options);$(this).data('relOpts',opts);$(this).bind('click',$(this),function(event){var data=event.data.data('relOpts');$('#'+data.useZoom).data('zoom').destroy();$('#'+data.useZoom).css({'marginTop':event.data.data('relOpts').marginTop,'marginLeft':event.data.data('relOpts').marginLeft});$('#'+data.useZoom).attr('href',event.data.attr('href'));$('#'+data.useZoom+' img').attr('src',event.data.data('relOpts').smallImage);$('#'+event.data.data('relOpts').useZoom).CloudZoom();return false})}});return this};$.fn.CloudZoom.defaults={zoomWidth:'auto',zoomHeight:'auto',position:'right',tint:false,tintOpacity:0.5,lensOpacity:0.5,softFocus:false,smoothMove:3,showTitle:true,titleOpacity:0.5,adjustX:0,adjustY:0,minWidth:1200,minHeight:1200}})(jQuery);
//保税、直邮图片放大镜                                        
(function($){$.fn.jqueryzoom=function(options){var settings={xzoom:200,yzoom:200,offset:10,position:"right",lens:1,preload:1};if(options){$.extend(settings,options)}var noalt="";$(this).hover(function(){var imageLeft=this.offsetLeft;var imageRight=this.offsetRight;var imageTop=$(this).get(0).offsetTop;var imageWidth=$(this).children("img").get(0).offsetWidth;var imageHeight=$(this).children("img").get(0).offsetHeight;noalt=$(this).children("img").attr("alt");var bigimage=$(this).children("img").attr("jqimg");$(this).children("img").attr("alt","");if($("div.zoomdiv").get().length==0){$(this).after("<div class='zoomdiv'><img class='bigimg' src='"+bigimage+"'/></div>");$(this).append("<div class='jqZoomPup'>&nbsp;</div>")}if(settings.position=="right"){if(imageLeft+imageWidth+settings.offset+settings.xzoom>screen.width){leftpos=imageLeft-settings.offset-settings.xzoom}else{leftpos=imageLeft+imageWidth+settings.offset}}else{leftpos=imageLeft-settings.xzoom-settings.offset;if(leftpos<0){leftpos=imageLeft+imageWidth+settings.offset}}$("div.zoomdiv").css({top:imageTop,left:leftpos});$("div.zoomdiv").width(450);$("div.zoomdiv").height(450);$("div.zoomdiv img").width(550);$("div.zoomdiv img").height(550);$("div.zoomdiv").show();if(!settings.lens){$(this).css("cursor","crosshair")}$(document.body).mousemove(function(e){mouse=new MouseEvent(e);var bigwidth=$(".bigimg").get(0).offsetWidth;var bigheight=$(".bigimg").get(0).offsetHeight;var scaley="x";var scalex="y";if(isNaN(scalex)|isNaN(scaley)){var scalex=bigwidth/imageWidth;var scaley=bigheight/imageHeight;$("div.jqZoomPup").width(settings.xzoom/scalex);$("div.jqZoomPup").height(settings.yzoom/scaley);if(settings.lens){$("div.jqZoomPup").css("visibility","visible")}}xpos=mouse.x-$("div.jqZoomPup").width()/2-imageLeft;ypos=mouse.y-$("div.jqZoomPup").height()/2-imageTop;if(settings.lens){xpos=mouse.x-$("div.jqZoomPup").width()/2<imageLeft?0:mouse.x+$("div.jqZoomPup").width()/2>imageWidth+imageLeft?imageWidth-$("div.jqZoomPup").width()-2:xpos;ypos=mouse.y-$("div.jqZoomPup").height()/2<imageTop?0:mouse.y+$("div.jqZoomPup").height()/2>imageHeight+imageTop?imageHeight-$("div.jqZoomPup").height()-2:ypos}if(settings.lens){$("div.jqZoomPup").css({top:ypos,left:xpos})}scrolly=ypos;$("div.zoomdiv").get(0).scrollTop=scrolly*scaley;scrollx=xpos;$("div.zoomdiv").get(0).scrollLeft=scrollx*scalex})},function(){$(this).children("img").attr("alt",noalt);$(document.body).unbind("mousemove");if(settings.lens){$("div.jqZoomPup").remove()}$("div.zoomdiv").remove()});count=0;if(settings.preload){$("body").append("<div style='display:none;' class='jqPreload"+count+"'>sdsdssdsd</div>");$(this).each(function(){var imagetopreload=$(this).children("img").attr("jqimg");var content=jQuery("div.jqPreload"+count+"").html();jQuery("div.jqPreload"+count+"").html(content+'<img src="'+imagetopreload+'">')})}}})(jQuery);function MouseEvent(e){this.x=e.pageX;this.y=e.pageY}function preview(img){$("#preview .jqzoom img").attr("src",$(img).attr("src"));$("#preview .jqzoom img").attr("jqimg",$(img).attr("bimg"))}$(function(){$(".jqzoom").jqueryzoom({xzoom:230,yzoom:230})});$(function(){var tempLength=0;var viewNum=4;var moveNum=1;var moveTime=300;var scrollDiv=$(".spec-scroll .items ul");var scrollItems=$(".spec-scroll .items ul li");var moveLength=scrollItems.eq(0).height()*moveNum;var countLength=(scrollItems.length-viewNum)*scrollItems.eq(0).height();$(".spec-scroll .next").bind("click",function(){if(tempLength<countLength){if(countLength-tempLength>moveLength){scrollDiv.animate({top:"-="+moveLength+"px"},moveTime);tempLength+=moveLength}else{scrollDiv.animate({top:"-="+(countLength-tempLength)+"px"},moveTime);tempLength+=countLength-tempLength}}});$(".spec-scroll .prev").bind("click",function(){if(tempLength>0){if(tempLength>moveLength){scrollDiv.animate({top:"+="+moveLength+"px"},moveTime);tempLength-=moveLength}else{scrollDiv.animate({top:"+="+tempLength+"px"},moveTime);tempLength=0}}});$(".items li img").bind("mouseover",function(){if($(this).attr("id")!="onlickImg"){$(".items li").removeAttr("id");$(this).parent().attr("id","onlickImg")}}).bind("mouseout",function(){if($(this).attr("id")!="onlickImg"){$(this).removeAttr("style");midChangeHandler=window.setTimeout(function(){},1e3)}})});

Epet.Goods = {
    /**
     * 异步初始化 [通过异步返回的数据执行js]
     */
    asynInit:   function(data){
        //品牌关注按钮
        if(typeof(data.isFollow) != 'undefined' && data.isFollow){
            
        }
    },
    
    /**
     * 添加购物车
     */
    addToCart: function () {
        var opts = {
            gid: $("#cart_gid").val(),          //主商品id
            buynum: $("#cart_buynum").val(),    //购买数量
            buytype: $("#cart_buymode").val(),  //购买模式
            pam: $("#cart_pam").val(),          //扩展参数
            pam1: $("#cart_pam1").val(),        //扩展参数
            show_cart: false,                   //是否展示购物车
            succeed_box: 1                      //是否展示成功界面
        }
        cart_ctl('add', opts);                  //将这些配置参数传入
    },
    
    /**
     * 搭配购买添加购物车
     */
    withbuyAddToCart: function(wtid, gid){
        var lis = $(".dpl" + wtid + " li.hov");
        if (lis.length < 1) {
            alert_box("请挑选要搭配的商品。");
        } else {
            var gids = '';
            var dot = '';
            lis.each(function () {
                var gdid = $(this).attr("gdid");
                gids += dot + gdid;
                dot = ',';
            });
            cart_ctl('add', {
                gid: gid,
                buytype: 'withbuy',
                buynum: 1,
                pam: gids,
                pam1: wtid
            });
        }
    },
    
    /**
     * 添加收藏
     */
    addCollect:    function($gid){
        add_favors($gid);
    },
    
    /**
     * 获取搭配购买数据
     */
    getWithbuyList: function(wtid, gid){
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
    },
    
    /**
     * 选中搭配购买商品
     */
    selectWithbuyGoods: function(wtid,gid){
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
    },
    
    /**
     * 改变数量
     */
    changeNum:  function(num){
        num = parseInt(num);
        if($('.multioffer-box').length > 0){
            var oldPrice = $('.multioffer-box').attr('data-sale-price');
            var newPrice = oldPrice;
            var isYouhui = false;
            $("[name='multibuy']").each(function(){
                var tnum = parseInt($(this).attr('value'));
                if(num >= tnum){
                    price = $(this).attr('lang');
                    newPrice = parseFloat($(this).attr('title'));
                    isYouhui = true;
                    $(this).attr('checked',true);
                }
            });
            if(isYouhui){
                $('#lim_price').html('可节省：<span class="price">￥ '+(oldPrice*num - newPrice*num).toFixed(2)+'</span>').show();
                $('#cart_buymode').val('multi_offer');
            }else{
                $("[name='multibuy']").attr('checked',false);
                $('#lim_price').hide();
                $('#cart_buymode').val('');
            }
            $("#cart_buynum").val(num);
            $("#goods-sale-price").text(newPrice);
        }
    },
    
    /**
     * 选择赠品
     */
    selectSendGoods: function (evt) {
        var randomNum = $('.sgoods-div').attr('data-random-num');
        var selectNum = $('.sgoods-div').find('.checked-yel').length;
        if($(evt).hasClass('checked-yel')){
            $(evt).removeClass('checked-yel');
            selectNum -= 1;
        }else{
            if(selectNum >= randomNum){
                alert_box('最多挑选'+randomNum+'件赠品哦!');
            }else{
                $(evt).addClass('checked-yel');
                selectNum += 1;
            }
        }
        if(selectNum > 0){
            var wtid = $('.sgoods-div').attr('data-wtid');
            var sendGids = '';
            $('.sgoods-div').find('.checked-yel').each(function(){
                sendGids += sendGids ? ','+$(this).attr('data-gid') : $(this).attr('data-gid');
            });
            $('#cart_buymode').val('withbuy');
            $('#cart_pam').val(sendGids);
            $('#cart_pam1').val(wtid);
        }else{
            $('#cart_buymode').val('');
            $('#cart_pam').val('');
            $('#cart_pam1').val('');
        }
    },
    
    /**
     * FAQ切换
     */
    bindToggleFaq:  function(){
        var tab_li = $('#problem-tab ul li');
        tab_li.live('click',function(){
            $(this).addClass('selected').siblings().removeClass('selected');
            var index = tab_li.index(this);
            $('div.ptab-box > div.pli-con').eq(index).show().siblings().hide();
        });
    },
    
    /**
     * 咨询评价条，滚动时固定
     */
    bindFloatBarFixed:   function(){
        $('.headerTop').removeClass('fixed');
        $('.header').css({'padding-top':'10px'});
        if($('.floatbar').length > 0 ){
            var ofc = $('.floatbar').next('.multi-content').offset().top;
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
        }
        //点击时候回到顶部
        $('.multi-tabs').find('a').click(function(){
            var ofc = $('.floatbar').next('.multi-content').offset().top-50;
            $('html,body').animate({scrollTop:ofc},1000);
        });
    },
    
    /**
     * 加减数量绑定事件
     */
    bindChangeNum:  function(){
        if($("[name='multibuy']").length > 0){
            $(".chgnum").click(function(){
                Epet.Goods.changeNum($("#cart_buynum").val());
            });
        }
    },
    
    /**
     * 跳至不一样的E宠区域
     */
    toContentEpet:  function(item){
        item = item ? item : 'zhengpin';
        Epet.Common.toggleTabs('.content-epet');
        var ofc = $('.floatbar').next('.multi-content').offset().top-50;
        setTimeout(function(){
            $('.'+item).trigger('click');
        },1000);
        $('html,body').animate({scrollTop:ofc},1000);
        return;
    },
    
    /**
     * 关注品牌
     */
    attentionBrand: function(){
        if(brandid){
            var isFollow = parseInt($('.follow-btn').attr('data-isFollow'));
            $.getJSON('/share/brand.html?do=addfollow&inajax=1&brandid='+brandid+'&follow='+isFollow, function(data){
                if (data.code == 'fail') {
                    alert_box(data.msg);
                } else {
                    var msg = '';
                    var followVal = isFollow;
                    if(isFollow){
                        msg = '取消关注成功！';
                        followVal = 0;
                        $('.follow-btn').removeClass('followed');
                    }else{
                        msg = '关注成功！';
                        followVal = 1;
                        $('.follow-btn').addClass('followed');
                    }
                    $('.follow-btn').attr('data-isFollow',followVal);
                    s_load(msg, 1000);
                }
            });
        }
    },
};

/**
 * 初始化
 */
$(document).ready(function(){
    //绑定FAQ切换事件
    Epet.Goods.bindToggleFaq();
    //咨询评价条，滚动时固定
    Epet.Goods.bindFloatBarFixed();
    //加减数量
    Epet.Goods.bindChangeNum();
    
});

/**以下为goods.js中未做改动的内容**/

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

//搭配购买 [为了方法名兼容，暂不改动]
function withbuy(wtid, gid){
    Epet.Goods.selectWithbuyGoods(wtid,gid);
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
});

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
    var so = new SWFObject(shareurl +"/js/player/PlayerLite.swf","CuPlayerV4",p_width,p_height,"9","#000000");
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
//预购商品弹窗提示
function advanceTips(gid,gtid,deliver_time){
    $.get("/global/main.html?do=recommend&inajax=1&gid="+gid+'&gtid='+gtid+'&deliver_time='+deliver_time,function(data){
        $('#recommend_tips').show();
        $("#recommend_tips").html(data);
        $('.hotsell-tcbg').bind('click', function(){
            $('#recommend_tips').hide();
        });
        $('.tip').bind('click', function(){
            $('#recommend_tips').hide();
        });
    });
}
function addAdvanceGoods(gid,buytype,pam){
    $("#recommend_tips").hide();
    cart_ctl('add', {gid: gid, buytype:buytype,pam:pam});
}



