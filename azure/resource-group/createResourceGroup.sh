# Exit early upon errors
set -Ee

LOCATION="canadacentral"
NAME="twitch-twitter-integration-rg"

echo "Creating the Resource Group [${NAME}]..."

az group create \
    --location "${LOCATION}" \
    --name "${NAME}"
