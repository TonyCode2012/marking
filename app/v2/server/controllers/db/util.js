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

module.exports = {
    getJSONKeyVal: getJSONKeyVal
}
