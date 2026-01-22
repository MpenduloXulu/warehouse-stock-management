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
            message: 'Tasks endpoint',
            method: 'GET',
            query: queryParams,
          }),
        };

      case 'POST':
        const body = event.body ? JSON.parse(event.body) : {};
        return {
          statusCode: 201,
          body: JSON.stringify({
            message: 'Task created',
            data: body,
          }),
        };

      case 'PUT':
        const updateBody = event.body ? JSON.parse(event.body) : {};
        return {
          statusCode: 200,
          body: JSON.stringify({
            message: 'Task updated',
            data: updateBody,
          }),
        };

      default:
        return {
          statusCode: 405,
          body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }
  } catch (error) {
    console.error('Error in tasks endpoint:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};

export { handler };
