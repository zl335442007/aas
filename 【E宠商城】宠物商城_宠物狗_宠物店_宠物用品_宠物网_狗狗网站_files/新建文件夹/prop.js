//图片抛物线动画
/*! fly - v1.0.0 - 2014-12-22
* https://github.com/amibug/fly
* Copyright (c) 2014 wuyuedong; Licensed MIT */
!function(a){a.fly=function(b,c){var d={version:"1.0.0",autoPlay:!0,vertex_Rtop:20,speed:1.2,start:{},end:{},onEnd:a.noop},e=this,f=a(b);e.init=function(a){this.setOptions(a),!!this.settings.autoPlay&&this.play()},e.setOptions=function(b){this.settings=a.extend(!0,{},d,b);var c=this.settings,e=c.start,g=c.end;f.css({marginTop:"0px",marginLeft:"0px",position:"fixed"}).appendTo("body"),null!=g.width&&null!=g.height&&a.extend(!0,e,{width:f.width(),height:f.height()});var h=Math.min(e.top,g.top)-Math.abs(e.left-g.left)/3;h<c.vertex_Rtop&&(h=Math.min(c.vertex_Rtop,Math.min(e.top,g.top)));var i=Math.sqrt(Math.pow(e.top-g.top,2)+Math.pow(e.left-g.left,2)),j=Math.ceil(Math.min(Math.max(Math.log(i)/.05-75,30),100)/c.speed),k=e.top==h?0:-Math.sqrt((g.top-h)/(e.top-h)),l=(k*e.left-g.left)/(k-1),m=g.left==l?0:(g.top-h)/Math.pow(g.left-l,2);a.extend(!0,c,{count:-1,steps:j,vertex_left:l,vertex_top:h,curvature:m})},e.play=function(){this.move()},e.move=function(){var b=this.settings,c=b.start,d=b.count,e=b.steps,g=b.end,h=c.left+(g.left-c.left)*d/e,i=0==b.curvature?c.top+(g.top-c.top)*d/e:b.curvature*Math.pow(h-b.vertex_left,2)+b.vertex_top;if(null!=g.width&&null!=g.height){var j=e/2,k=g.width-(g.width-c.width)*Math.cos(j>d?0:(d-j)/(e-j)*Math.PI/2),l=g.height-(g.height-c.height)*Math.cos(j>d?0:(d-j)/(e-j)*Math.PI/2);f.css({width:k+"px",height:l+"px","font-size":Math.min(k,l)+"px"})}f.css({left:h+"px",top:i+"px"}),b.count++;var m=window.requestAnimationFrame(a.proxy(this.move,this));d==e&&(window.cancelAnimationFrame(m),b.onEnd.apply(this))},e.destory=function(){f.remove()},e.init(c)},a.fn.fly=function(b){return this.each(function(){void 0==a(this).data("fly")&&a(this).data("fly",new a.fly(this,b))})}}(jQuery);
$(function(){
	//宝箱fly	
	var offset = $("#rtbar").offset();
	$(".chestbox").live('click',function(event){
            var pchid = $("input[name='pchid']").val();
		$(this).html("<img src='"+shareurl+"/www/images/epet/chestbox-open.png'>");
		$(this).css({left:-9,top:17});
		$(".xqbaox").css({left:425,top:0});			
		var img = $(this).parent().find(".chesbox-pro img").attr("src");
		var flyer = $('<img class="u-flyer" src="'+img+'">');
		flyer.fly({
			start: {
				left: event.pageX,
				top: $(this).offset().top-$(document).scrollTop(),
			},
			end: {
				left: offset.left+10,
				top: 164,
				width: 0,
				height: 0
			},
			onEnd: function(){
				$(".chestbox").remove();
                         $.post('?do=getBox&inajax=1',{pchid:pchid},function(data){
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
                                var bagbox = $(".bagBox");
                                bagbox.load(reurl('share/prop.html?do=ShowMyBag&inajax=1'));
                                hovershow(bagbox);
                                bagbox.show("slow");
                                setTimeout(closeChestBox,6000);
                            }else{
                                alert_box(msg);
                            }
                            //this.destory();
                        });
			}			
		});		
		$(".chestbox-close").live('click',function(){
			$(".chestbox-tc").hide();
		});	
	});	
});

function closeChestBox(){
    $(".chestbox-tc").css('display','none');
}
