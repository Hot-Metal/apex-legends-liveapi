#!/bin/bash

protoc -I=. --csharp_out=../csharp/HotMetal.ApexLegendsLiveApi -I=../ ../events.proto --csharp_opt=base_namespace=HotMetal.ApexLegendsLiveApi
