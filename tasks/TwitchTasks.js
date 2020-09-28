const TwitchApi = require('../api/TwitchApi');

/**
 * Perform actions related to Twitch
 */
class TwitchTasks {

    constructor() {
        this._twitchApi = new TwitchApi();
    }

    /**
     * Check if a given Twitch channel is live
     * @param {string} clientId The app's client ID - https://dev.twitch.tv/console/apps
     * @param {string} clientSecret The app's client Secret - https://dev.twitch.tv/console/apps
     * @param {string} channelName The channel name to check
     * @returns {boolean} True if a channel with an exact (toLowerCase) name match is live; False otherwise
     */
    async isChannelLive(clientId, clientSecret, channelName) {
        console.log("Authenticating oAuth credentials for Twitch...");
        const accessToken = await this._twitchApi.getAccessToken(clientId, clientSecret);

        console.log("Searching for channel [" + channelName + "]...");
        const channelDetails = await this._twitchApi.searchChannels(channelName, accessToken, clientId);

        if (channelDetails.length === 0) {
            console.log("Couldn't find any channels that matched [" + channelName + "]...");
        } else {
            // The search query will return similarly named channels, so we need to find the exact match
            console.log("Checking for a channel with an exact name match for [" + channelName + "]...");
            for (let i = 0; i < channelDetails.length; i++) {
                if (channelDetails[i].display_name.toLowerCase() == channelName.toLowerCase()) {
                    console.log("Checking if the channel is live...");
                    if (channelDetails[i].is_live == true) {
                        console.log("The channel [" + channelName + "] is live!");
                        return true;
                    } else {
                        console.log("The channel [" + channelName + "] is offline.");
                    }
                }
            }
        }
        return false;
    }
}

module.exports = TwitchTasks;