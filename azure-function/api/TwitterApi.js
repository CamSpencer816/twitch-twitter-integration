const Twitter = require('twitter-lite')

/**
 * Make assorted calls to Twitter Apis
 */
class TwitterApi {

    constructor(consumerKey, consumerSecret, accessTokenKey, accessTokenSecret) {
        this._consumerKey = consumerKey;
        this._consumerSecret = consumerSecret;
        this._accessTokenKey = accessTokenKey;
        this._accessTokenSecret = accessTokenSecret;
    }

    /**
     * Update your Twitter status
     * @param {string} statusToPost The status to post
     */
    async sendTweet(statusToPost) {
        const client = new Twitter({
            subdomain: "api",
            version: "1.1",
            consumer_key: this._consumerKey,
            consumer_secret: this._consumerSecret,
            access_token_key: this._accessTokenKey,
            access_token_secret: this._accessTokenSecret
        });

        return new Promise(resolve => {
            client
                .post("statuses/update", {
                    status: statusToPost
                }).then(function (res) {
                    resolve(res.id);
                }).catch(function (err) {
                    console.error(`Error [${JSON.stringify(err)}]`);
                })
        })
    }
}

module.exports = TwitterApi;