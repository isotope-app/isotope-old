Usage Guide:
=============

Install jsipfs by running:
    npm install -g ipfs
    # OR
    yarn global install ipfs

Then, change the CORS config of jsipfs:
    # For development purposes we will allow every domain, but when the server is public, make sure to only allow the domain which this website is running on
    jsipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin  '[\"*\"]'
    jsipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '[\"PUT\", \"POST\", \"GET\"]'

Finally, install the project dependencies and start it:
    yarn
    yarn dev
