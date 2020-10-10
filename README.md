# twitch-twitter-integration

Combining Twitch and Twitter APIs to automate various tasks with Azure Functions

## Requirements

- [Node v12 (or later)](https://nodejs.org/en/download/)
- [Azure Function Core Tools v3 (or later)](https://www.npmjs.com/package/azure-functions-core-tools)
- [Twitch Developer Application](https://dev.twitch.tv/console/apps)
- [Twitter Developer Application] (https://developer.twitter.com/en/portal/dashboard)

## Build Status

[![Build Status](https://dev.azure.com/CamSpencer816/Twitch%20Twitter%20Integration/_apis/build/status/Build%20and%20Deploy%20Twitch%20Twitter%20Function?branchName=master)](https://dev.azure.com/CamSpencer816/Twitch%20Twitter%20Integration/_build/latest?definitionId=1&branchName=master)

## Folder/File Organization

- `azure`: Bash scripts used to setup and configure the Azure resources
- `azure-devops`: Continuous integration and delivery pipelines for Azure DevOps
- `azure-function`: Perform custom actions with simple endpoints
- `azure-function/api`: Classes that manage APIs to external endpoints
- `azure-function/is-channel-live`: GET - Determine if a given Twitch channel is live
- `azure-function/tasks`: Classes that combine APIs to perform custom actions
- `azure-function/tweet-if-channel-is-live`: GET - Send out a Tweet if a given Twitch channel is streaming
- `azure-function/tweet-if-fresh-stream-started`: CRON - Send out a Tweet if a given Twitch channel is streaming since the last function run

## How To Run - Local

1. Install dependencies with `npm install` from the `azure-function` folder
1. Rename the file `example.local.settings.json` in `azure-function` to `local.settings.json`, and set values with personal credentials
1. Run a local instance of the Azure Function with `npm start` from the `package.json` in `azure-function`
1. Make `GET` requests to http://localhost:7071/api/is-channel-live with optional query parameter `name`. Ex http://localhost:7071/api/is-channel-live?name=ChannelName

## How To Run - Azure

Make `GET` requests to https://twitch-twitter-central-us-func.azurewebsites.net/api/is-channel-live with the query parameter `name`. Ex https://twitch-twitter-central-us-func.azurewebsites.net/api/is-channel-live?name=ChannelName

## Creating Azure Resources

1. [Create an Azure account](https://azure.microsoft.com/en-ca/free/)
1. Create a `Resource Group`. Ex `twitch-twitter-integration-rg`
1. Create a new `Function`. Ex `twitch-twitter-integration-func`
   1. Select `Linux` and `East US` (At time of writting, `Canada Central` does not have `Consumption Linux` available)
   1. Create a new `Storage Account`. Ex `twitchtwitterintsa` - _NOTE_ `Storage Account` resources have stricter naming rules
   1. _Optional_ Create a new `App Insights`. Ex. `twitch-twitter-integration-ai`
1. Configure additional `Application Settings`
   1. `TWITCH_API_CLIENT_ID` - Your cliend ID for your registered Twitch app
   1. `TWITCH_API_CLIENT_SECRET` - Your client secret for your registered Twitch app
   1. `TWITCH_CHANNEL` - A default channel to use when nothing is passed to the function's `name` query parameter
   1. `TWITTER_CONSUMER_KEY` - Your Twitter API Key
   1. `TWITTER_CONSUMER_SECRET` - Your Twitter API Secret Key
   1. `TWITTER_ACCESS_TOKEN_KEY` - Your Twitter Access Token (Read + Write)
   1. `TWITTER_ACCESS_TOKEN_SECRET` - Your Twitter Access Token Secret (Read + Write)

## How To Deploy - Local

1. Make sure all of your Azure resources are created and configured. See `Creating Azure Resources`.
1. Install dependencies with `npm install` from the `azure-function` folder
1. Right click the `azure-functions` folder and select `Deploy To Function App`. _Requires Visual Studio Code Azure Function Extension_
