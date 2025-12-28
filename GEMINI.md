# Project Context: Supweather

## Project Overview
**Supweather** is a full-stack web application built using the **MERN Stack** (MongoDB, Express, React, Node.js). It includes a complete authentication system (Login/Register) and a dashboard protected by JWT (JSON Web Token) authentication.

### Architecture
- **Backend:** Node.js and Express.js server located in the root directory.
  - Database: MongoDB (using Mongoose ODM).
  - Authentication: Passport.js with JWT Strategy.
- **Frontend:** React Single Page Application (SPA) located in the `client/` directory.
  - State Management: Redux (with `redux-thunk` for async actions).
  - Routing: `react-router-dom` (v5).
  - UI: Bootstrap.

## Technical Details & Recent Updates
The project has been modernized to support **Node.js v22+**.
- **Mongoose:** Updated to v8.0.0+ (Removed deprecated options like `useNewUrlParser`).
- **React:** Updated to v18 (Uses `ReactDOM.createRoot`).
- **Scripts:** `react-scripts` updated to v5.
- **JWT:** `jwt-decode` updated to v4 (Using named imports).

## Development Setup

### Prerequisites
- Node.js (v18+ recommended, compatible with v22)
- MongoDB instance (Local or Atlas)

### Installation
1.  **Install Backend Dependencies:**
    ```bash
    npm install
    ```
2.  **Install Frontend Dependencies:**
    ```bash
    cd client && npm install
    # OR from root
    npm run client-install
    ```

### Configuration
- Database configuration is located in `config/keys.js`.
- Default MongoDB URI: `mongodb://localhost:27017/supweather`

## Running the Application

### Development Mode (Recommended)
Runs both the backend server and the frontend client concurrently.
```bash
npm run dev
```
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

### Individual Commands
- **Backend only:** `npm run server` (uses Nodemon) or `npm start` (standard Node).
- **Frontend only:** `npm run client`.

## Key Directory Structure

```text
/
├── server.js           # Entry point for the backend server
├── models/             # Mongoose schemas (e.g., User.js)
├── routes/             # API Routes
│   └── api/
│       └── users.js    # Authentication routes (login/register)
├── config/             # App configuration (DB keys, Passport strategy)
├── validation/         # Input validation logic (Register/Login)
└── client/             # React Frontend
    ├── public/         # Static assets
    └── src/
        ├── actions/    # Redux actions
        ├── components/ # React components (Auth, Dashboard, Layout)
        ├── reducers/   # Redux reducers
        ├── utils/      # Utilities (AuthToken handling)
        └── App.js      # Main React Component & Routing
```

## Conventions
- **Code Style:** Modern JavaScript (ES6+).
- **State Management:** Redux is used for global state (auth user, errors).
- **Styling:** CSS modules and standard CSS files imported in components.
