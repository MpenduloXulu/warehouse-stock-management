# Netlify Functions

This directory contains serverless functions that run on Netlify.

## Available Functions

### 1. Health Check (`/api/health`)
- **Method:** GET
- **Description:** Checks if the Netlify functions are working
- **Response:** Status and timestamp

### 2. Items (`/api/items`)
- **Methods:** GET, POST
- **GET:** Retrieve all items with optional query parameters
- **POST:** Create a new item
- **Example:**
  ```bash
  curl -X GET https://your-site.netlify.app/.netlify/functions/items
  curl -X POST https://your-site.netlify.app/.netlify/functions/items \
    -H "Content-Type: application/json" \
    -d '{"name": "Item 1", "quantity": 10}'
  ```

### 3. Tasks (`/api/tasks`)
- **Methods:** GET, POST, PUT
- **GET:** Retrieve all tasks
- **POST:** Create a new task
- **PUT:** Update an existing task
- **Example:**
  ```bash
  curl -X GET https://your-site.netlify.app/.netlify/functions/tasks
  ```

### 4. Reports (`/api/reports`)
- **Method:** GET
- **Description:** Get analytics and reports data
- **Response:** Statistics about items, tasks, and stock levels
- **Example:**
  ```bash
  curl -X GET https://your-site.netlify.app/.netlify/functions/reports
  ```

## Deployment

These functions will be automatically deployed when you push to your repository connected to Netlify.

### Local Testing

To test functions locally:
```bash
npm run dev
```

Then access the functions at:
- `http://localhost:3000/.netlify/functions/health`
- `http://localhost:3000/.netlify/functions/items`
- `http://localhost:3000/.netlify/functions/tasks`
- `http://localhost:3000/.netlify/functions/reports`

## Adding New Functions

To add a new function, create a new TypeScript file in this directory:

```typescript
import type { Handler } from '@netlify/functions';

const handler: Handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello from Netlify!' }),
  };
};

export { handler };
```

The function will be automatically available at `/.netlify/functions/your-function-name`.

## Error Handling

All functions include basic error handling with try-catch blocks and return appropriate HTTP status codes.

## Environment Variables

To use environment variables in your functions, add them to your Netlify site settings and access them via `process.env`:

```typescript
const apiKey = process.env.API_KEY;
```
