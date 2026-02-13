Real-time Chat App
===================

Structure:
- server/: Node + Express + Socket.io server (runs on port 5000)
- client/: React client (Create React App compatible)

How to run:
1. Server:
   cd server
   npm install
   npm start

2. Client (using Create React App):
   cd client
   npx create-react-app .   # if you haven't initialized
   # replace src/ with provided files and package.json dependencies
   npm install
   npm start

Change SOCKET_URL in client/src/App.js if your server is deployed elsewhere.
