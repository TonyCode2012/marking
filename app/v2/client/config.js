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

        // 获取seeker信息
        getSeekerInfoUrl: `${host}/weapp/getSeekerInfo`,

        // 更新seeker信息
        updateSeekerInfoUrl: `${host}/weapp/updateSeekerInfo`,

        // 注册user用户
        registerUserUrl: `${host}/weapp/registerUser`,

        // 注册seeker用户
        registerSeekerUrl: `${host}/weapp/registerSeeker`,

        // 获取用户信息接口
        getUserInfoUrl: `${host}/weapp/getUserInfo`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/weapp/tunnel`,

        // 上传图片接口
        uploadUrl: `${host}/weapp/upload`
    }
};

module.exports = config;
