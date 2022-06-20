# fullstack-app-template backend

## system requirements:

- nodejs
- npm

## enviromental variables:

Create a .env file in the root folder, with the following variables:

- PORT={port}
- APP_URL={frontend url}
- JWT_SECRET={secret}
- CONNECTION_STRING={connection string}

- LOGFLARE_SOURCE_ID={source id}
- LOGFLARE_API_KEY={api key}

- GOOGLE_CLIENT_ID={client id}
- GOOGLE_CLIENT_SECRET={client secret}'
- GOOGLE_REDIRECT_URI={redirect uri (probably ending in /callback or something similar)}
- GOOGLE_TOKEN_ENDPOINT=https://oauth2.googleapis.com/token
- GOOGLE_USER_ENDPOINT=null
- GOOGLE_USER_ID=null
- SCOPE=openid

- GIT_CLIENT_ID={client id}
- GIT_CLIENT_SECRET={client secret}
- GIT_REDIRECT_URI={redirect uri}
- GIT_TOKEN_ENDPOINT=https://github.com/login/oauth/access_token
- GIT_USER_ENDPOINT='https://api.github.com/user'
- GIT_USER_ID=id
- GIT_SCOPE=user

## dev start:

- npm i
- npm start
