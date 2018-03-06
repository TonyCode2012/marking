/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/weapp'
})
const controllers = require('../controllers')
const dbControllers = require('../controllers/db')

// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')

// --- 登录与授权 Demo --- //
// 登录接口
router.get('/login', authorizationMiddleware, controllers.login)
// 用户信息接口（可以用来验证登录态）
router.get('/user', validationMiddleware, controllers.user)

// --- 图片上传 Demo --- //
// 图片上传接口，小程序端可以直接将 url 填入 wx.uploadFile 中
//router.post('/upload', controllers.upload)
router.post('/upload', controllers.upload.upload2Mysql)

// --- 解密数据 Demo --- //
router.get('/decrypt', controllers.decrypt)

// --- 数据库操作 --- //
router.get('/registerUser', dbControllers.register.registerUser)
router.get('/registerSeeker', dbControllers.register.registerSeeker)
router.get('/registerDelegator', dbControllers.register.registerDelegator)
router.get('/insertD2S', dbControllers.insert.insertD2S)
router.get('/insertD2D', dbControllers.insert.insertD2D)
router.get('/insertDelegationShip', dbControllers.insert.insertDelegationShip)
router.get('/insertMatchContract', dbControllers.insert.insertMatchContract)
router.get('/getUserInfo', dbControllers.getInfo.getUserInfo)
router.get('/getSeekerInfo', dbControllers.getInfo.getSeekerInfo)
router.get('/getDelegatorInfo', dbControllers.getInfo.getDelegatorInfo)
router.get('/getDTaskInfo', dbControllers.getInfo.getDTaskInfo)
router.get('/getMySeeker', dbControllers.getInfo.getMySeeker)
router.get('/getMessageList', dbControllers.getInfo.getMessageList)
router.get('/getDPush', dbControllers.getInfo.getDPush)
router.get('/getSPush', dbControllers.getInfo.getSPush)
router.get('/getContractBySeekerId', dbControllers.getInfo.getContractBySeekerId)
router.get('/getContractByIdsList', dbControllers.getInfo.getContractByIdsList)
//router.get('/getDReceivedPush', dbControllers.getInfo.getDReceivedPush)
//router.get('/getSReceivedPush', dbControllers.getInfo.getSReceivedPush)
router.get('/getDPushStatus', dbControllers.getInfo.getDPushStatus)
router.get('/updateUserInfo', dbControllers.updateInfo.updateInfo)
router.get('/pushSeekerInfo', dbControllers.updateInfo.pushSeekerInfo)
router.get('/cancelPushSeekerInfo', dbControllers.updateInfo.cancelPushSeekerInfo)
router.get('/sendMatchAccept', dbControllers.updateInfo.setMatchAccept)
router.get('/sendMatchRefuse', dbControllers.updateInfo.setMatchRefuse)
router.get('/sendMarryAccept', dbControllers.updateInfo.setMarryAccept)
router.get('/sendMarryRefuse', dbControllers.updateInfo.setMarryRefuse)

// --- 获取区块链钱包地址 Demo --- //
// 图片上传接口，小程序端可以直接将 url 填入 wx.uploadFile 中
//router.get('/wallet', controllers.walletAddr)

// --- 信道服务接口 Demo --- //
// GET  用来响应请求信道地址的
router.get('/tunnel', controllers.tunnel.get)
// POST 用来处理信道传递过来的消息
router.post('/tunnel', controllers.tunnel.post)

// --- 客服消息接口 Demo --- //
// GET  用来响应小程序后台配置时发送的验证请求
router.get('/message', controllers.message.get)
// POST 用来处理微信转发过来的客服消息
router.post('/message', controllers.message.post)

module.exports = router
