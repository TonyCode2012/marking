const { mysql: config } = require('../../config')
var mysql = require('mysql')
var urlParser = require('url')
var queryString  = require("querystring");
var util = require('./util')


var seekerPubInfoItems = "open_id,name,age,gender,height,weight,education,constellation,blood_type,portrait,wx_portraitAddr,requirement,self_introduction"

var delegatorPubInfoItems = "open_id,name,wx_portraitAddr"

var seekerContractPubInfo = "contract_addr,pDelegator_openid,pSeeker_openid,tDelegator_openid,tSeeker_openid,status,signature_date"

var connection = mysql.createConnection({
    host     : config.host,
    port     : config.port,
    user     : config.user,
    password : config.pass,
    database : config.db
});

connection.connect();

var getContractByIdsList = async function(ctx) {
    var dataList = urlParser.parse(ctx.originalUrl,true).query.idsList
    dataList = JSON.parse(dataList)
    console.log("=======contract:"+JSON.stringify(dataList))
    var resArry = []
    for(var i=0;i<dataList.length;i++) {
        var item = dataList[i]
        var ids = item.ids
        var index = item.index
        var res = await getContractByIds_r(ids,seekerContractPubInfo)
        if(res.status == 200) {
            var tmp = res.data[0] 
            tmp['index'] = index
            resArry.push(tmp)
        }
    }
    ctx.state.data = {
        result: resArry
    }
}

var getContractBySeekerId = async function(ctx) {
    var result = await getContractBySeekerId_r(ctx,'*')
    ctx.state.data = {
        result: result
    }
}

// 获取当前红娘发出推送的状态
var getDPushStatus = async function(ctx) {
    var result = await getD2SPushInfo(ctx)
    var state = 0
    var rStatus = result.status
    if(rStatus == 200) {
        state = result.data[0].status
    } else {
        state = (rStatus == 201 ? -1 : -2)
    }
    ctx.state.data = {
        state: state
    }
}

// 获取当前红娘收到的推送
//var getDReceivedPush = async function(ctx) {
var getDPush = async function(ctx) {
    //var resArry = await getReceivedPush_r(ctx,'delegator')
    var resArry = await getPush(ctx,'delegator')
    ctx.state.data = {
        result: resArry
    }
}

// 获取当前客户收到的推送
//var getSReceivedPush = async function(ctx) {
var getSPush = async function(ctx) {
    //var resArry = await getReceivedPush_r(ctx, 'seeker')
    var resArry = await getPush(ctx, 'seeker')
    ctx.state.data = {
        result: resArry
    }
}

//async function getReceivedPush_r(ctx, role) {
async function getPush(ctx, role) {
    var ctxData = urlParser.parse(ctx.originalUrl,true).query
    var open_id = ''
    var recvdArry = []
    var sendedArry = []
    var data = {}
    if(role == 'delegator') {
        data = await getD2DInfo(ctx,connection)
        open_id = ctxData.delegator_openid
    } else if(role == 'seeker') {
        data = await getD2SInfo(ctx,connection)
        open_id = ctxData.seeker_openid
    } else {
        console.log('please indicate role type(delegator/seeker)')
        return resArry
    }
    if(data.status == 200) {
        relatedList = data.data
        for(var i=0;i<relatedList.length;i++) {
            var item = relatedList[i]
            var tmpPush = {}
            console.log("========item:"+JSON.stringify(item))
            if(role == 'delegator') {
                if(open_id == item.pDelegator_openid) {
                    sendedArry.push(await getDSendedPush(item))
                } else {
                    recvdArry.push(await getDRecvdPush(item))
                }
            } else if(role == 'seeker') {
                recvdArry.push(await getSRecvdPush(item,open_id))
                // 暂时缺少客户发出的推送的获取
            }
        } 
    } else {
        console.log('get received push data failed!' + data.msg)
    }

    return {
        recvdPush: recvdArry,
        sendedPush: sendedArry
    }
}

var getMySeeker = async function(ctx) {
    var data = await getDTaskInfo_r(ctx,connection)
    if(data.status != 200) {
        console.log('Get record failed!' + data.msg)
    } else {
        var idArry = data.data
        var resArry = []
        var selectStr = "name,age,education,height,requirement,wx_portraitAddr,open_id"
        for(var i=0;i<idArry.length;i++) {
            var queryStr = "select " + selectStr + " from SeekerInfo where open_id='" + idArry[i].seeker_openId + "'"
            var result = await getSeekerInfoByQuery(queryStr,connection)
            if(result.data) {
                result.data[0]['is_release'] = idArry[i]['is_release']
                resArry.push(result.data[0])
            }
        }

        ctx.state.data = {
            result: resArry
        }
    }
}

