var getJSONKeyVal = function(data) {
    var data_key = ''
    var data_val = ''
    for(e in data) {
        data_key = data_key + e + ','
        if(data[e] == null || data[e] === '') data_val = data_val + "NULL,"
        else data_val = data_val + "'" + data[e] + "',"
    }
    data_key = data_key.substring(0,data_key.length-1)
    data_val = data_val.substring(0,data_val.length-1)
    data_key = "(" + data_key + ")"
    data_val = "(" + data_val + ")"
    
    return {keyStr:data_key,valStr:data_val}
}

var getConditionAll = function(data,type) {
    if(type != 'and' && type != 'or') console.log("error:Please indicate 'and' or 'or'")
    var keyArry = Object.keys(data)
    var cdStr = ""
    for(var i=0;i<keyArry.length;i++) {
        var key = keyArry[i]
        var val = data[key]
        cdStr = cdStr + key + "='" + val + "' and "
    }
    cdStr = cdStr.substring(0,cdStr.length-5)
    return cdStr
}

var getCondition = function(data,fields,type) {
    if(type != 'and' && type != 'or') console.log("error:Please indicate 'and' or 'or'")
    //var keyArry = Object.keys(data)
    var cdStr = ""
    for(var i=0;i<fields.length;i++) {
        var field = fields[i]
        var val = data[field] 
        cdStr = cdStr + key + "='" + val + "' and "
    }
    //for(var i=0;i<keyArry.length;i++) {
    //    var key = keyArry[i]
    //    var val = data[key]
    //    cdStr = cdStr + key + "='" + val + "' and "
    //}
    cdStr = cdStr.substring(0,cdStr.length-5)
    return cdStr
}

module.exports = {
    getJSONKeyVal: getJSONKeyVal,
    getConditionAll: getConditionAll,
    getCondition: getCondition
}
