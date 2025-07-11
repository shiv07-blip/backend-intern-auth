# Backend Intern Assignment

A secure Node.js/Express backend authentication system with JWT token-based authentication, MongoDB database integration, and protected API endpoints.

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v17 or higher)
- **npm** (Node Package Manager)
- **MongoDB** (local installation or MongoDB Atlas account)

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd backend-intern-auth
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the `src/` directory with the following variables:

```env
MONGODB_URI=mongodb://localhost:27017/auth-system
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=development
```

**Important Notes:**
- Replace `your-super-secret-jwt-key-here` with a strong, unique secret key
- For production, use a MongoDB Atlas connection string
- Set `NODE_ENV=production` for production deployment

### 4. Database Setup

Ensure MongoDB is running on your system:

```bash
# Start MongoDB (Linux/Mac)
sudo systemctl start mongod

# Or for macOS with Homebrew
brew services start mongodb-community
```

### 5. Start the Application

**Setup the dummy data and register dummy user**
```bash
npm run setup
```

**Development Mode (with auto-reload):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

The server will start on `http://localhost:3001`

## APIs Documentation

### Base URL
```
http://localhost:3001
```

### Authentication Endpoints

#### 1. User Registration
**Endpoint:** `POST /api/auth/register`

**Description:** Register a new user account and set the access token in cookie

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (Success - 201):**
```json
{
  "message": "User created successfully",
}
```

**Response (Error - 400):**
```json
{
  "message": "All fields are required"
}
```
or
```json
{
  "message": "User already exists"
}
```

**Protection Level:** Public (No authentication required)

---

#### 2. User Login
**Endpoint:** `POST /api/auth/login`

**Description:** Authenticate existing user and set access token in cookie

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (Success - 200):**
```json
{
  "message": "Login successful"
}
```

**Response (Error - 400):**
```json
{
  "message": "User not found"
}
```
or
```json
{
  "message": "Invalid password"
}
```

**Protection Level:** Public (No authentication required)

---

### Protected Endpoints

#### 3. Get All Posts
**Endpoint:** `GET /api/posts`

**Description:** Retrieve all posts from the database

**Headers Required:**
```
Cookie: token=<jwt-token>
```

**Response (Success - 200):**
```json
{
  "posts": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "post_id": "post_001",
      "title": "Sample Post",
      "contentSnippet": "This is a sample post content...",
      "createdAt": "2023-09-06T10:30:00.000Z",
      "updatedAt": "2023-09-06T10:30:00.000Z"
    }
  ]
}
```

**Response (Error - 401):**
```json
{
  "message": "Unauthorized"
}
```

**Response (Error - 500):**
```json
{
  "message": "Server Error: Unable to fetch posts"
}
```

**Protection Level:** Protected (Requires valid JWT token)

---

### Health Check Endpoint

#### 4. Server Health Check
**Endpoint:** `GET /`

**Description:** Basic server health check

**Response (Success - 200):**
```
Hello World
```

**Protection Level:** Public (No authentication required)

---

## Authentication & Security

### JWT Token Management

- **Token Expiration**: 1 hour (3600 seconds)
- **Token Storage**: HTTP-only cookies for enhanced security
- **Cookie Settings**:
  - `httpOnly: true` - Prevents XSS attacks
  - `sameSite: 'strict'` - CSRF protection
  - `maxAge: 3600000` - 1 hour expiration

### Password Security

- **Hashing Algorithm**: BCrypt with salt rounds of 10
- **Password Comparison**: Secure comparison using BCrypt
- **No Plain Text Storage**: Passwords are never stored in plain text

### Middleware Protection

The `authenticateToken` middleware:
1. Extracts JWT token from cookies
2. Verifies token signature and expiration
3. Validates user existence in database
4. Attaches user object to request for downstream handlers

## Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Post Model
```javascript
{
  post_id: String (required, unique),
  title: String (required),
  contentSnippet: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

## Project Structure

```
backend-intern-auth/
├── src/
│   ├── controllers/
│   │   ├── authController.js      # Authentication logic
│   │   └── postsController.js     # Posts logic (empty)
│   ├── db/
│   │   └── dbConnect.js          # MongoDB connection
│   ├── hashingFunctions/
│   │   └── hash.js               # Password hashing utilities
│   ├── middleware/
│   │   └── authenticateToken.js   # JWT authentication middleware
│   ├── models/
│   │   ├── UserModel.js          # User schema
│   │   └── PostsModel.js         # Post schema
│   ├── routers/
│   │   ├── authRouter.js         # Authentication routes
│   │   └── postsRouter.js        # Protected posts routes
│   ├── .env                      # Environment variables
│   └── server.js                 # Main server file
├── package.json
├── package-lock.json
└── README.md
```

## Error Handling

The application includes comprehensive error handling:

- **400 Bad Request**: Invalid input data or missing fields
- **401 Unauthorized**: Invalid or missing authentication token
- **500 Internal Server Error**: Server-side errors

## Development

### Available Scripts

- `npm run dev`: Start development server with nodemon
- `npm start`: Start production server
- `npm test`: Run tests (not implemented)

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `MONGODB_URI` | MongoDB connection string | Yes | - |
| `JWT_SECRET` | Secret key for JWT signing | Yes | - |
| `NODE_ENV` | Environment mode | No | development |

## Deployment

### Production Considerations

1. **Environment Variables**: Set production values in your deployment platform
2. **Database**: Use MongoDB Atlas or production MongoDB instance
3. **HTTPS**: Enable secure cookies in production
4. **CORS**: Configure CORS for your frontend domain
5. **Rate Limiting**: Implement rate limiting for production use

### Example Production Environment

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/auth-system
JWT_SECRET=your-production-secret-key
NODE_ENV=production
```