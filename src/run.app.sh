#!/bin/bash

# Run the first command in a new terminal window
osascript -e 'tell app "Terminal" to do script "docker-compose -f ./projects/TradeFlow_API/docker-compose.yml up --remove-orphans"'

# Run the second command
nest start --debug --watch &

# Wait for a few seconds
sleep 10

# Open URLs in default browser
open "http://localhost:3030/api/v1/"
open "http://localhost:8081"
