const TwitchApi = require('../api/TwitchApi');

/**
 * Perform actions related to Twitch
 */
class TwitchTasks {

    constructor() {
        this._twitchApi = new TwitchApi();
    }

    /**
     * Search for a given channel and return the details for the first exact match
     * @param {string} clientId The app's client ID - https://dev.twitch.tv/console/apps
     * @param {string} clientSecret The app's client Secret - https://dev.twitch.tv/console/apps
     * @param {string} channelName The channel name to pull the details of
     * @returns {any} The JSON object for a channel with an exact (toLowerCase) name match; undefined if no match was made
     */
    async getChannelDetails(clientId, clientSecret, channelName) {
        console.log(`Getting the channel details for [${channelName}]...`);

        const accessToken = await this._twitchApi.getAccessToken(clientId, clientSecret);

        const channels = await this._twitchApi.searchChannels(channelName, accessToken, clientId);

        if (channels.length !== 0) {
            // The search query will return similarly named channels, so we need to find the exact match
            console.log(`Checking for a channel with an exact name match for [${channelName}]...`);
            for (let i = 0; i < channels.length; i++) {
                if (channels[i].display_name.toLowerCase() == channelName.toLowerCase()) {
                    console.log(`Found channel details for [${channelName}]!`);
                    return channels[i];
                }
            }
        }
        console.log(`Could not find channel details for [${channelName}].`);
        return undefined;
    }

    /**
     * Check if a given Twitch channel is live
     * @param {string} clientId The app's client ID - https://dev.twitch.tv/console/apps
     * @param {string} clientSecret The app's client Secret - https://dev.twitch.tv/console/apps
     * @param {string} channelName The channel name to check if they are live
     * @returns {boolean} True if a channel with an exact (toLowerCase) name match is live; False otherwise
     */
    async isChannelLive(clientId, clientSecret, channelName) {
        console.log(`Checking if the channel [${channelName}] is live...`);
        const channelDetails = await this.getChannelDetails(clientId, clientSecret, channelName);

        if (channelDetails !== undefined && channelDetails.is_live == true) {
            console.log(`The channel [${channelName}] is live!`);
            return true;
        } else {
            console.log(`The channel [${channelName}] is offline!`);
        }
        return false;
    }
}

module.exports = TwitchTasks;