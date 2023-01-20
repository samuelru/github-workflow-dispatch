printf "Loading secrets... \\n"

APIKEY = "$(cat /run/secrets/GITHUB_WORKFLOW_DISPATCH_APIKEY)"

printf "Start application... \\n"

yarn start $APIKEY
