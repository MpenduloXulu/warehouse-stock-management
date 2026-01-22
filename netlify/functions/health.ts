import type { Handler } from '@netlify/functions';

const handler: Handler = async (event, context) => {
  try {
    // Get the request path
    const path = event.path;
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Netlify Function is working!',
        path: path,
        timestamp: new Date().toISOString(),
      }),
    };
  } catch (error) {
    console.error('Error in health check:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};

export { handler };
