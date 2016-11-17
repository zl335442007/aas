//底部关键词更多和收起的动画
$(".showMore").toggle(function(){
    $(this).text("收起");
    $(this).parent().siblings(".fkmiddle").animate({height:"60px"},500);
},function(){
    $(this).text("更多"); 
    $(this).parent().siblings(".fkmiddle").animate({height:"30px"},500);
});

//底部关键词,是否隐藏更多按钮
$(".fkmiddle").each(function(){
    var fkm_height=$("p",this).height();
    if(fkm_height<=30) $(this).siblings(".fkright").hide();
});