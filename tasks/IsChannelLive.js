const TwitchApi = require('../api/TwitchApi');
const argv = require('yargs').argv;

/**
 * Check if a given Twitch channel is live
 */
async function isChannelLive() {

    const clientId = argv.clientId;
    const clientSecret = argv.clientSecret;
    const channelName = argv.channelName;

    //Check for the required parameters
    if (clientId === undefined) {
        console.error('A client ID was not provided.');
        throw new Error('[clientId] is undefined.');
    } else if (clientSecret === undefined) {
        console.error('A client secret was not provided.');
        throw new Error('[clientSecret] is undefined.');
    } else if (channelName === undefined) {
        console.error('A channel name was not provided.');
        throw new Error('[channelName] is undefined.');
    }

    const twitchApi = new TwitchApi();

    console.log("Authenticating oAuth credentials for Twitch...");
    const accessToken = await twitchApi.getAccessToken(clientId, clientSecret);

    console.log("Searching for channel [" + channelName + "]...");
    const channelDetails = await twitchApi.searchChannels(channelName, accessToken, clientId);

    if (channelDetails.length === 0) {
        console.log("Couldn't find any channels that matched [" + channelName + "]...");
    } else {
        // The search query will return similarly named channels, so we need to find the exact match
        console.log("Checking for a channel with an exact name match for [" + channelName + "]...");
        for (let i = 0; i < channelDetails.length; i++) {
            if (channelDetails[i].display_name.toLowerCase() == channelName.toLowerCase()) {
                console.log("Checking if the channel is live...");
                if (channelDetails[i].is_live == true) {
                    console.log("The channel is live!");
                } else {
                    console.log("The channel is offline.");
                }
            }
        }
    }
}

isChannelLive()