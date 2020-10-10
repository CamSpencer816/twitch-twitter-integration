const TwitchTasks = require('../tasks/TwitchTasks');
const TwitterTasks = require('../tasks/TwitterTasks');

module.exports = async function (context, req) {

    const clientId = process.env.TWITCH_API_CLIENT_ID;
    const clientSecret = process.env.TWITCH_API_CLIENT_SECRET;
    const twitchTasks = new TwitchTasks(clientId, clientSecret);

    const channelName = (req.query.name || process.env.TWITCH_CHANNEL);
    if (channelName === undefined || channelName === "") {
        context.res = {
            status: 400,
            body: "No channel name was passed to the function. Set the [TWITCH_CHANNEL] Application Settings"
        };

        context.done();
    }

    const isChannelLive = await twitchTasks.isChannelLive(channelName);

    if (isChannelLive) {
        const consumerKey = process.env.TWITTER_CONSUMER_KEY;
        const consumerSecret = process.env.TWITTER_CONSUMER_SECRET;
        const accessTokenKey = process.env.TWITTER_ACCESS_TOKEN_KEY;
        const accessTokenSecret = process.env.TWITTER_ACCESS_TOKEN_SECRET;
        const twitterTasks = new TwitterTasks(consumerKey, consumerSecret, accessTokenKey, accessTokenSecret);

        const streamStartTime = await twitchTasks.getStreamStartTime(channelName);
        const streamStartTimeFormatted = new Date(streamStartTime).toLocaleString();
        const twitterStatus = `${channelName} started a new stream, check it out at https://www.twitch.tv/${channelName}! Stream start time: ${streamStartTimeFormatted}`

        await twitterTasks.updateStatus(twitterStatus);

        context.res = {
            status: 200,
            body: "Fresh stream detected - Sending out a tweet!"
        };
        context.done();
    } else {
        context.res = {
            status: 200,
            body: "Stale stream detected - No tweet will be sent."
        };
        context.done();
    }

    context.res = {
        status: 200,
        body: "No stream detected for channel [" + channelName + "]."
    };
    context.done();
};