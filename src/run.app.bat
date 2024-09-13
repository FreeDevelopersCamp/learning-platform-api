@echo off

:: Run the first command in a new command prompt window
start cmd /k docker-compose -f docker-compose.yml up --remove-orphans

:: Run the second command
start ""  nest start --debug --watch

timeout /t 10

:: Open URL in default browser
start "" "http://localhost:3030/api/v1/"
start "" "http://localhost:8081"
