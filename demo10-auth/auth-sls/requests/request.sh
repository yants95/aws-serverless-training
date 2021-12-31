HOST=http://0.0.0.0:3000

TOKEN=$(curl -X POST \
    --silent \
    -H 'Content-Type: application/json' \
    --data '{ "username": "yansoares", "password": "1234" }' \
    $HOST/dev/login \
    | tee token.log
)

echo "Token: $TOKEN"

curl --silent $HOST/dev/public | xargs echo "Public API: $1"

curl \
    --silent \
    -H "Authorization:$TOKEN" \
    $HOST/dev/private \
     | xargs echo "Private API: $1"