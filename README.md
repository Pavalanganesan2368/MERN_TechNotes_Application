# 📝 TechNotes - MERN Stack Employee Management System

TechNotes is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application designed to help organizations manage employees, notes, and user roles efficiently. The application provides a secure authentication system and role-based authorization, allowing administrators and managers to control employee access and responsibilities.

## 🚀 Features

- 🔐 Secure User Authentication using JWT
- 👥 Role-Based Authorization
  - Employee
  - Manager
  - Admin
- 📝 Create, Read, Update, and Delete (CRUD) Notes
- 👤 Employee Management
- 📌 Assign roles to users
- 🔍 Search and filter notes
- 🔒 Protected Routes
- 📱 Responsive User Interface
- ⚡ Fast frontend built with React and Vite
- 🌐 RESTful API with Express.js
- 🗄️ MongoDB database integration using Mongoose

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- React Router
- Redux Toolkit
- RTK Query
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- Express Middleware

## 📂 Project Structure

```
MERN_TechNotes_Application/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── server.js
│   └── package.json
│
└── README.md
```

## 🔑 User Roles

### Employee
- View assigned notes
- Update note status
- Edit their own notes

### Manager
- Create employee notes
- Edit employee notes
- Manage employees

### Admin
- Full access to the application
- Create, update, and delete users
- Assign user roles
- Manage all notes

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/Pavalanganesan2368/MERN_TechNotes_Application.git
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## 🌍 Environment Variables

Create a `.env` file inside the **backend** folder.

```env
DATABASE_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_token_secret

REFRESH_TOKEN_SECRET=your_refresh_token_secret

NODE_ENV=development
```

## 📸 Screenshots

Add screenshots of your application here.

- Login Page
- Dashboard
- Notes Management
- Employee Management
- User Roles

## 🎯 Learning Outcomes

This project helped me gain hands-on experience with:

- MERN Stack Development
- REST API Development
- JWT Authentication
- Role-Based Authorization
- MongoDB & Mongoose
- Redux Toolkit & RTK Query
- React Router
- Protected Routes
- CRUD Operations
- Deployment using Render

## 📌 Future Improvements

- Email Verification
- Password Reset
- File Upload Support
- Real-Time Notifications
- Activity Logs
- Dashboard Analytics

## 👨‍💻 Author

**Pavalan Ganesan**

GitHub: https://github.com/Pavalanganesan2368

---

⭐ If you found this project helpful, feel free to give it a **Star** on GitHub!