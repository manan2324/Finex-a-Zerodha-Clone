# Finex: A Zerodha Clone 🧾📈

![MIT License](https://img.shields.io/badge/License-MIT-green.svg)

**Finex** is a modular, full-stack trading simulation platform inspired by [Zerodha](https://zerodha.com/). Built with **React**, **Node.js**, and **MongoDB**, it offers a realistic dashboard, secure authentication, and a responsive public website.  
**For demo/learning purposes only. Not production use!**

---

## 🌐 Project Structure

```
Finex/
├── backend/        # Express.js REST API server (auth, trading logic)
├── dashboard/      #  Authenticated user dashboard (React SPA)
├── frontend/       # Public landing site (React SPA)
└── README.md       # Project documentation
```

---

## 🚀 Features

- Session-based Authentication using Passport.js and Cookies
- Modular backend using Express + Mongoose
- Secure login and registration flow
- Role-based access protection
- Dynamic dashboard (Holdings, Orders, Positions, Watchlist, etc.)
- Responsive UI (Mobile, Tablet, Desktop)
- MongoDB for storing user and trading data

---

## 📦 Tech Stack

| Layer      | Technology                                 |
|------------|--------------------------------------------|
| Frontend   | React, JSX, CSS                            |
| Dashboard  | React, React Router, Axios                 |
| Backend    | Node.js, Express, Mongoose                 |
| Database   | MongoDB (with Mongoose ODM)                |
| Styling    | Custom CSS, Bootsrap, Responsive Design    |
| Auth       | Passport.js + Express-session (Cookie-based) |

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/manan2324/Finex-a-Zerodha-Clone.git
cd Finex-a-Zerodha-Clone
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
PORT=5000
MONGO_URL=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
CLIENT_URL=https://your_frontend_app_url.com
```

Start the backend:

```bash
npm start
```

---

### 3. Dashboard Setup

```bash
cd ../dashboard
npm install
npm start
```

---

### 4. Frontend Setup (Public Landing Page)

```bash
cd ../frontend
npm install
npm start
```

---

## 🧪 Development Notes

- Use MongoDB Atlas or local MongoDB server.
- Ensure CORS is handled in backend for frontend and dashboard requests.
- Both React apps use proxy settings for API calls to backend.

---

## 📁 Environment Files

Each subproject manages its own environment:

- `backend/.env` – Backend config
- `dashboard/.env` – Dashboard-specific config
- `frontend/.env` – Public site config

---

## 🤝 Contributing

Contributions, bug reports, and suggestions are welcome! 

## ⚠️ Disclaimer

This project is for educational and demonstration purposes only. **Do not use for live trading or production.**

## 📄 License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.