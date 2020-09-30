# Exit early upon errors
set -Ee

LOCATION="canadacentral"
NAME="twitch-twitter-integration-asp"
NUMBER_OF_WORKERS="1"
RESOURCE_GROUP="twitch-twitter-integration-rg"
SKU="EP1"

echo "Creating the App Service Plan [${NAME}] in [${RESOURCE_GROUP}]..."

az appservice plan create \
    --location "${LOCATION}" \
    --name "${NAME}" \
    --number-of-workers "${NUMBER_OF_WORKERS}" \
    --resource-group "${RESOURCE_GROUP}" \
    --sku "${SKU}"
