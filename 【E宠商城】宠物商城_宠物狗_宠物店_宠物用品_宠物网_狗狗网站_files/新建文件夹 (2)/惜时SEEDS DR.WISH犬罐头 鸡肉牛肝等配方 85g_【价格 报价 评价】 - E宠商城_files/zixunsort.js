$(function(){
    //联动菜单 咨询分类
    $(".Zixun-nav span").live('click',function(){
        s_load();
        var type = $(this).parent().attr('data-type');
        if(type == 'dog'){
            $(this).addClass("spandetaildog").siblings().removeClass("spandetaildog");
        }else{
            $(this).addClass("spandetailcat").siblings().removeClass("spandetailcat");
        }
        $("#content").remove();
        var typesort = $(this).attr('data-type');
        var gid = $(this).parent().attr('data-gid');
        var gids = $(this).parent().attr('data-gids');
        var log = $(this).parent().attr('data-log');
        var zixun = $(this).parent().attr('data-zixun');
        var page = $(this).parent().attr('data-page');
        var total = $(this).attr('data-total');
        get_zuxun(typesort,gid,log,zixun,page,total,gids);
        return false;
    });

    $('.pages>a').live('click',function(){
        s_load();
        var typesort = $(this).parent().parent().parent().attr('data-type');
        var type = $('.Zixun-navdiv .Zixun-nav').attr('data-type');
        $('.Zixun-navdiv .Zixun-nav span').each(function(){
            if($(this).attr('data-type') == typesort){
                if(type == 'dog'){
                    $(this).addClass("spandetaildog").siblings().removeClass("spandetaildog");
                }else{
                    $(this).addClass("spandetailcat").siblings().removeClass("spandetailcat");
                }
            }
        })
        var gid = $('.Zixun-navdiv .Zixun-nav').attr('data-gid');
        var gids = $('.Zixun-navdiv .Zixun-nav').attr('data-gids');
        var log = $('.Zixun-navdiv .Zixun-nav').attr('data-log');
        var zixun = $('.Zixun-navdiv .Zixun-nav').attr('data-zixun');
        var page;
        if($(this).attr('name')){
            page = $(this).attr('name');
        }else{
            page = $(this).html();
        }
        $('.Zixun-navdiv .Zixun-nav').attr('data-page',page);
        var total = $(this).parent().parent().parent().attr('data-total');
        $("#content").remove();
        get_zuxun(typesort,gid,log,zixun,page,total,gids);
        return false;
    });

    var get_zuxun = function(typesort,gid,log,zixun,page,total,gids){
        $.post("/share/zixun.html?do=sort&ajax=1",{typesort:typesort,gid:gid,log:log,zixun:zixun,page:page,total:total,gids:gids},function(data){
            h_load();
            $("#zixun").html(data);
            if(zixun == 1){
                document.documentElement.scrollTop = document.body.scrollTop = 0;
            }
        });
    }
})