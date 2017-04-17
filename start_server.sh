#!/bin/bash

forever -a -o 'log.txt' --spinSleepTime=5000 --minUptime=1000 start server.js &
