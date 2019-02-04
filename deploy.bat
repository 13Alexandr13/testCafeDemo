@echo off
call npm install 
call node RunTests_Rep_xUnit  --tagNames bing_search --browser firefox
