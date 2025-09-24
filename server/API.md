# API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

### POST /auth/signup
Register a new user.

**Request Body:**
```json
{
  "name": "string (required, 2-50 chars)",
  "email": "string (required, valid email)",
  "password": "string (required, min 6 chars)"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt-token",
  "user": {
    "id": "user-id",
    "name": "User Name",
    "email": "user@example.com"
  }
}
```

### POST /auth/login
Login existing user.

**Request Body:**
```json
{
  "email": "string (required, valid email)",
  "password": "string (required)"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt-token",
  "user": {
    "id": "user-id",
    "name": "User Name",
    "email": "user@example.com"
  }
}
```

### GET /auth/profile
Get user profile. **[Protected]**

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "user-id",
    "name": "User Name",
    "email": "user@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### PUT /auth/profile
Update user profile. **[Protected]**

**Request Body:**
```json
{
  "name": "string (optional, 2-50 chars)",
  "email": "string (optional, valid email)"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": {
    "id": "user-id",
    "name": "Updated Name",
    "email": "updated@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T12:00:00.000Z"
  }
}
```

## Tasks

All task routes are protected and require authentication.

### GET /tasks
Get all tasks for the authenticated user. **[Protected]**

**Response (200):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "task-id-1",
      "title": "Task Title",
      "completed": false,
      "user": "user-id",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### GET /tasks/:id
Get a single task by ID. **[Protected]**

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "task-id",
    "title": "Task Title",
    "completed": false,
    "user": "user-id",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### POST /tasks
Create a new task. **[Protected]**

**Request Body:**
```json
{
  "title": "string (required, max 200 chars)",
  "completed": "boolean (optional, default: false)"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "_id": "task-id",
    "title": "New Task",
    "completed": false,
    "user": "user-id",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### PUT /tasks/:id
Update a task. **[Protected]**

**Request Body:**
```json
{
  "title": "string (optional, max 200 chars)",
  "completed": "boolean (optional)"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "_id": "task-id",
    "title": "Updated Task",
    "completed": true,
    "user": "user-id",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T12:00:00.000Z"
  }
}
```

### DELETE /tasks/:id
Delete a task. **[Protected]**

**Response (200):**
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [...] // Optional validation errors array
}
```

Common HTTP status codes:
- `400`: Bad Request (validation errors, invalid data)
- `401`: Unauthorized (missing/invalid token)
- `404`: Not Found (resource doesn't exist)
- `500`: Internal Server Error

## Frontend Integration Example

```javascript
// Set up API base URL
const API_BASE = 'http://localhost:5000/api';

// Helper function for authenticated requests
const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers
    },
    ...options
  };
  
  const response = await fetch(`${API_BASE}${endpoint}`, config);
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }
  
  return data;
};

// Usage examples:
// Register user
const registerUser = async (userData) => {
  return await apiRequest('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(userData)
  });
};

// Login user
const loginUser = async (credentials) => {
  const response = await apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  });
  
  // Store token for future requests
  localStorage.setItem('token', response.token);
  return response;
};

// Get tasks
const getTasks = async () => {
  return await apiRequest('/tasks');
};

// Create task
const createTask = async (taskData) => {
  return await apiRequest('/tasks', {
    method: 'POST',
    body: JSON.stringify(taskData)
  });
};
```