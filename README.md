# twitch-twitter-integration
Combining Twitch and Twitter APIs to automate various tasks

## Requirements
* [Node v12 (or later)](https://nodejs.org/en/download/)
* [Azure Function Core Tools v3 (or later)](https://www.npmjs.com/package/azure-functions-core-tools)
* [Twitch Developer Application](https://dev.twitch.tv/console/apps)

## Folder/File Organization
* `azure`: Bash scripts used to setup and configure the Azure resources
* `azure-devops`: Continuous integration and delivery pipelines for Azure DevOps
* `azure-function`: Perform the actions with simple endpoints
* `azure-function/api`: Classes that manage APIs to external endpoints
* `azure-function/tasks`: Classes that combine APIs to perform custom actions

## How To Run - Local
1. Install dependencies with `npm install` from the `azure-function` folder
1. Rename the file `example.local.settings.json` in `azure-function` to `local.settings.json`, and set values with personal credentials
1. Run a local instance of the Azure Function with `npm start` from the `package.json` in `azure-function`
1. Make calls to http://localhost:7071/api/IsChannelLive with optional query parameter `name`. Ex http://localhost:7071/api/IsChannelLive?name=Channel

## How To Run - Azure
1. Create Azure resources using the scripts from `azure`. TODO - Implement master script to run in order
1. Configure the Azure Function with the `setAppSettings.sh` and `setGeneralSettings.sh` scripts in `azure/function`
1. Deploy - TODO
1. Make calls to {endpoint} - TODO