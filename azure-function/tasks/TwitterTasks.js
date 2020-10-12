const TwitterApi = require('../api/TwitterApi');

/**
 * Perform actions related to Twitter
 */
class TwitterTasks {

    constructor(consumerKey, consumerSecret, accessTokenKey, accessTokenSecret) {
        this._twitterApi = new TwitterApi(consumerKey, consumerSecret, accessTokenKey, accessTokenSecret);
    }

    /**
     * Update your status on Twitter. NOTE: Twitter API will automatically block duplicate posts
     * @param {string} status The status to post
     */
    async updateStatus(status) {
        console.log(`Updating Twitter status...`);

        const response = await this._twitterApi.sendTweet(status);

        if (response !== undefined) {
            console.log(`Successfully updated Twitter status!`);
            return true;
        }
        console.log(`Failed to update Twitter status!`);
        return false;
    }
}

module.exports = TwitterTasks;


