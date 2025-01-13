# Real-Time Chat Application

This is a **real-time chat application** built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js) and **Socket.io** for real-time communication and also the UI using **Daisy UI**. The app allows users to send messages, upload images with seamless chatting experience.

---

## Features

- **User Authentication**: Secure login and registration.
- **Real-Time Messaging**: Instant updates for sent and received messages.
- **Image Uploads**: Send images with Cloudinary integration.

---

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org) (v18 or above)
- [MongoDB](https://www.mongodb.com) (local or cloud instance)
- [Cloudinary Account](https://cloudinary.com) (for image storage)

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Tanmayie03/chat-app.git
   ```
2. Install dependencies for both frontend and backend::
   ```bash
   cd frontend
   npm install
   cd backend
   npm install
   ```
3. Create a .env file in the server folder and add:

   ```bash
   MONGO_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret

   ```

4. Start the backend server:
   ```bash
   cd backend
   node index.js
   ```
5. Start the frontend server:
   ```bash
   cd frontend
   npm run dev
   ```

## Usage

- Register a new user or log in with existing credentials.
- Select a user from the list to start a chat.
- Type a message or upload an image to send.
- See real-time updates, and uploaded images.
