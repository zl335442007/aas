/**
 * 商品按时间轮播
 */
$(".timemove ").mouseenter(function(){
    $(this).addClass('current').siblings().removeClass('current');
    var time = $(this).attr("value");
    $('.surprise-list ul').hide();
    var obj = $('.surprise-list ul[lang="' + time + '"]');
    if (obj.length > 0) {
        obj.show();
    } else {
        $.ajax({
            url:'/share/activitys/suprise.html?do=getsurprise',
            type:"POST",
            dataType:'html',
            data:{time:time},
            success:function(msg){
                $('.surprise-list').append('<ul class="clearfix" lang="'+time+'">' + msg + '</ul>');
            }
        });

    }

})
/**
 * 加入购物车
 * @param atid 活动号
 * @param gid商品编号
 */
function sale(atid,gid){
    var num = 1;
    var pam1 = gid+'|'+num;
    cart_ctl('add',{gid:gid,buytype:'discount',pam:atid,pam1:pam1,show_cart:false,succeed_box:1});
}
/**
 * 浮动
 */
$(".atonce-buy").live({"mouseenter":function() {
    $(this).animate({width:"77px"},300);
},"mouseout":function() {
    $(this).animate({width:"73px"},200);
}});

 /**
 * 轮播
 */
function daysurimg(){
    var bn_id = 0;
    var bn_id2= 1;
    var speed33=3000;
    var qhjg = 1;
    var MyMar33;
    $("#day-surimg .d1").hide();
    $("#day-surimg .d1").eq(0).fadeIn("slow");
    if($("#day-surimg .d1").length>1)
    {

        $("#daysurimg-id li").eq(0).addClass("nuw");
        function Marquee33(){
            bn_id2 = bn_id+1;
            if(bn_id2>$("#day-surimg .d1").length-1)
            {
                bn_id2 = 0;
            }
            $("#day-surimg .d1").eq(bn_id).css("z-index","2");
            $("#day-surimg .d1").eq(bn_id2).css("z-index","1");
            $("#day-surimg .d1").eq(bn_id2).show();
            $("#day-surimg .d1").eq(bn_id).fadeOut("slow");
            $("#daysurimg-id li").removeClass("nuw");
            $("#daysurimg-id li").eq(bn_id2).addClass("nuw");
            bn_id=bn_id2;
        };

        MyMar33=setInterval(Marquee33,speed33);

        $("#daysurimg-id li").click(function(){
            var bn_id3 = $("#daysurimg-id li").index(this);
            if(bn_id3!=bn_id&&qhjg==1)
            {
                qhjg = 0;
                $("#day-surimg .d1").eq(bn_id).css("z-index","2");
                $("#day-surimg .d1").eq(bn_id3).css("z-index","1");
                $("#day-surimg .d1").eq(bn_id3).show();
                $("#day-surimg .d1").eq(bn_id).fadeOut("slow",function(){qhjg = 1;});
                $("#daysurimg-id li").removeClass("nuw");
                $("#daysurimg-id li").eq(bn_id3).addClass("nuw");
                bn_id=bn_id3;
            }
        });
        $("#daysurimg-id").hover(
            function(){
                clearInterval(MyMar33);
            }
            ,
            function(){
                MyMar33=setInterval(Marquee33,speed33);
            }
        )
    }
    else
    {
        $("#daysurimg-id").hide();
    }
};
daysurimg();

