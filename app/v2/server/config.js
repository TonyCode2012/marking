const CONF = {
    port: '5757',
    rootPathname: '',

    // 微信小程序 App ID
    appId: 'wx8727802679966793',

    // 微信小程序 App Secret
    appSecret: '20a3bf08c37e5006e37e409797a6cd67',
    //appSecret: '',

    // 是否使用腾讯云代理登录小程序
    //useQcloudLogin: true,
    useQcloudLogin: false,

    /**
     * MySQL 配置，用来存储 session 和用户信息
     * 若使用了腾讯云微信小程序解决方案
     * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
     */
    mysql: {
        //host: 'https://afx4ghqk.qcloud.la',
        host: 'localhost',
        //host: '127.0.0.1',
        port: 3306,
        user: 'root',
        db: 'cAuth',
        pass: 'fishbowl',
        char: 'utf8mb4'
    },

    cos: {
        /**
         * 地区简称
         * @查看 https://cloud.tencent.com/document/product/436/6224
         */
        region: 'ap-guangzhou',
        // Bucket 名称
        fileBucket: 'qcloudtest',
        // 文件夹
        uploadFolder: '/home/vdeadmin/errands/ethereum/project/marking/app/v2/uploadFolder'
    },

    // 微信登录态有效期
    wxLoginExpires: 7200,
    wxMessageToken: 'abcdefgh'
}

module.exports = CONF
