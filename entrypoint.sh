printf "Loading secrets... \\n"

APIKEY = "$(cat /run/secrets/apikey)"

printf "Start application... \\n"

yarn start $APIKEY
