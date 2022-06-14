const config = {
    auth: {
        google: {
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          redirect_uri: process.env.GOOGLE_REDIRECT_URI,
          token_endpoint: process.env.GOOGLE_TOKEN_ENDPOINT,
          user_endpoint: process.env.GOOGLE_USER_ENDPOINT,
          user_id: process.env.GOOGLE_USER_ID,
        },
        github: {
          client_id: process.env.GIT_CLIENT_ID,
          client_secret: process.env.GIT_CLIENT_SECRET,
          redirect_uri: process.env.GIT_REDIRECT_URI,
          token_endpoint: process.env.GIT_TOKEN_ENDPOINT,
          user_endpoint: process.env.GIT_USER_ENDPOINT,
          user_id: process.env.GIT_USER_ID,
        },
        /*   facebook: {
          clientId: "",
          clientSecret: "",
          redirectUri: "",
          tokenEndpoint: "",
        }, */
    }
  };

module.exports = config