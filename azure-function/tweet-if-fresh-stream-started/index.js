const TwitchTasks = require('../tasks/TwitchTasks');

module.exports = async function (context, myTimer) {
    var timeStamp = new Date().toISOString();

    if (myTimer.isPastDue) {
        context.log('The function trigger is running late!', timeStamp);
    }

    const clientId = process.env.TWITCH_API_CLIENT_ID;
    const clientSecret = process.env.TWITCH_API_CLIENT_SECRET;
    const channelName = process.env.TWITCH_CHANNEL;

    if (channelName === undefined || channelName === "") {
        context.res = {
            status: 400,
            body: "No channel name was passed to the function. Set the [TWITCH_CHANNEL] Application Settings"
        };

        context.done();
    }

    const twitchTasks = new TwitchTasks(clientId, clientSecret);
    const isChannelLive = await twitchTasks.isChannelLive(channelName);

    if (isChannelLive) {
        // The function is scheduled to run every 5 minutes. This is defined in function.json
        const oneMinuteInMilliseconds = 60000;
        const scheduleIntervalInMilliseconds = oneMinuteInMilliseconds * 5;

        const isStreamFresh = await twitchTasks.isStreamFresh(channelName, scheduleIntervalInMilliseconds);

        if (isStreamFresh) {

            // TODO - Constructuct message and send tweet

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
    }

    context.res = {
        status: 200,
        body: "No stream detected for channel [" + channelName + "]."
    };
    context.done();
};