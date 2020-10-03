# Exit early upon errors
set -Ee

NAME="twitch-twitter-integration-func"
RESOURCE_GROUP="twitch-twitter-integration-rg"
TWITCH_API_CLIENT_ID="TODO"
TWITCH_API_CLIENT_SECRET="TODO"
TWITCH_CHANNEL="SteadfastSc"

echo "Setting the App Settings for [${NAME}] in [${RESOURCE_GROUP}]..."

az functionapp config appsettings set \
    --name "${NAME}" \
    --resource-group ${RESOURCE_GROUP} \
    --settings \
    TWITCH_API_CLIENT_ID="${TWITCH_API_CLIENT_ID}" \
    TWITCH_API_CLIENT_SECRET="${TWITCH_API_CLIENT_SECRET}" \
    TWITCH_CHANNEL="${TWITCH_CHANNEL}"
