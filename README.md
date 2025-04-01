# Apex Legends LiveAPI

The purpose of this repository is to serve as a central place for updates to the Apex Legends LiveAPI. This API is published with new versions of the game in the game files themselves. Most game updates, including ranked and season splits contain updates to this file.

## Prerequisites

[Protobuf Compiler](https://protobuf.dev/installation/)
Nodejs
.NET

## Obtaining the Proto File

### Steam

To obtain the protobuf file on Steam navigate to Apex in your `Steam Library` and open the context menu. Select `Properties`. 

![Screenshot of Steam Library Properties](docs/assets/steam_1.png)

Then select `Installed Files`, `Browse`.

![Screenshot of Steam Library Installed Files screen](docs/assets/steam_2.png)

This will open the Apex Legends file system, in which you will be interested in the `LiveAPI` folder.

![Image of Apex Legends File System](docs/assets/file_system_1.png)

Which contains the `events.proto` file. Copy that file into this project and run the command to create events in [Creating the Events File](#creating-the-events-file)

![Image of Protobuf file](docs/assets/file_system_2.png)