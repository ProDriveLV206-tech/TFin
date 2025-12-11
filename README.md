Agora — Complete Ready-to-Run Project
====================================
What's included:
- server/: Express backend with MongoDB, JWT auth, Socket.io, admin routes, TTL messages (24h)
- client/: Vite + React frontend with Login/Register, Chat, Admin panel, GameLoader, dark theme
- example games under client/src/games/

Quick start (local):
1) Backend
   cd server
   cp .env.example .env
   # edit .env to set MONGO_URI and JWT_SECRET if needed
   npm install
   npm run dev   # or npm start

2) Frontend
   cd client
   npm install
   npm run dev
   # open the Vite URL (default http://localhost:5173)

Notes:
- Messages are persisted in MongoDB and auto-delete after 24 hours using a TTL index on createdAt.
- To create an admin: register a user, then set { role: 'admin' } in the users collection, or use MongoDB Compass/Atlas to update.