var getMessageList = async function(ctx) {

    var data = await getMessageList_r(connection)
    var resArry = []
    if(data.status == 200) {
        var idArry = data.data
        for(var i=0;i<idArry.length;i++) {
            var queryStr = "select " + seekerPubInfoItems + " from SeekerInfo where open_id='" + idArry[i].seeker_openId + "' and is_public='1'"
            var result = await getSeekerInfoByQuery(queryStr,connection)
            if(result.status == 200) {
                result.data[0]['delegator_openid'] = idArry[i].delegator_openId // 获取对方代理人id
                if(result.data) {
                    resArry.push(result.data[0])
                }
            } else {
                console.log("message list: get seeker info failed!")
            }
        }
    }

    ctx.state.data = {
        result: resArry
    }
}

var getSeekerInfo = async function(ctx) {
    var result = await getSeekerInfo_r(ctx,connection)
    ctx.state.data = {
        result: result
    }
}

var getSeekerInfoByField = async function(data) {
    return await getSeekerInfoByField_r(data,connection)
}

var getDelegatorInfo = async function(ctx) {
    var result = await getDelegatorInfo_r(ctx,connection)
    ctx.state.data = {
        result: result
    }
}

var getUserInfo = async function(ctx) {
    var result = await getUserInfo_r(ctx,connection)
    ctx.state.data = {
        result: result
    }
}

var getDTaskInfo = async function(ctx) {

    var data = await getDTaskInfo_r(ctx,connection)
    var resArry = []
    if(data.status == 200) {
        var idArry = data.data
        for(var i=0;i<idArry.length;i++) {
            var queryStr = "select * from SeekerInfo where open_id='" + idArry[i].seeker_openId + "' and is_public=1"
            var result = await getSeekerInfoByQuery(queryStr,connection)
            if(result.status == 200) {
                result.data[0]['is_release'] = idArry[i]['is_release']
                resArry.push(result.data[0])
            }
        }
    }

    ctx.state.data = {
        result: resArry
    }
}

async function getDSendedPush(data) {
    var pSeekerInfo = {}
    var tSeekerInfo = {}
    var tDelegatorInfo = {}
    var r1 = await getSeekerPubInfo(data.pSeeker_openid,connection)
    var r2 = await getSeekerPubInfo(data.tSeeker_openid,connection)
    var r3 = await getDelegatorPubInfo(data.tDelegator_openid,connection)
    r1.status == 200 ? pSeekerInfo = r1.data[0] : {}
    r2.status == 200 ? tSeekerInfo = r2.data[0] : {}
    r3.status == 200 ? tDelegatorInfo = r3.data[0] : {}
    return {
        sendedSInfo: tSeekerInfo,
        sendedDInfo: tDelegatorInfo,
        fromSeekerInfo: pSeekerInfo
    }
}

async function getDRecvdPush(data) {
    var tSeekerInfo = {}
    var pSeekerInfo = {}
    var pDelegatorInfo = {}
    var r1 = await getSeekerPubInfo(data.tSeeker_openid,connection)
    var r2 = await getSeekerPubInfo(data.pSeeker_openid,connection)
    var r3 = await getDelegatorPubInfo(data.pDelegator_openid,connection)
    r1.status == 200 ? tSeekerInfo = r1.data[0] : {}
    r2.status == 200 ? pSeekerInfo = r2.data[0] : {}
    r3.status == 200 ? pDelegatorInfo = r3.data[0] : {}
    return {
        receivedSInfo: pSeekerInfo,
        receivedDInfo: pDelegatorInfo,
        toSeekerInfo: tSeekerInfo
    }
}

async function getSSendedPush(data) {
    var seekerInfo = {}
    var delegatorInfo = {}
    var seeker_openid = ''
    var delegator_openid = ''
    var myDelegator_openid = ''
    if(data.role == 'pSeeker') {
        seeker_openid = data.tSeeker_openid
        delegator_openid = data.tDelegator_openid
        myDelegator_openid = data.pDelegator_openid
    } else if(data.role == 'tSeeker') {
        seeker_openid = data.pSeeker_openid
        delegator_openid = data.pDelegator_openid
        myDelegator_openid = data.tDelegator_openid
    } else {
        console.log('please indicate seeker role type(pSeeker/tSeeker)')
        continue
    }
    r1 = await getSeekerPubInfo(seeker_openid,connection)
    r2 = await getDelegatorPubInfo(delegator_openid,connection)
    seekerInfo = (r1.status == 200 ? r1.data[0] : {})
    delegatorInfo = (r2.status == 200 ? r2.data[0] : {})
    return {
        receivedSInfo: seekerInfo,
        receivedDInfo: delegatorInfo,
        seeker_openid: open_id,
        delegator_openid: myDelegator_openid,
        status: data.status,
        role: data.role
    }
}

