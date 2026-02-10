# Authentication System Documentation

## Overview
This application implements a complete role-based authentication system with JWT tokens, supporting both **normal users** and **admin users**.

## Features

### ✅ User Authentication
- **Signup**: Normal users can create accounts via `/signup`
- **Login**: Both users and admins login via `/login`
- **JWT Tokens**: Secure authentication using JSON Web Tokens
- **Password Hashing**: Passwords are hashed using bcrypt before storage
- **Session Persistence**: Tokens stored in localStorage for persistent sessions

### ✅ Role-Based Access Control (RBAC)
- **User Role**: Default role for all signups, access to public pages
- **Admin Role**: Pre-defined accounts with access to admin dashboard
- **Protected Routes**: Admin routes require both authentication and admin role
- **Conditional UI**: Admin-only buttons/links hidden from normal users

## User Flows

### Normal User Flow
1. Click "Login" button on homepage
2. If no account, click "Sign up" link
3. Fill signup form (name, email, password)
4. Auto-login after successful signup
5. Redirected to homepage
6. Can access all public pages

### Admin User Flow
1. Click "Login" button on homepage
2. Enter admin credentials
3. System detects admin role
4. Redirected to `/admin` dashboard
5. Can access admin panel with Shield icon in header
6. Can manage tools, reviews, and users

## API Endpoints

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@aitoolshub.com",
  "password": "admin123"
}

Response:
{
  "success": true,
  "user": {
    "id": "...",
    "name": "Admin User",
    "email": "admin@aitoolshub.com",
    "role": "admin"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Get Current User
```
GET /api/auth/me
Authorization: Bearer <token>

Response:
{
  "success": true,
  "user": {
    "id": "...",
    "name": "Admin User",
    "email": "admin@aitoolshub.com",
    "role": "admin"
  }
}
```

## Frontend Components

### AuthContext (`src/context/AuthContext.jsx`)
Global authentication state management using React Context API.

**Provides:**
- `user`: Current user object or null
- `loading`: Loading state during auth operations
- `login(email, password)`: Login function
- `signup(email, password, name)`: Signup function
- `logout()`: Logout function
- `isAdmin`: Boolean indicating if user is admin

### ProtectedRoute (`src/components/ProtectedRoute.jsx`)
Route wrapper component for protecting routes.

**Props:**
- `adminOnly`: Boolean, if true only admins can access
- `children`: Components to render if authorized

**Usage:**
```jsx
<Route path="/admin" element={
  <ProtectedRoute adminOnly={true}>
    <AdminLayout />
  </ProtectedRoute>
}>
```

### Header Component
- Shows "Login" button when not authenticated
- Shows user name and "Logout" button when authenticated
- Shows "Admin Panel" shield icon only for admins
- Handles role-based UI rendering

## Backend Components

### User Model (`backend/models/User.js`)
MongoDB schema for users with:
- `name`: String, required
- `email`: String, required, unique, validated
- `password`: String, required, min 6 chars, hashed
- `role`: Enum ['user', 'admin'], default 'user'
- `createdAt`: Date, auto-generated

**Methods:**
- `matchPassword(enteredPassword)`: Compare passwords

### Auth Middleware (`backend/middleware/auth.js`)
- `protect`: Verify JWT token and attach user to request
- `authorize(...roles)`: Check if user has required role

### Auth Controller (`backend/controllers/authController.js`)
- `register`: Create new user account
- `login`: Authenticate user and return token
- `getMe`: Get current user data

## Setup Instructions

### 1. Environment Variables
Create `.env` file in backend directory:
```env
MONGO_URI=mongodb://localhost:27017/ai-tools-directory
JWT_SECRET=your-secret-key-here
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 2. Frontend Configuration
Create `.env` file in root directory:
```env
VITE_BACKEND_TYPE=express
VITE_API_URL=http://localhost:5000/api
```

### 3. Create Admin User
Run the seed script to create the default admin:
```bash
cd backend
node seedAdmin.js
```

**Default Admin Credentials:**
- Email: `admin@aitoolshub.com`
- Password: `admin123`

⚠️ **IMPORTANT**: Change this password after first login!

### 4. Start the Application
```bash
# Terminal 1 - Backend
cd backend
npm install
npm start

# Terminal 2 - Frontend
npm install
npm run dev
```

## Security Features

### Password Security
- Passwords hashed with bcrypt (10 salt rounds)
- Passwords never returned in API responses
- Minimum 6 character requirement

### Token Security
- JWT tokens with 30-day expiration
- Tokens stored in localStorage
- Tokens sent via Authorization header
- Server validates tokens on protected routes

### Role-Based Security
- Admin routes protected by middleware
- Frontend routes protected by ProtectedRoute component
- UI elements conditionally rendered based on role
- Unauthorized access attempts return 403 Forbidden

## Testing the System

### Test Normal User
1. Go to `/signup`
2. Create account with any email
3. Should auto-login and redirect to home
4. Should NOT see admin panel icon
5. Trying to access `/admin` should redirect to home

### Test Admin User
1. Go to `/login`
2. Login with `admin@aitoolshub.com` / `admin123`
3. Should redirect to `/admin` dashboard
4. Should see admin panel shield icon in header
5. Can access all admin features

### Test Protected Routes
1. Logout if logged in
2. Try to access `/admin` directly
3. Should redirect to `/login`
4. After login, should redirect back to `/admin`

## Troubleshooting

### "Not authorized, no token"
- User is not logged in
- Token expired (30 days)
- Token not being sent in Authorization header

### "User role user is not authorized"
- Normal user trying to access admin route
- Check user role in database

### "Invalid email or password"
- Wrong credentials
- User doesn't exist in database

### Admin user can't login
- Run `node seedAdmin.js` to create admin
- Check MongoDB connection
- Verify MONGO_URI in .env

## Additional Notes

### Creating More Admins
To create additional admin users, you can either:

1. **Via Database**: Manually update user role in MongoDB
```javascript
db.users.updateOne(
  { email: "user@example.com" },
  { $set: { role: "admin" } }
)
```

2. **Via Seed Script**: Modify `seedAdmin.js` to create multiple admins

### Customization
- Change token expiration in `authController.js`
- Add "Remember Me" functionality
- Implement password reset flow
- Add email verification
- Add OAuth providers (Google, GitHub, etc.)

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
├─────────────────────────────────────────────────────────────┤
│  Login/Signup Pages → AuthContext → ProtectedRoute          │
│         ↓                  ↓              ↓                  │
│    API Calls         Global State    Route Guards           │
└─────────────────────────────────────────────────────────────┘
                              ↓
                    JWT Token (localStorage)
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                         Backend                              │
├─────────────────────────────────────────────────────────────┤
│  Auth Routes → Auth Controller → User Model → MongoDB       │
│       ↓              ↓                                       │
│  Middleware    Generate JWT                                 │
│  (protect,     (30 day exp)                                 │
│   authorize)                                                │
└─────────────────────────────────────────────────────────────┘
```

---

**Last Updated**: February 2026
**Version**: 1.0.0
