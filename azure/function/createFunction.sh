# Exit early upon errors
set -Ee

APP_INSIGHTS="twitch-twitter-integration-ai"
CONSUMPTION_PLAN_LOCATION="eastus"
FUNCTIONS_VERSION="3"
NAME="twitch-twitter-integration-func"
OS_TYPE="Linux"
RESOURCE_GROUP="twitch-twitter-integration-rg"
RUNTIME="node"
STORAGE_ACCOUNT="twitchtwitterintsa"

echo "Getting the App Insights Key for [${APP_INSIGHTS}] in [${RESOURCE_GROUP}]..."

APP_INSIGHTS_INSTRUMENTATION_KEY=$(az resource show \
    --resource-group ${RESOURCE_GROUP} \
    --name ${APP_INSIGHTS} \
    --resource-type "Microsoft.Insights/components" \
    --query properties.InstrumentationKey \
    --output tsv)

echo "Creating the Function [${NAME}] in [${RESOURCE_GROUP}]..."

az functionapp create \
    --app-insights-key "${APP_INSIGHTS_INSTRUMENTATION_KEY}" \
    --consumption-plan-location "${CONSUMPTION_PLAN_LOCATION}" \
    --functions-version "${FUNCTIONS_VERSION}" \
    --name "${NAME}" \
    --os-type ${OS_TYPE} \
    --resource-group "${RESOURCE_GROUP}" \
    --runtime "${RUNTIME}" \
    --storage-account "${STORAGE_ACCOUNT}"