async function getSRecvdPush(data,open_id) {
    var seekerInfo = {}
    var delegatorInfo = {}
    var seeker_openid = ''
    var delegator_openid = ''
    var myDelegator_openid = ''
    if(data.role == 'pSeeker') {
        seeker_openid = data.tSeeker_openid
        delegator_openid = data.tDelegator_openid
        myDelegator_openid = data.pDelegator_openid
    } else if(data.role == 'tSeeker') {
        seeker_openid = data.pSeeker_openid
        delegator_openid = data.pDelegator_openid
        myDelegator_openid = data.tDelegator_openid
    } else {
        console.log('please indicate seeker role type(pSeeker/tSeeker)')
    }
    r1 = await getSeekerPubInfo(seeker_openid,connection)
    r2 = await getDelegatorPubInfo(delegator_openid,connection)
    seekerInfo = (r1.status == 200 ? r1.data[0] : {})
    delegatorInfo = (r2.status == 200 ? r2.data[0] : {})
    return {
        receivedSInfo: seekerInfo,
        receivedDInfo: delegatorInfo,
        seeker_openid: open_id,
        delegator_openid: myDelegator_openid,
        status: data.status,
        role: data.role
    }
}

function getContractByIds_r(ids,fields) {
    return new Promise(function (resolve, reject) {
        var cdStr = util.getConditionAll(ids,'and')
        var queryStr = "select " + fields + " from MatchContract where " + cdStr
        console.log("========query:"+queryStr)
        queryFromDB(resolve,reject,queryStr,connection)
    })
}

function getContractBySeekerId_r(ctx,fields) {
    return new Promise(function (resolve, reject) {
        var data = urlParser.parse(ctx.originalUrl,true).query
        var seeker_openid = data.seeker_openid
        var queryStr = "select " + fields + ",if(pSeeker_openid='" + seeker_openid 
            + "','pSeeker','tSeeker') as role from MatchContract where pSeeker_openid='" + seeker_openid 
            + "' or tSeeker_openid='" + seeker_openid + "'"
        queryFromDB(resolve,reject,queryStr,connection)
    })
}

function getD2SPushInfo(ctx) {
    return new Promise(function (resolve, reject) {
        var data = urlParser.parse(ctx.originalUrl,true).query
        var cdStr = util.getConditionAll(data,'and')
        var queryStr = "select * from D2SPush where " + cdStr
        queryFromDB(resolve,reject,queryStr,connection)
    })
}

function getD2DInfo(ctx, connection) {
    return new Promise(function (resolve, reject) {
        var data = urlParser.parse(ctx.originalUrl,true).query
        console.log("=========data:"+JSON.stringify(data))
        var queryStr = "select * from D2DPush where tDelegator_openid='" + data.delegator_openid + "' or pDelegator_openid='" + data.delegator_openid + "'"
        queryFromDB(resolve,reject,queryStr,connection)
    })
}

async function getD2SInfo(ctx, connection) {
    var res = {}
    var r1 = await getD2SInfo_p(ctx,connection)
    var r2 = await getD2SInfo_t(ctx,connection)
    if(r1.status == 200) {
        var d1 = r1.data
        for(var i=0;i<d1.length;i++) d1[i].role = 'pSeeker'
    }
    if(r2.status == 200) {
        var d2 = r2.data
        for(var i=0;i<d2.length;i++) d2[i].role = 'tSeeker'
    }
    if(r1.status == 200 && r2.status == 200) {
        r1.data = r1.data.concat(r2.data)
        res = r1
    } else if(r1.status == 200) {
        res = r1
    } else if(r2.status == 200) {
        res = r2
    } else {
        // 如果两个函数都拿不到数据，则将r1的值赋给res
        res = r1
    }
    return res
}

function getD2SInfo_p(ctx, connection) {
    return new Promise(function (resolve, reject) {
        var data = urlParser.parse(ctx.originalUrl,true).query
        var queryStr = "select * from D2SPush where pSeeker_openid='" + data.seeker_openid + "'"
        queryFromDB(resolve,reject,queryStr,connection)
    })
}

function getD2SInfo_t(ctx, connection) {
    return new Promise(function (resolve, reject) {
        var data = urlParser.parse(ctx.originalUrl,true).query
        var queryStr = "select * from D2SPush where tSeeker_openid='" + data.seeker_openid + "'"
        queryFromDB(resolve,reject,queryStr,connection)
    })
}

