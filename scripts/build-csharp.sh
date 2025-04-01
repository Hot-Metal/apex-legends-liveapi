#!/bin/bash

protoc -I=. --csharp_out=../csharp/HotMetal.ApexLegendsLiveApi events.proto
