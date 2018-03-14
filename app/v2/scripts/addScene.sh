#!/bin/bash
function insertUser()
{
    local file="$1"
    local idType=""
    local userType=""
    local role=""
    local lineNum=`cat $pf | wc -l`
    if [[ "$file" =~ seeker ]]; then 
        userType="客户"
        idType="index"
        role="seeker"
    else
        userType="红娘"
        idType="index"
        role="delegator"
    fi
    lineNum=$((lineNum-4))
    for openId in `cat $file`; do
        sed -i "${lineNum}s/}/},/" $pf
        sed -i "${lineNum} a\\\t\t\t\t{" $pf
        ((lineNum++))
        sed -i "${lineNum} a\\\t\t\t\t\t\"id\": $id," $pf
        ((lineNum++))
        sed -i "${lineNum} a\\\t\t\t\t\t\"name\": \"${userType}${openId}\"," $pf
        ((lineNum++))
        sed -i "${lineNum} a\\\t\t\t\t\t\"pathName\": \"pages\/$idType\/$idType\"," $pf
        ((lineNum++))
        sed -i "${lineNum} a\\\t\t\t\t\t\"query\": \"openId=$openId&role=$role\"," $pf
        ((lineNum++))
        sed -i "${lineNum} a\\\t\t\t\t\t\"scene\": 1044," $pf
        ((lineNum++))
        sed -i "${lineNum} a\\\t\t\t\t\t\"shareInfo\": {" $pf
        ((lineNum++))
        sed -i "${lineNum} a\\\t\t\t\t\t\t\"groupName\": \"测试模拟群0\"," $pf
        ((lineNum++))
        sed -i "${lineNum} a\\\t\t\t\t\t\t\"shareName\": \"okSKrJHju7CriIhADtobc-1BRhHpqYwim8D_DgkmC-E@cr4dev\"" $pf
        ((lineNum++))
        sed -i "${lineNum} a\\\t\t\t\t\t\t\"shareKey\": \"6ctu4CIRcLgiV5nPxjWYyHpr-OHy-_IuDkHamwYmG_g63vF97x35bDapbc9eOAhLIPaU875HGGGitrQrBL-jsg~~\"" $pf
        ((lineNum++))
        #sed -i "${lineNum} a\\\t\t\t\t\t\"referrerInfo\": {" $pf
        #((lineNum++))
        #sed -i "${lineNum} a\\\t\t\t\t\t\t\"appId\": \"wx8727802679966793\"," $pf
        #((lineNum++))
        #sed -i "${lineNum} a\\\t\t\t\t\t\t\"extraData\": \"{\\\\\"name\\\\\":\\\\\"$openId\\\\\"}\"" $pf
        #((lineNum++))
        sed -i "${lineNum} a\\\t\t\t\t\t}" $pf
        ((lineNum++))
        sed -i "${lineNum} a\\\t\t\t\t}" $pf
        ((lineNum++))
    done
    ((id++))
}

########## main body ##########
basedir=`dirname $0`
basedir=`cd $basedir;pwd`
seeker="$basedir/../seeker"
delegator="$basedir/../delegator"
#pf="$basedir/../testfile"
pf="$basedir/../project.config.json"

id=1

if [ ! -e $seeker ]; then
    echo "[ERROR] no seeker file" >&2
    exit 1
fi
if [ ! -e $delegator ]; then
    echo "[ERROR] no delegator file" >&2
    exit 1
fi

insertUser "$seeker"
insertUser "$delegator"
