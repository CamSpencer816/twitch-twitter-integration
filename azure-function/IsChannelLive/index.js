const TwitchApi = require('../../api/TwitchApi');

module.exports = async function (context, req) {

    const clientId = process.env.TWITCH_API_CLIENT_ID
    const clientSecret = process.env.TWITCH_API_CLIENT_SECRET
    const channelName = (req.query.name || process.env.TWITCH_CHANNEL);

    if (channelName === undefined || channelName === "") {
        context.res = {
            status: 400,
            body: "No channel name was passed to the function."
        };

        context.done();
    }

    const twitchApi = new TwitchApi();

    console.log("Authenticating oAuth credentials for Twitch...");
    const accessToken = await twitchApi.getAccessToken(clientId, clientSecret);

    console.log("Searching for channel [" + channelName + "]...");
    const channelDetails = await twitchApi.searchChannels(channelName, accessToken, clientId);

    if (channelDetails.length === 0) {
        context.res = {
            status: 200,
            body: "Couldn't find any channels that matched [" + channelName + "]..."
        };
        context.done();
    } else {
        // The search query will return similarly named channels, so we need to find the exact match
        console.log("Checking for a channel with an exact name match for [" + channelName + "]...");
        for (let i = 0; i < channelDetails.length; i++) {
            if (channelDetails[i].display_name.toLowerCase() == channelName.toLowerCase()) {
                console.log("Checking if the channel is live...");
                if (channelDetails[i].is_live == true) {
                    context.res = {
                        status: 200,
                        body: "The channel [" + channelName + "] is live!"
                    };
                    context.done();
                } else {
                    context.res = {
                        status: 200,
                        body: "The channel [" + channelName + "] is offline."
                    };
                    context.done();
                }
            }
        }
        // It could be that we found close but not exact matches and looped through everything without finding our channel
        context.res = {
            status: 200,
            body: "Couldn't find any channels that matched [" + channelName + "]..."
        };
        context.done();
    }
}