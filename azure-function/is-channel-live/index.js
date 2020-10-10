const TwitchTasks = require('../tasks/TwitchTasks');

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