# Finex: A Zerodha Clone 🧾📈

**Finex** is a full-stack trading platform inspired by Zerodha, built using **React**, **Node.js**, and **MongoDB**. The project is modular, featuring a public-facing site, a secure user dashboard, and a powerful backend API.

---

## 🌐 Project Structure

```
Finex/
├── backend/        # Express.js backend (API, auth, DB)
├── dashboard/      # Authenticated trading dashboard (React)
├── frontend/       # Public-facing landing page (React)
└── README.md       # You're reading this!
```

---

## 🚀 Features

- JWT-based Authentication with Cookies
- Modular backend using Express + Mongoose
- Secure login and registration flow
- Role-based access protection
- Dynamic dashboard (Holdings, Orders, Positions, Watchlist, etc.)
- Responsive UI (Mobile, Tablet, Desktop)
- MongoDB for storing user and trading data

---

## 📦 Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React, JSX, CSS                   |
| Dashboard  | React, React Router, Axios        |
| Backend    | Node.js, Express, Mongoose, JWT   |
| Database   | MongoDB (with Mongoose ODM)       |
| Styling    | Custom CSS, Responsive Design     |
| Auth       | JWT + Cookie-based session        |

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
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
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


## 🙌 Credits

Developed by [Manan Patel](https://github.com/manan2324) — a full-stack trading simulation platform for learning and demo purposes.
