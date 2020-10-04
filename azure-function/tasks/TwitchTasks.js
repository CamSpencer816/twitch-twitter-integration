const TwitchApi = require('../api/TwitchApi');

/**
 * Perform actions related to Twitch
 */
class TwitchTasks {

    constructor(clientId, clientSecret) {
        this._twitchApi = new TwitchApi(clientId, clientSecret);
    }

    /**
     * Search for a given channel and return the details for the first exact match
     * @param {string} channelName The channel name to pull the details of
     * @returns {any} The JSON object for a channel with an exact (toLowerCase) name match; undefined if no match was made
     */
    async getChannelDetails(channelName) {
        console.log(`Getting the channel details for [${channelName}]...`);

        const accessToken = await this._twitchApi.getAccessToken();

        const channels = await this._twitchApi.searchChannels(channelName, accessToken);

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
     * Gets the start time of a channel's steam
     * @param {string} channelName The channel name to check if they are live
     * @returns {string} The start time as UTC if the channel is live or an empty string if the channel is offline;
     * Undefined if no channel details were returned
     */
    async getStreamStartTime(channelName) {
        console.log(`Getting the start time for the stream of the channel [${channelName}]...`);
        const channelDetails = await this.getChannelDetails(channelName);

        console.log(`Getting the stream start time for the channel ${channelName}...`);
        if (channelDetails !== undefined) {
            return channelDetails.started_at;
        }
        return undefined;
    }

    /**
     * Get the title of the current or previous stream for a channel
     * @param {string} channelName The channel name to check if they are live
     * @returns {string} The title of the current stream, or the last stream the channel had;
     * Undefined if no channel details were returned
     */
    async getStreamTitle(channelName) {
        console.log(`Getting the stream title for the channel [${channelName}]...`);
        const channelDetails = await this.getChannelDetails(channelName);

        console.log(`Getting the stream title for the channel ${channelName}...`);
        if (channelDetails !== undefined) {
            return channelDetails.title;
        }
        return undefined;
    }

    /**
     * Check if a given Twitch channel is live
     * @param {string} channelName The channel name to check if they are live
     * @returns {boolean} True if a channel with an exact (toLowerCase) name match is live; False otherwise
     */
    async isChannelLive(channelName) {
        console.log(`Checking if the channel [${channelName}] is live...`);
        const channelDetails = await this.getChannelDetails(channelName);

        if (channelDetails !== undefined && channelDetails.is_live == true) {
            console.log(`The channel [${channelName}] is live!`);
            return true;
        } else {
            console.log(`The channel [${channelName}] is offline!`);
        }
        return false;
    }

    /**
     * 
     * @param {string} channelName The channel name to check if they are live
     * @param {number} thresholdInMilliseconds The time (in milliseconds) that the stream must
     *  have started within to be considered "fresh"
     * @returns {boolean} True if the stream start time is within the threshold; False otherwise
     */
    async isStreamFresh(channelName, thresholdInMilliseconds) {
        console.log(`Checking if the stream for the channel [${channelName}] started within [${thresholdInMilliseconds}] milliseconds...`);
        const streamStartTimeAsString = await this.getStreamStartTime(channelName);

        if (streamStartTimeAsString !== undefined) {
            const streamStartTimeAsEpoch = Date.parse(streamStartTimeAsString);
            const currentTimeAsEpoch = Date.now();
            const millisecondsSinceStreamStart = currentTimeAsEpoch - streamStartTimeAsEpoch;

            if (millisecondsSinceStreamStart <= thresholdInMilliseconds) {
                console.log(`The steam for the channel [${channelName}] is fresh!`);
                return true;
            }
        }
        console.log(`The steam for the channel [${channelName}] is stale!`);
        return false;
    }
}

module.exports = TwitchTasks;