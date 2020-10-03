const request = require('superagent');

/**
 * Make assorted calls to Twitch APIs
 * @see https://dev.twitch.tv/docs/api/reference
 */
class TwitchApi {

    constructor() {
    }

    /**
     * Authenticate the Twitch API return the oAuth bearer token
     * 
     * @param {string} clientId The app's client ID - https://dev.twitch.tv/console/apps
     * @param {string} clientSecret The app's client Secret - https://dev.twitch.tv/console/apps
     * @returns {string} oAuth token to be used in the Authorization header for future requests
     */
    async getAccessToken(clientId, clientSecret) {
        return new Promise(resolve => {
            request
                .post('https://id.twitch.tv/oauth2/token')
                .send('client_id=' + clientId)
                .send('client_secret=' + clientSecret)
                .send('grant_type=client_credentials')
                .then(function (res) {
                    console.log('Authenticated.');
                    resolve(res.body.access_token);
                }).catch(function (err) {
                    console.error('Error [' + err.message + ']');
                    console.error(JSON.stringify(err.response));
                })
        })
    }

    /**
     * Pulls the channel details for any chanel that matches the search query
     * @param {string} channelName The name of the channel to search for.
     * @param {string} accessToken The oAuth token as recieved by the getAccessToken() method
     * @param {string} clientId The app's client ID - https://dev.twitch.tv/console/apps
     * @returns {JSON} A JSON object with all the channels that match the search query
     */
    async searchChannels(channelName, accessToken, clientId) {
        return new Promise(resolve => {
            request
                .get('https://api.twitch.tv/helix/search/channels?query=' + channelName)
                .set('Authorization', 'Bearer ' + accessToken)
                .set('client-id', clientId)
                .then(function (res) {
                    console.log('Found at least one match for the channel.');
                    resolve(res.body.data);
                }).catch(function (err) {
                    console.error('Error [' + err.message + ']');
                    console.error(JSON.stringify(err.response));
                })
        })
    }

}

module.exports = TwitchApi;