#!/bin/bash

function error_exit {
    echo "Killing"
    #kill -TERM -- -$$
    #kill $(ps -s $$ -o pid=)
    pkill -P $$
    exit 1
}

trap 'error_exit' EXIT
trap 'error_exit' ERR

FOREVER="forever --spinSleepTime=5000 --minUptime=1000"

$FOREVER -a -o 'log.txt' ./server.js &
$FOREVER $(realpath $(which lt)) --port 6342 -s blynkmap