// 获取角色信息 \\
function getDelegatorInfo_r(ctx, connection) {
    return new Promise(function (resolve, reject) {
        var data = urlParser.parse(ctx.originalUrl,true).query

        var openId = data.open_id
        var queryStr = "select * from DelegatorInfo where open_id='" + openId + "'"

        queryFromDB(resolve, reject, queryStr,connection)
    })
}

function getSeekerInfoByQuery(queryStr, connection) {
    return new Promise(function (resolve, reject) {
        queryFromDB(resolve, reject, queryStr,connection)
    })
}

function getSeekerInfo_r(ctx, connection) {
    return new Promise(function (resolve, reject) {
        var data = urlParser.parse(ctx.originalUrl,true).query

        var openId = data.open_id
        var queryStr = "select * from SeekerInfo where open_id='" + openId + "'"

        queryFromDB(resolve, reject, queryStr,connection)
    })
}

function getSeekerInfoByField_r(data, connection) {
    return new Promise(function (resolve, reject) {
        var openId = data.open_id
        var fields = data.fields
        var queryStr = "select "+fields+" from SeekerInfo where open_id='" + openId + "'"

        queryFromDB(resolve, reject, queryStr,connection)
    })
}

function getUserInfo_r(ctx, connection) {
    return new Promise(function (resolve, reject) {
        var data = urlParser.parse(ctx.originalUrl,true).query

        var openId = data.open_id
        //var tableId = ''
        //switch(data.role) {
        //    case 'user': tableId='User';break;
        //    case 'seeker': tableId='SeekerInfo';break;
        //    case 'delegator': tableId='DelegatorInfo';break;
        //}
        //var queryStr = "select * from " + tableId + " where open_id='" + openId + "'"
        var queryStr = "select * from User where open_id='" + openId + "'"

        queryFromDB(resolve, reject, queryStr,connection)
    })
}

function getDTaskInfo_r(ctx,connection) {
    return new Promise(function (resolve, reject) {
        var data = urlParser.parse(ctx.originalUrl,true).query
        var queryStr = "select * from DelegationShip where delegator_openId='" + data.delegator_openid + "'"

        queryFromDB(resolve, reject, queryStr,connection)
    })
}

//function getSeekerInfo_r(queryStr, connection) {
//    return new Promise(function (resolve, reject) {
//        queryFromDB(resolve, reject, queryStr, connection)
//    })
//}

function getMessageList_r(connection) {
    return new Promise(function (resolve, reject) {
        var queryStr = "select * from DelegationShip where is_release='1'"
        queryFromDB(resolve, reject, queryStr, connection)
    })
}

function getSeekerPubInfo(seeker_openid,connection) {
    return new Promise(function (resolve, reject) {
        var queryStr = "select "+seekerPubInfoItems+" from SeekerInfo where open_id='"+seeker_openid+"'"
        queryFromDB(resolve, reject, queryStr, connection)
    })
}

function getDelegatorPubInfo(delegator_openid,connection) {
    return new Promise(function (resolve, reject) {
        var queryStr = "select "+delegatorPubInfoItems+" from DelegatorInfo where open_id='"+delegator_openid+"'"
        queryFromDB(resolve, reject, queryStr, connection)
    })
}

function queryFromDB(resolve, reject, queryStr, connection) {
    // get info from User by open_id
    connection.query(queryStr, function (error, results, fields) {
        var retInfo = {}
        if (error) {
            console.log(error);
            retInfo = {
                msg: 'get info failed!',
                code: error.code,
                errno: error.errno,
                sqlMessage: error.sqlMessage,
                status: 400
            }
        } else if(results.length == 0) {
            retInfo = {
                msg: 'no record found!',
                status: 201
            }
        } else {
            retInfo = {
                msg: 'get info successfully!',
                data: results,
                status: 200
            }
        }
        resolve(retInfo)
    });
    
}

module.exports = {
    getUserInfo: getUserInfo,
    getSeekerInfo: getSeekerInfo,
    getSeekerInfoByField: getSeekerInfoByField,
    getDelegatorInfo: getDelegatorInfo,
    getDTaskInfo: getDTaskInfo,
    getMessageList: getMessageList,
    getMySeeker: getMySeeker,
    getDPush: getDPush,
    getSPush: getSPush,
    getContractBySeekerId: getContractBySeekerId,
    getContractByIdsList: getContractByIdsList,
    //getDReceivedPush: getDReceivedPush,
    //getSReceivedPush: getSReceivedPush,
    getDPushStatus: getDPushStatus,
}
