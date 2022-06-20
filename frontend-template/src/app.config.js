const _config = {
    dev: {
        todoapi: 'http://localhost:8080/api', 
        google_client_id: '145780615357-3qqh0fjm48r5t2af090fjdpqi7dl9s40.apps.googleusercontent.com',
        google_base_url: 'https://accounts.google.com/o/oauth2/v2/auth'
    },
    prod: {
        todoapi: process.env.REACT_APP_TODOAPI || 'http://localhost:8080/api',
        google_client_id: process.env.CLIENT_ID || '145780615357-3qqh0fjm48r5t2af090fjdpqi7dl9s40.apps.googleusercontent.com',
        google_base_url: process.env.GOOGLEBASEURL || 'https://accounts.google.com/o/oauth2/v2/auth'
    }
};

const config = process.env.NODE_ENV === 'development' ? _config.dev : _config.prod;

export default config;