$(document).ready(function(){
	setTimeout(visitLog, 10000);
});
function visitLog(){
	//$.get(reurl('share/visitLog.html'),{pageurl:window.location.href});
	$.ajax({
		url: reurl('share/visitLog.html'),
		type: 'POST',
		timeout:5000,
		data:{pageurl:window.location.href}
	});
}
//品友=======================================================================
var _py = _py || [];
$(function (){
        _py.push(['a', 'P-..IiRNoC0BdN7ZqOCRoeyFl0']);
    _py.push(['domain','stats.ipinyou.com']);
    _py.push(['e','']);
    if(app == 'goods'){
        var _goodsData = 
        {
        id:goodid, //商品ID（必填）
        soldOut:stock<=0 ? 1 : 0, // 状态 1下架，0在售（必填）
        category:parent_cname+'-'+cate_name, // 所属分类完整路径 （必填）
        categoryId:cate_id, // 所属分类ID （必填）
        name:subject, // 商品名称（必填）
        price:nowprice, // 商品售价（必填）
        imgUrl:imgurl, // 商品预览图 （必填）
        productUrl:'http://www'+cookiedomain+'/goods/'+goodid+'.html', // 商品URL地址 （必填）
        domain:'', // 分站（如有分站必填）
        brand:'', // 商品品牌(选填)
        promotion:'', // 促销信息 (选填)
        discount:'', // 折扣数字(选填)
        origPrice:price // 商品原价(选填)
        };
        _py.push(['pi',_goodsData]);
    }
        if(app == 'goods' || app == 'goodslist'){
                _py.push(['pv',jskey]);
        }
        -function(d) {
                var s = d.createElement('script'),
                e = d.body.getElementsByTagName('script')[0]; e.parentNode.insertBefore(s, e),
                f = 'https:' == location.protocol;
                s.src = (f ? 'https' : 'http') + '://'+(f?'fm.ipinyou.com':'fm.p0y.cn')+'/j/adv.js';
        }(document);
});

