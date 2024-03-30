# Apex Events TS
This project is meant to be a quick shell project that allows us to version the TypeScript events that are used in the Hot Metal client.

## Prerequisites

Node 20
- Run `npm install`

## Creating the Events File
Within this project is the `events.proto` file, which is the Apex Legends game events. Running the following command on Windows will create an `events.ts` file using the [`ts-proto`](https://github.com/stephenh/ts-proto) package:
```
protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto.cmd --ts_proto_out=. ./events.proto
```
