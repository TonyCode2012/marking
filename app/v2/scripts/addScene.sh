#!/bin/bash
function insertUser()
{
    local file="$1"
    local idType=""
    local userType=""
    local lineNum=`cat $pf | wc -l`
    if [[ "$file" =~ seeker ]]; then 
        userType="客户"
        idType="seeker"
    else
        userType="红娘"
        idType="delegator"
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
        sed -i "${lineNum} a\\\t\t\t\t\t\"query\": \"openId=$openId\"," $pf
        ((lineNum++))
        sed -i "${lineNum} a\\\t\t\t\t\t\"scene\": 1037," $pf
        ((lineNum++))
        sed -i "${lineNum} a\\\t\t\t\t\t\"referrerInfo\": {" $pf
        ((lineNum++))
        sed -i "${lineNum} a\\\t\t\t\t\t\t\"appId\": \"wx8727802679966793\"," $pf
        ((lineNum++))
        sed -i "${lineNum} a\\\t\t\t\t\t\t\"extraData\": \"{\\\\\"name\\\\\":\\\\\"$openId\\\\\"}\"" $pf
        ((lineNum++))
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
