# Exit early upon errors
set -Ee

KIND="StorageV2"
LOCATION="eastus"
NAME="twitchtwitterintsa"
RESOURCE_GROUP="twitch-twitter-integration-rg"
SHARED_ENVIRONMENT="devtest"
SKU="Standard_LRS"

echo "Checking the name availability for Storage Account [${NAME}] in [${LOCATION}]..."

# The creation command will fail if the resource already exists, so check for availability
IS_STORAGE_ACCOUNT_NAME_AVAILABLE=$(az storage account check-name \
    --name ${NAME} \
    --query nameAvailable)

if [[ "${IS_STORAGE_ACCOUNT_NAME_AVAILABLE}" == "false" ]]; then
    echo "The Storage Account [${NAME}] already exists in [${LOCATION}]. Skipping creation."
else
    echo "Creating the Storage Account [${NAME}] in [${RESOURCE_GROUP}]..."

    az storage account create \
        --kind "${KIND}" \
        --location "${LOCATION}" \
        --name "${NAME}" \
        --resource-group "${RESOURCE_GROUP}" \
        --sku "${SKU}"
fi
