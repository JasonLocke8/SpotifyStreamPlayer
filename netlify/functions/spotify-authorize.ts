import { Handler } from '@netlify/functions';

const handler: Handler = async (event) => {
  // Solo POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const { code } = JSON.parse(event.body || '{}');

  if (!code) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Code is required' }),
    };
  }

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        redirect_uri: process.env.VITE_REDIRECT_URI || 'http://localhost:5173',
        client_id: process.env.VITE_SPOTIFY_CLIENT_ID || '',
        client_secret: process.env.SPOTIFY_CLIENT_SECRET || '',
        grant_type: 'authorization_code',
      }).toString(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: errorData }),
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        expires_in: data.expires_in,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};

export { handler };
