# Quick Start Guide - Mentor Connect

## Prerequisites
- Node.js (v14+) installed
- MongoDB running locally or MongoDB Atlas account
- npm or yarn package manager

## Step 1: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (copy from .env.example if available)
# Add your MongoDB connection string and JWT secret

# Start the backend server
npm run dev
```

Backend will run on `http://localhost:5000`

## Step 2: Frontend Setup

Open a new terminal:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

Frontend will run on `http://localhost:3000`

## Step 3: Create Your First Account

1. Open `http://localhost:3000` in your browser
2. Click "Register"
3. Choose your role (Mentor or Mentee)
4. Fill in your details and create an account

## Step 4: Complete Your Profile

1. After registration, go to "Profile"
2. Add your skills, industry, experience, etc.
3. For mentors: Set your pricing and availability

## Step 5: Start Using the Platform

### As a Mentee:
- Browse mentors or get AI-powered suggestions
- View mentor profiles and ratings
- Book a session with a mentor
- Join video calls and chat
- Rate sessions after completion

### As a Mentor:
- Complete your profile with expertise
- Accept booking requests
- Conduct video mentoring sessions
- Receive ratings and feedback

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod` or check MongoDB Atlas connection
- Verify your connection string in `.env` file

### Port Already in Use
- Change PORT in backend `.env` file
- Update frontend proxy in `vite.config.js` if needed

### Video Call Not Working
- Ensure you allow camera/microphone permissions
- Check browser console for WebRTC errors
- Try a different browser (Chrome/Firefox recommended)

## Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mentorconnect
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

## Testing the Platform

1. Create two accounts: one mentor, one mentee
2. As mentee, browse and book a session with the mentor
3. As mentor, confirm the booking
4. Join the meeting room to test video calls
5. Complete the session and rate it

## Next Steps

- Integrate Calendly for advanced scheduling
- Add payment processing
- Set up email notifications
- Deploy to production

For detailed documentation, see README.md


