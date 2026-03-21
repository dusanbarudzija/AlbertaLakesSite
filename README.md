# LakeWatch

A React web application for exploring Alberta lakes, built with Vite and React Leaflet.

By Ashley Anderson, Dusan Barudzija, Fred Deng, Saad Foda, & Brighton Gosinet

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes with Node.js)

## Installation

Install dependencies:

```bash
cd AlbertaLakesSite
npm install
```

## Running the App

### Development server

```bash
npm run dev
```

Opens the app at `http://localhost:5173`.

### Test Accounts

#### Admin Account
- **Email:** admin@test.com
- **Password:** admin

#### Public User Account 
- **Email:** sampleuser1234@email.com
- **Password:** [any-password]

### Testing Error Pages

#### 404 Not Found Page

1. Navigate to the Home page
2. Scroll down to the map section
3. Click on the **"Invalid link (for demo purposes)"** text underneath the map
4. You will be redirected to the custom 404 error page