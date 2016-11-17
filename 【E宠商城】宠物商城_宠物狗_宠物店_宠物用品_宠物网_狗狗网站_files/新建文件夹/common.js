/**
 * WWW公共JS(新)
 */
var Epet = {
    Cart : {},
    Common : {
        /**
         * 添加收藏
         */
        addFavors : function(gids){
            s_load();
            var url = reurl("share/box.html?act=add_favors&inajax=1&gid=" + gids);
            $.get(url, {}, function (data) {
                h_load();
                if (data == 'nl') {
                    location.href = "https://passport.gutou.com/login.html?referer=http://www.epet.com/cart/main.html";
                } else {
                    alert_box(data);
                }
            });
        },
        
        /**
         * 标签页[联动菜单]切换
         */
        toggleTabs: function(evt){
            var mu = $(evt).parent();
            var idx = mu.find("a").index($(evt));
            var sdiv = mu.next(".multi-content").find("> div").eq(idx);
            if(sdiv.html() == ''){
                sdiv.addClass('content-loading');
                var url = $(evt).attr('data-url');
                if(url){
                    sdiv.load(reurl(url),{inajax:1},function(){
                        sdiv.removeClass('content-loading');
                        lazyload({evt: sdiv.get(0)});
                    });
                }
            }
            mu.next(".multi-content").find("> div").hide();
            sdiv.show();
            lazyload({evt: sdiv.get(0)});
            mu.find("a").removeClass("hov");
            $(evt).addClass("hov");
        },
        
        /**
         * 选择城市
         * @param {object} pdiv 显示省市区的div
         * @param {int} placeid 父级ID
         */
        showPlace:  function(pdiv,placeid){
            var pContent = pdiv.parents('.place-content');
            var pHeader =  pContent.prev('.place-header');
            var index = pContent.find('> div').index(pdiv);
            var title = pHeader.find('li').eq(index);
            if(index > 0 && (typeof(placeid) == 'undefined' || !placeid)){
                placeid = parseInt(title.attr('data-parentid'))
            }
            if(pdiv.html() == ''){
                if(!placeid){
                    return false;
                }
                title.attr('data-parentid',placeid);
                if(pdiv.html() == ''){
                    pdiv.addClass('content-loading');
                    pdiv.load(reurl('share/place/location.html?inajax=1&placeid='+placeid),function(){
                        pdiv.removeClass('content-loading');
                    });
                }
            }
            title.show().addClass('current').siblings().removeClass('current');
            pContent.find('> div').hide();
            pdiv.show();
        },
        
        /**
         * 设置城市
         */
        setLocationPlace:   function(provinceId,cityId,areaId){
            var placeIdStr = provinceId+'_'+cityId+'_'+areaId;
            $.get(reurl('share/place/location.html?do=setPlace&inajax=1&placeIdStr='+placeIdStr),function(){
                location.reload();
            });
        },
        
    },
};

/**
 * 初始化
 */
$('document').ready(function(){
    //绑定标签页[联动菜单]切换
    if($(".multi-tabs").length > 0){
        $(".multi-tabs a").live('click',function(){
            Epet.Common.toggleTabs(this);
        });
    }
    //选地区
    $('.place-div').live('mouseover',function(){
        $(this).find('.place-hide').show();
        $(this).find('.place-show b').addClass('bb');
    });
    $('.place-div').live('mouseout',function(){
        $('.place-hide').hide();
        $(this).find('.place-show b').removeClass('bb');
    });
    
    //省市区title切换
    $('.place-div .place-header li').live('click',function(){
        var pHeader = $(this).parent('.place-header');
        var index = pHeader.find('li').index($(this));
        var pdiv = pHeader.next('.place-content').find('> div').eq(index);
        Epet.Common.showPlace(pdiv,pdiv.attr('data-parentid'));
    });
    
    //选择省市区
    $('.place-content a').live('click',function(){
        var placeid = $(this).attr('data-placeid');
        var pContent = $(this).parents('.place-content');
        var pHeader = pContent.prev('.place-header');
        var index = pHeader.find('li').index(pHeader.find('li.current'));
        var dataIndex = $(this).attr('data-index');//指定香港钓鱼岛等直接选省
        pHeader.find('li.current').attr({'data-placeid':placeid});
        pHeader.find('li.current').nextAll().attr('data-placeid',0);
        if(index == 2 || dataIndex == 2){//选择区,设置
            var provinceId = parseInt(pHeader.find('.title-province').attr('data-placeid'));
            var cityId = parseInt(pHeader.find('.title-city').attr('data-placeid'));
            var areaId = parseInt(pHeader.find('.title-area').attr('data-placeid'));
            Epet.Common.setLocationPlace(provinceId,cityId,areaId);
            $('.place-hide').hide();
        }else{//显示下一级
            var pdiv = pContent.find('> div').eq(index+1);
            pdiv.html('').next().html('');
            $(this).parents('.city-conbox').find('a').removeClass('current');
            $(this).addClass('current');
            pHeader.find('li.current').nextAll().hide();
            Epet.Common.showPlace(pdiv,placeid);
        }
    });
    
});