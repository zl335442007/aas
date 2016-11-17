/**
* ajax 动态加载 登录信息 基础信息
*/
(function(undefined){
    var gutou_loadbase = {};

    gutou_loadbase._init = function(){
        gutou_loadbase._live();
    }

    gutou_loadbase._live = function(){
        $('.pre_loading').show();
        // 加载登录的信息
        gutou_loadbase.loginData();
    }

    // 每次加载页面 加载登录信息
    gutou_loadbase.loginData = function(){
        var param = '';
        var fm = getUrlParam('fm');
        if(fm && fm !== 'null'){
            param += '&fm='+fm;
        }
        var app1 = app || '';
        if(app1 == 'goods' || app1 == 'goods/detail'){//商品详情页
            if(typeof(buytype) != 'undefined'){
                param += '&buytype='+buytype;
            }
            if(typeof(tid) != 'undefined'){
                param += '&tid='+tid;
            }
            if(typeof(goodsType) != 'undefined'){
                param += '&goods_type='+goodsType;
            }
            param += '&gid='+goodid;
        }
        $.ajax({
            type:'GET',
            url:'/json/data.html?inajax=1&t='+(new Date().getTime()),
            data:'jsoncallback=gutou_loadbase.loaduserinfo'+param+'&app='+app1,
            dataType:'jsonp'
        });
    }

    gutou_loadbase.loaduserinfo = function(data){
        $('.pre_loading').hide();
        if(data.method == 'write'){
            if(data.append){
                $.each(data.append,function(k,v){
                    $("[data-name='"+k+"']").append(v);
                });
            }

            if(data.remove){
                $.each(data.remove,function(k,v){
                    $("[data-name='"+k+"']").remove();
                });
            }

            if(data.html){
                $.each(data.html,function(k,v){
                    $("[data-name='"+k+"']").html(v);
                });
            }
            if(data.runFunction){
                eval(''+data.runFunction+'('+data.data+');');
            }
        }
    }

    if(window.gutou_loadbase == undefined) {
        window.gutou_loadbase = gutou_loadbase;
    }
})();
function runFunction(data){
    //alert('ok');
}

//$(document).ready(function(){
    gutou_loadbase._init();
//});
//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}