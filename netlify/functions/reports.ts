import type { Handler } from '@netlify/functions';

const handler: Handler = async (event, context) => {
  try {
    const method = event.httpMethod;
    const queryParams = event.queryStringParameters || {};

    switch (method) {
      case 'GET':
        return {
          statusCode: 200,
          body: JSON.stringify({
            message: 'Reports endpoint',
            method: 'GET',
            query: queryParams,
            data: {
              totalItems: 0,
              outOfStock: 0,
              lowStock: 0,
              completedTasks: 0,
              pendingTasks: 0,
            },
          }),
        };

      default:
        return {
          statusCode: 405,
          body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }
  } catch (error) {
    console.error('Error in reports endpoint:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};

export { handler };
