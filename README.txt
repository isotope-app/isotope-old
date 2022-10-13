Usage Guide:
=============

1. Install ipfs at https://ipfs.io

2. Then, change the CORS config of ipfs:
    # For development purposes we will allow every domain, but when the server is public, make sure to only allow the domain which this website is running on
    ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "GET", "POST", "OPTIONS"]'
    ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'

3. Finally, install the project dependencies and start it:
    yarn
    yarn dev
