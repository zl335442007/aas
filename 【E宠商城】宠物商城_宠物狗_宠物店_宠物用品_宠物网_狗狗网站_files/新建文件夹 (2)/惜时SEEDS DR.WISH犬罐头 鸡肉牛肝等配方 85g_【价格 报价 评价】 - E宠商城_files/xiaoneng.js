/**
 * 小能在线客服系统
 * 如果需要自定义接待组和点开咨询按钮，请在share_footer之前定义如下两个变量
 * var NTKF_SETTINGID = "接待组";
 * //点击打开聊天咨询对象自定义,
 * var NTKF_CLICKBUTTON = "#click_obj";
 * //单独某个页面不需要客服功能
 * var NTKF_CLOSED = true;
 * //是否新窗口打开
 * var NTKF_WINDOW = true;
 */
var NTKF_PARAM ={
    "siteid":"kf_9267" /*网站siteid*/,
    "settingid":"kf_9267_1463638753462" /*接待组ID*/, 
    "uid":"" /*会员ID*/,
    "uname":""/*会员名*/,
    "userlevel": "0"/*会员等级*/
}

function xiaonengTalk(objId, talk_param){
    if( typeof(NTKF_CLOSED) != 'undefined' || typeof(objId) == 'undefined' || objId == '' ){
        return false;
    }
    
    if( typeof(talk_param) != 'undefined' ){
        NTKF_PARAM = $.extend(NTKF_PARAM, talk_param);
    }

    //由于很多页面启用了varnish缓存
    //所以ajax重新获取用户信息
    $.ajax({
        type: "GET",
        url:  "/share/verifi/login.html?do=getinfo",        //获取会员信息的API接口
        data: {},           //API参数
        dataType:'json',    //返回数据类型
        success: function(res){
            NTKF_PARAM.uid = res.uid || "";
            NTKF_PARAM.uname = res.username || "";
            loadNtalkerScript();
        },
        error : function() {
            loadNtalkerScript();
        }
    });
    //绑定点击
    bindClick(objId);
}

function bindClick(objId){
    //指定某个元素点击打开咨询
    $(objId).live('click',function(){
        if( NTKF_PARAM.uid == '0' || NTKF_PARAM.uid == '' ){
            console.log(NTKF_PARAM);
            return false;
        }
        //新窗口打开
        if( typeof(NTKF_WINDOW)!='undefined' && NTKF_WINDOW){
            NTKF.im_getAppChatWindowURL({header: 0}, function(url){
                window.open(url);
            });
        }else {
            NTKF.im_openInPageChat(NTKF_PARAM.settingid);
        }
    });
}

//加载小能脚本
function loadNtalkerScript(){
    var headElement, node;
    headElement	= document.getElementsByTagName('head')[0];
    node		= document.createElement('script');
    node.type	= 'text/javascript';
    node.async	= 'async';
    node.charset= "utf-8";
    node.src = ('https:' == document.location.protocol ? 'https://dl.ntalker.com/js/xn6/ntkfstat.js?siteid=' : 'http://dl.ntalker.com/js/xn6/ntkfstat.js?siteid=') + NTKF_PARAM.siteid ;
    headElement.insertBefore(node, headElement.lastChild);
}