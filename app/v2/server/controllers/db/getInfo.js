const { mysql: config } = require('../../config')
var mysql = require('mysql')
var urlParser = require('url')
var queryString  = require("querystring");


var seekerPubInfoItems = "open_id,name,age,gender,height,weight,education,constellation,blood_type,portrait,wx_portraitAddr,requirement,self_introduction"

var delegatorPubInfoItems = "open_id,name,wx_portraitAddr"

var connection = mysql.createConnection({
    host     : config.host,
    port     : config.port,
    user     : config.user,
    password : config.pass,
    database : config.db
});

connection.connect();

// 获取当前红娘收到的推送
var getDReceivedPush = async function(ctx) {

    var resArry = await getReceivedPush_r(ctx,'delegator')
    
    ctx.state.data = {
        result: resArry
    }
}

// 获取当前客户收到的推送
var getSReceivedPush = async function(ctx) {

    var resArry = await getReceivedPush_r(ctx, 'seeker')
    
    ctx.state.data = {
        result: resArry
    }
}

async function getReceivedPush_r(ctx, role) {
    var ctxData = urlParser.parse(ctx.originalUrl,true).query
    var open_id = ''
    var resArry = []
    //var data = (role=='delegator'?await getD2DInfo(ctx,connection):await getD2SInfo(ctx,connection))
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
            if(role == 'delegator') {
                var tSeekerInfo = {}
                var pSeekerInfo = {}
                var pDelegatorInfo = {}
                var r1 = await getSeekerPubInfo(item.tSeeker_openid,connection)
                var r2 = await getSeekerPubInfo(item.pSeeker_openid,connection)
                var r3 = await getDelegatorPubInfo(item.pDelegator_openid,connection)
                r1.status == 200 ? tSeekerInfo = r1.data[0] : {}
                r2.status == 200 ? pSeekerInfo = r2.data[0] : {}
                r3.status == 200 ? pDelegatorInfo = r3.data[0] : {}
                tmpPush = {
                    receivedSInfo: pSeekerInfo,
                    receivedDInfo: pDelegatorInfo,
                    toSeekerInfo: tSeekerInfo
                }
            } else if(role == 'seeker') {
                var seekerInfo = {}
                var delegatorInfo = {}
                var seeker_openid = ''
                var delegator_openid = ''
                var myDelegator_openid = ''
                if(item.role == 'pSeeker') {
                    seeker_openid = item.tSeeker_openid
                    delegator_openid = item.tDelegator_openid
                    myDelegator_openid = item.pDelegator_openid
                } else if(item.role == 'tSeeker') {
                    seeker_openid = item.pSeeker_openid
                    delegator_openid = item.pDelegator_openid
                    myDelegator_openid = item.tDelegator_openid
                } else {
                    console.log('please indicate seeker role type(pSeeker/tSeeker)')
                    continue
                }
                r1 = await getSeekerPubInfo(seeker_openid,connection)
                r2 = await getDelegatorPubInfo(delegator_openid,connection)
                seekerInfo = (r1.status == 200 ? r1.data[0] : {})
                delegatorInfo = (r2.status == 200 ? r2.data[0] : {})
                //seekerInfo.role = (item.role == 'pSeeker' ? 'tSeeker' : 'pSeeker')
                //delegatorInfo.role = (item.role == 'pSeeker' ? 'tDelegator' : 'pDelegator')
                tmpPush = {
                    receivedSInfo: seekerInfo,
                    receivedDInfo: delegatorInfo,
                    seeker_openid: open_id,
                    delegator_openid: myDelegator_openid,
                    state: item.status,
                    role: item.role
                }
            }
    
            resArry.push(tmpPush)
        } 
    } else {
        console.log('get received push data failed!' + data.msg)
    }
    return resArry
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
            var result = await getSeekerInfo_r(queryStr,connection)
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
            var result = await getSeekerInfo_r(queryStr,connection)
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
            var result = await getSeekerInfo_r(queryStr,connection)
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

function getD2DInfo(ctx, connection) {
    return new Promise(function (resolve, reject) {
        var data = urlParser.parse(ctx.originalUrl,true).query
        console.log("=========data:"+JSON.stringify(data))
        var queryStr = "select * from D2DPush where tDelegator_openid='" + data.delegator_openid + "'"
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

function getSeekerInfo_r(ctx, connection) {
    return new Promise(function (resolve, reject) {
        var data = urlParser.parse(ctx.originalUrl,true).query

        var openId = data.open_id
        var queryStr = "select * from SeekerInfo where open_id='" + openId + "'"

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

function getSeekerInfo_r(queryStr, connection) {
    return new Promise(function (resolve, reject) {

        queryFromDB(resolve, reject, queryStr, connection)
    })
}

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
    getDelegatorInfo: getDelegatorInfo,
    getDTaskInfo: getDTaskInfo,
    getMessageList: getMessageList,
    getMySeeker: getMySeeker,
    getDReceivedPush: getDReceivedPush,
    getSReceivedPush: getSReceivedPush
}
