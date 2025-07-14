const axios = require('axios');

// Basic wrapper for Zoom API requests
async function getUser(userId, token) {
  const url = `https://api.zoom.us/v2/users/${userId}`;
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
}

module.exports = { getUser };
