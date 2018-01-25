/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
//var host = 'https://afx4ghqk.qcloud.la';
//var host = 'https://afx4ghqk.qcloud.la';
var host = 'http://localhost:5757';
//var host = 'http://www.yaozDapp.com';

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 登录地址，用于建立会话
        loginUrl: `${host}/weapp/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/weapp/user`,

        // 测试的请求地址，用于解密加密数据
        decryptUrl: `${host}/weapp/decrypt`,

        // 获取钱包地址接口
        //walletAddrUrl: `${host}/weapp/wallet`,

        // 获取User信息
        getUserInfoUrl: `${host}/weapp/getUserInfo`,

        // 更新User信息
        updateUserInfoUrl: `${host}/weapp/updateUserInfo`,

        // 注册用户
        registerUrl: `${host}/weapp/register`,

        /*****获取红娘相关信息*****/
        getDTaskInfoUrl: `${host}/weapp/getDTaskInfo`,
        getMySeekerUrl: `${host}/weapp/getMySeeker`,    // 获取当前红娘客户
        pushSeekerUrl: `${host}/weapp/pushSeekerInfo`,
        cancelPushSeekerUrl: `${host}/weapp/cancelPushSeekerInfo`,
        // 获取信息发布榜信息
        getMessageListUrl: `${host}/weapp/getMessageList`,
        // 获取代理人收到的推送信息
        getDReceivedPushUrl: `${host}/weapp/getDReceivedPush`,
        getSReceivedPushUrl: `${host}/weapp/getSReceivedPush`,
        // 插入信息
        insertD2SUrl: `${host}/weapp/insertD2S`,
        insertD2DUrl: `${host}/weapp/insertD2D`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/weapp/tunnel`,

        // 上传图片接口
        uploadUrl: `${host}/weapp/upload`
    }
};

module.exports = config;
