# 📚 Book Management App — Role-Based Access Control (RBAC)

A full-stack Book Management Application with a complete authentication system and Role-Based Access Control (RBAC). Admin users have full CRUD access to books, while regular users can only view them.

---

## 🚀 Features

- User registration and login with JWT authentication
- Two user roles: **Admin** and **Regular User**
- Role-based API protection using middleware
- Admin can create, update, and delete books
- Regular users can only view books
- Admin promotion via API endpoint
- Frontend UI adapts based on user role

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT (JSON Web Tokens) |
| Password Hashing | bcrypt |
| Frontend | React.js |

---

## 📁 Project Structure

```
book-management-app/
│
├── backend/
│   ├── controllers/
│   │   ├── authController.js       # Register and login logic
│   │   ├── bookController.js       # CRUD operations for books
│   │   └── userController.js       # Make admin logic
│   │
│   ├── middleware/
│   │   ├── authenticate.js         # JWT verification
│   │   └── authorize.js            # Role-based access control
│   │
│   ├── models/
│   │   ├── User.js                 # User schema with role field
│   │   └── Book.js                 # Book schema
│   │
│   ├── routes/
│   │   ├── authRoutes.js           # /auth/register, /auth/login
│   │   ├── bookRoutes.js           # /books CRUD routes
│   │   └── userRoutes.js           # /users/:id/make-admin
│   │
│   ├── .env                        # Environment variables
│   ├── app.js                      # Express app setup
│   └── server.js                   # Server entry point
│
└── frontend/
    └── src/
        ├── components/
        │   └── BookList.jsx         # Role-based UI component
        ├── context/
        │   └── AuthContext.jsx      # Auth state management
        └── App.jsx                  # Root component
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have these installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Postman](https://www.postman.com/downloads/) (for testing)

---

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/your-username/book-management-app.git
cd book-management-app
```

**2. Install backend dependencies**
```bash
cd backend
npm install
```

**3. Set up environment variables**

Create a `.env` file inside the `backend` folder:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/bookmanagement
JWT_SECRET=your_secret_key_here
```

**4. Start MongoDB**
```bash
mongod
```

**5. Start the backend server**
```bash
node server.js
```

You should see:
```
Connected to MongoDB
Server running on port 5000
```

---

## 🔐 User Roles & Permissions

| Action | Admin | Regular User |
|---|---|---|
| View Books | ✅ | ✅ |
| Add Book | ✅ | ❌ |
| Edit Book | ✅ | ❌ |
| Delete Book | ✅ | ❌ |

---

## 📡 API Endpoints

### Auth Routes

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/auth/register` | Register a new user | Public |
| POST | `/auth/login` | Login and get token | Public |

### Book Routes

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/books` | Get all books | All users |
| POST | `/books` | Create a new book | Admin only |
| PUT | `/books/:id` | Update a book | Admin only |
| DELETE | `/books/:id` | Delete a book | Admin only |

### User Routes

| Method | Endpoint | Description | Access |
|---|---|---|---|
| PUT | `/users/:userId/make-admin` | Promote user to admin | Admin only |

---

## 🧪 Testing the API

### Step 1 — Register a user
```
POST http://localhost:5000/auth/register
Body:
{
  "name": "Rahul",
  "email": "rahul@gmail.com",
  "password": "123456"
}
```

### Step 2 — Login
```
POST http://localhost:5000/auth/login
Body:
{
  "email": "rahul@gmail.com",
  "password": "123456"
}
```
Copy the token from the response.

### Step 3 — Try to create a book as regular user (should be blocked)
```
POST http://localhost:5000/books
Headers: Authorization: Bearer <token>
Body:
{
  "title": "Atomic Habits",
  "author": "James Clear"
}
Expected: 403 Forbidden
```

### Step 4 — Promote a user to admin (via MongoDB)
```bash
mongosh
use bookmanagement
db.users.updateOne({ email: "rahul@gmail.com" }, { $set: { role: "admin" } })
```

### Step 5 — Login again and create a book as admin
```
POST http://localhost:5000/books
Headers: Authorization: Bearer <new token>
Body:
{
  "title": "Atomic Habits",
  "author": "James Clear"
}
Expected: 201 Created
```

---

## ✅ Test Results

| # | Test Case | Role | Expected | Result |
|---|---|---|---|---|
| 1 | Register user | — | 201 Created | ✅ Pass |
| 2 | Login | — | 200 OK + token | ✅ Pass |
| 3 | Regular user creates book | Regular User | 403 Forbidden | ✅ Pass |
| 4 | Register admin user | — | 201 Created | ✅ Pass |
| 5 | Promote user to admin | — | modifiedCount: 1 | ✅ Pass |
| 6 | Admin creates book | Admin | 201 Created | ✅ Pass |

---

## 🔒 How Authorization Works

```
Incoming Request
      ↓
authenticate.js       → Verifies JWT token, sets req.user
      ↓
authorize.js          → Checks req.user.role === 'admin'
      ↓
Controller            → Executes the actual logic
      ↓
Response sent back
```

If a regular user tries to access an admin route:
```json
{
  "message": "Access denied: insufficient permissions"
}
```

---

## 🌐 Frontend Role-Based UI

- **Admin** sees: View + Add + Edit + Delete buttons
- **Regular User** sees: View only — Add/Edit/Delete buttons are hidden

---

## 📝 Environment Variables

| Variable | Description | Example |
|---|---|---|
| PORT | Server port | 5000 |
| MONGO_URI | MongoDB connection string | mongodb://localhost:27017/bookmanagement |
| JWT_SECRET | Secret key for JWT signing | mysecretkey123 |

---

## 👤 Author

**Mahesh M G**

---
