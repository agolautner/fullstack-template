const config = {
    auth: {
        google: {
          client_id: process.env.GOOGLE_CLIENT_ID || '145780615357-3qqh0fjm48r5t2af090fjdpqi7dl9s40.apps.googleusercontent.com',
          client_secret: process.env.GOOGLE_CLIENT_SECRET || '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',
          redirect_uri: process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3001/callback/google',
          token_endpoint: process.env.GOOGLE_TOKEN_ENDPOINT || 'https://oauth2.googleapis.com/token',
          user_endpoint: process.env.GOOGLE_USER_ENDPOINT || null,
          user_id: process.env.GOOGLE_USER_ID || null,
        },
        oid: {
          client_id: process.env.OID_CLIENT_ID || 'mycid',
          client_secret: process.env.OID_CLIENT_SECRET || 'mycsecret',
          redirect_uri: process.env.OID_REDIRECT_URI || 'http://localhost:3001/callback/oid',
          token_endpoint: process.env.OID_TOKEN_ENDPOINT || 'http://localhost:4000/api/user/token',
          user_endpoint: process.env.OID_USER_ENDPOINT || null,
          user_id: process.env.OID_USER_ID || null,
        },
        github: {
          client_id: process.env.GIT_CLIENT_ID || 'dbd19ecd261f5e9e3bf4',
          client_secret: process.env.GIT_CLIENT_SECRET || 'e681009d13e72543eefce49482a6c34f1e270508',
          redirect_uri: process.env.GIT_REDIRECT_URI || 'http://localhost:3001/callback/github',
          token_endpoint: process.env.GIT_TOKEN_ENDPOINT || 'https://github.com/login/oauth/access_token',
          user_endpoint: process.env.GIT_USER_ENDPOINT || 'https://api.github.com/user',
          user_id: process.env.GIT_USER_ID || 'id',
        }
    }
  };

module.exports = config