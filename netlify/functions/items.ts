import type { Handler } from '@netlify/functions';

const handler: Handler = async (event, context) => {
  try {
    const method = event.httpMethod;
    const path = event.path;

    // Parse query parameters
    const queryParams = event.queryStringParameters || {};

    switch (method) {
      case 'GET':
        return {
          statusCode: 200,
          body: JSON.stringify({
            message: 'Items endpoint',
            method: 'GET',
            query: queryParams,
          }),
        };

      case 'POST':
        const body = event.body ? JSON.parse(event.body) : {};
        return {
          statusCode: 201,
          body: JSON.stringify({
            message: 'Item created',
            data: body,
          }),
        };

      default:
        return {
          statusCode: 405,
          body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }
  } catch (error) {
    console.error('Error in items endpoint:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};

export { handler };
