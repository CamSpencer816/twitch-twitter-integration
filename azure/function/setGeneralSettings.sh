# Exit early upon errors
set -Ee

ALWAYS_ON="false"
NAME="twitch-twitter-integration-func"
RESOURCE_GROUP="twitch-twitter-integration-rg"

echo "Setting the General Settings for [${NAME}] in [${RESOURCE_GROUP}]..."

az functionapp config set \
    --always-on "${ALWAYS_ON}" \
    --name "${NAME}" \
    --resource-group "${RESOURCE_GROUP}"
