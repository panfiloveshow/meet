// axios lives in the API's node_modules
const axios = require('../../apps/api/node_modules/axios');

const clientId = process.env.ZOOM_CLIENT_ID;
const clientSecret = process.env.ZOOM_CLIENT_SECRET;
const redirectUri = process.env.ZOOM_REDIRECT_URI;

function getAuthUrl() {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
  });
  return `https://zoom.us/oauth/authorize?${params.toString()}`;
}

async function exchangeCodeForToken(code) {
  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirectUri,
  });
  const tokenEndpoint = 'https://zoom.us/oauth/token';
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const res = await axios.post(`${tokenEndpoint}?${params.toString()}`, null, {
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });
  return res.data;
}

module.exports = { getAuthUrl, exchangeCodeForToken };
