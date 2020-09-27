# Exit early upon errors
set -Ee

LOCATION="canadacentral"
NAME="twitch-twitter-integration-ai"
PROPERTIES="{\"Application_Type\":\"web\"}"
RESOURCE_GROUP="twitch-twitter-integration-rg"
RESOURCE_TYPE="Microsoft.Insights/components"

echo "Creating the App Insights [${NAME}] in [${RESOURCE_GROUP}]..."

az resource create \
    --location "${LOCATION}" \
    --name "${NAME}" \
    --properties "${PROPERTIES}" \
    --resource-group "${RESOURCE_GROUP}" \
    --resource-type "${RESOURCE_TYPE}"
