# AI Tools Hub Backend

Full-featured Express/Node.js backend for the AI Tools Hub directory.

## Features
- **Authentication**: JWT-based login, registration, and profile management.
- **Reviews**: RESTful API for tool reviews (CRUD), helpful marks, and tool-specific ratings.
- **Submissions**: Workflow for suggested tools (pending/approved/rejected).
- **Contact Form**: Email delivery via Nodemailer/SMTP.
- **AI Proxy**: Secure access to AI services (Hugging Face, etc.).
- **Database**: MongoDB/Mongoose models.

## Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Edit `.env` with your MongoDB URI, JWT Secret, and Email credentials.

4. Start MongoDB:
   Make sure you have MongoDB running locally or provide a connection string in `.env`.

5. Run the server:
   ```bash
   # Development mode (with nodemon)
   npm run dev

   # Production mode
   npm start
   ```

## API Endpoints

### Auth
- `POST /api/auth/register` - Create a new account
- `POST /api/auth/login` - Login and get token
- `GET /api/auth/me` - Get current user (Private)

### Reviews
- `GET /api/reviews?toolId=123` - Get reviews for a tool
- `POST /api/reviews` - Add a review
- `PUT /api/reviews/:id/helpful` - Mark review as helpful
- `DELETE /api/reviews/:id` - Delete review (Admin only)

### Submissions
- `GET /api/submissions` - Get all submissions (Admin can filter by status)
- `POST /api/submissions` - Submit a new tool
- `PUT /api/submissions/:id/status` - Approve/Reject submission (Admin only)

### Others
- `POST /api/contact` - Handle contact form
- `POST /api/ai/chat` - Proxy for AI chatbot
- `GET /health` - API status check
