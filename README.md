# Mentor Connect - The Best Way to Get Mentored

A comprehensive mentoring platform that connects candidates with industry mentors for career guidance, skill development, and industry insights.

## Features

### Core Features
- **User Registration & Authentication**: Secure JWT-based authentication system
- **Mentor-Mentee Matching**: AI-driven intelligent matching algorithm based on skills, industry, and preferences
- **Automated Calendar Booking**: Automated appointment scheduling system with availability management
- **Embedded Video Calls**: WebRTC-based video conferencing directly within the platform
- **Real-Time Chat**: Socket.io-powered chat functionality during video calls
- **Rating & Feedback System**: Mentees can rate and provide feedback on mentoring sessions
- **Multilingual Support**: Support for English, Spanish, and French

### Advanced Features
- **Smart Matching Algorithm**: Calculates match scores based on industry, skills, experience, and ratings
- **Profile Management**: Comprehensive profile system for both mentors and mentees
- **Booking Management**: Full CRUD operations for appointments with status tracking
- **Real-Time Communication**: Socket.io for real-time video calls and chat

## Tech Stack

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: Database with Mongoose ODM
- **Socket.io**: Real-time communication
- **JWT**: Authentication
- **bcryptjs**: Password hashing

### Frontend
- **React.js**: UI library
- **React Router**: Client-side routing
- **Vite**: Build tool
- **Socket.io-client**: Real-time communication client
- **React i18next**: Internationalization
- **Axios**: HTTP client
- **date-fns**: Date formatting

## Project Structure

```
Mentor/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Booking.js
│   │   ├── Rating.js
│   │   └── ChatMessage.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── mentors.js
│   │   ├── matching.js
│   │   ├── bookings.js
│   │   ├── ratings.js
│   │   └── chat.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── i18n.js
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas connection string)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mentorconnect
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

4. Start the backend server:
```bash
npm run dev
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on ` `

### Environment Variables

Copy `frontend/env.example` to `frontend/.env` (Vite automatically loads this file) and update the values:

- `VITE_API_URL`: Base URL of the backend API (e.g., `https://api.example.com/api`)
- `VITE_SOCKET_URL`: Socket.io/WebRTC signaling server (defaults to the API host when omitted)
- `VITE_DEV_API_PROXY`: (Optional) Overrides the Vite dev proxy target if your backend runs on a different port

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Users
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)
- `GET /api/users/:id` - Get user by ID (protected)

### Mentors
- `GET /api/mentors` - Get all mentors with filters (protected)
- `GET /api/mentors/:id` - Get mentor by ID (protected)

### Matching
- `GET /api/matching/suggestions` - Get mentor suggestions for mentee (protected)
- `POST /api/matching/search` - Search mentors with custom criteria (protected)

### Bookings
- `POST /api/bookings` - Create a new booking (protected)
- `GET /api/bookings` - Get user's bookings (protected)
- `GET /api/bookings/:id` - Get booking by ID (protected)
- `PUT /api/bookings/:id/status` - Update booking status (protected)
- `GET /api/bookings/mentor/:mentorId/availability` - Get mentor availability (protected)

### Ratings
- `POST /api/ratings` - Create a rating (protected)
- `GET /api/ratings/mentor/:mentorId` - Get mentor ratings (protected)

### Chat
- `GET /api/chat/:roomId` - Get chat messages (protected)
- `POST /api/chat/:roomId` - Save chat message (protected)

## Usage

### For Mentees
1. Register/Login to the platform
2. Complete your profile with skills and industry preferences
3. Browse mentors or get AI-powered suggestions
4. View mentor profiles and ratings
5. Book a session with your chosen mentor
6. Join video calls and chat during sessions
7. Rate and provide feedback after sessions

### For Mentors
1. Register/Login as a mentor
2. Complete your profile with expertise, skills, and availability
3. Set your pricing and Calendly integration (optional)
4. Accept or decline booking requests
5. Conduct video mentoring sessions
6. Receive ratings and feedback from mentees

## Matching Algorithm

The AI-driven matching algorithm calculates match scores based on:
- **Industry Match** (30 points): Exact industry match
- **Skills Match** (40 points): Common skills between mentee and mentor
- **Experience Level** (20 points): Mentor's years of experience
- **Rating** (10 points): Mentor's average rating

Total score is out of 100, with mentors sorted by highest match score.

## Video Call Integration

The platform uses WebRTC for peer-to-peer video communication:
- Socket.io for signaling
- STUN servers for NAT traversal
- Real-time video and audio streaming
- Integrated chat during calls

## Multilingual Support

Currently supports:
- English (en)
- Spanish (es)
- French (fr)

Users can switch languages using the language selector in the navbar.

## Future Enhancements

- Integration with Calendly API for advanced scheduling
- Payment gateway integration
- Email notifications
- Mobile app (React Native)
- Advanced analytics dashboard
- Group mentoring sessions
- Resource sharing during sessions
- Video recording capabilities

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For issues and questions, please open an issue on the repository.

## Deployment on Vercel

1. Install the [Vercel CLI](https://vercel.com/docs/cli) and authenticate.
2. Run `vercel link` at the repository root and set `frontend` as the project root when prompted.
3. Configure the following Environment Variables in the Vercel dashboard (or via `vercel env`). The `vercel.json` file references them as secrets named `mentor-connect-api-url` and `mentor-connect-socket-url`, but you can rename them if you prefer.
   - `VITE_API_URL` – points to your hosted Express API (`https://your-domain.com/api`)
   - `VITE_SOCKET_URL` – points to the same host if Socket.IO runs alongside the API
4. Optional: set `VITE_DEV_API_PROXY` for preview deployments if your backend preview URL differs.
5. Deploy with `vercel --prod`. The build uses `vercel.json` to install and build only the frontend (`frontend/dist`).

> **Note:** The backend requires a long-lived Node.js environment (e.g., Render, Railway, Fly.io). Once deployed, update the Vercel environment variables so the frontend points to the live API and WebSocket hosts.


