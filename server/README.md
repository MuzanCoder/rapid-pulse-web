# Rapid Pulse Web - Backend Server

A Node.js Express server with MongoDB for the Rapid Pulse Web MERN stack application.

## Features

- **JWT Authentication**: Secure user registration and login
- **User Management**: Profile creation and updates
- **Task Management**: Full CRUD operations for tasks
- **Data Validation**: Request validation with express-validator
- **Error Handling**: Comprehensive error handling middleware
- **Security**: Password hashing with bcryptjs
- **CORS Support**: Cross-origin resource sharing enabled

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Update the `.env` file with your configuration:
```env
MONGO_URI=mongodb://localhost:27017/rapid-pulse-web
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

## Running the Server

### Development Mode (with nodemon)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000` by default.

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Tasks
- `GET /api/tasks` - Get all tasks for user (protected)
- `GET /api/tasks/:id` - Get single task (protected)
- `POST /api/tasks` - Create new task (protected)
- `PUT /api/tasks/:id` - Update task (protected)
- `DELETE /api/tasks/:id` - Delete task (protected)

### Health Check
- `GET /api/health` - Server health status

## Data Models

### User
```javascript
{
  name: String (required, max 50 chars),
  email: String (required, unique, valid email),
  password: String (required, min 6 chars, hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Task
```javascript
{
  title: String (required, max 200 chars),
  completed: Boolean (default: false),
  user: ObjectId (ref: User, required),
  createdAt: Date,
  updatedAt: Date
}
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/rapid-pulse-web` |
| `JWT_SECRET` | Secret key for JWT tokens | Required |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment mode | `development` |
| `CORS_ORIGIN` | Allowed CORS origin | `*` |

## Error Handling

The server includes comprehensive error handling for:
- Validation errors
- Authentication errors
- Database errors
- General server errors

All errors return a consistent JSON format:
```json
{
  "success": false,
  "message": "Error description",
  "errors": [...] // Optional validation errors
}
```

## Security

- Passwords are hashed using bcryptjs with salt rounds of 12
- JWT tokens expire after 30 days
- Protected routes require valid JWT token in Authorization header
- Input validation and sanitization
- CORS protection

## Project Structure

```
server/
├── config/          # Configuration files
│   └── database.js  # Database connection
├── middleware/      # Custom middleware
│   ├── auth.js      # Authentication middleware
│   └── errorHandler.js  # Error handling
├── models/          # Mongoose models
│   ├── User.js      # User model
│   └── Task.js      # Task model
├── routes/          # API routes
│   ├── auth.js      # Authentication routes
│   └── tasks.js     # Task routes
├── utils/           # Utility functions
│   └── jwt.js       # JWT helpers
├── .env.example     # Environment variables example
├── server.js        # Main server file
└── package.json     # Dependencies and scripts
```