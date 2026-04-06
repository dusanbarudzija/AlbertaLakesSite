# LakeWatch

A React web application for exploring Alberta lakes, built with Vite and React Leaflet.

By Ashley Anderson, Dusan Barudzija, Fred Deng, Saad Foda, & Brighton Gosinet

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes with Node.js)

## Installation

Install dependencies for both the client and server:

```bash
cd client
npm install

cd ../server
npm install
```

## Running the App

### Server

1. Navigate to the server directory:

```bash
cd server
```

2. Create a `.env` file with your MongoDB connection string:

```
MONGODB_URI=your_mongodb_atlas_connection_string
```

3. Start the server:

```bash
node server.js
```

The API will be available at `http://localhost:3001`.

### Client

1. In a separate terminal, navigate to the client directory:

```bash
cd client
```

2. Start the development server:

```bash
npm run dev
```

Opens the app at `http://localhost:5173`.

### Test Accounts

The following accounts are available for testing. New accounts can also be registered through the application.

#### Admin Account
- **Email:** admin@test.com
- **Password:** admin

#### Public User Account 
- **Email:** sampleuser1234@email.com
- **Password:** abc123