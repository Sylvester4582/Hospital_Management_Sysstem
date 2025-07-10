# 🏥 Hospital Management System

A **MERN Stack** based web application for managing hospital appointments, user roles, and doctor-patient communications.

---

## ✨ Features

### 🔧 Backend (Node.js + Express + MongoDB Atlas)
- RESTful API built with Express.js
- **MongoDB Atlas** for cloud-based data storage
- Stores:
  - **Users** with three roles:
    - `patient`
    - `admin`
    - `doctor`
  - **Messages** sent by patients
  - **Appointments** requested by patients

### 💻 Frontend (React.js)
- Interactive and responsive UI
- Role-based routing and dashboard interfaces

#### 👤 Patient Interface
- Register and login
- Send messages to the hospital
- Book appointments

#### 🛡️ Admin Dashboard
- Monitor all **messages** and **appointments**
- View list of all registered **doctors**
- Add new **admins** and **doctors** to the system

---

## 🚀 Getting Started

### Prerequisites
- Node.js and npm
- MongoDB Atlas account
- React

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/Sylvester4582/Hospital_Management_System.git
cd Hospital_Management_System

cd Backend
npm install
# In `config/config.env` file and add/change the MONGODB URI and others according to your data
npm run dev

# For Frontend (Patient UI)
cd ../Frontend
npm install
npm run dev

cd ../Dashboard
npm install
npm run dev

Hospital_Management_Sysstem/
├── Backend/                
│   ├── models/            # User, Appointment, Message schemas
│   ├── routes/            # Auth, Admin, Doctor, Patient routes
│   ├── controllers/       # Logic for handling requests
│   ├── middleware/        # Custom middleware (auth and error handling)
│   ├── utilities/         # Helper functions (jwtTokens.js)
│   ├── database/          # Database connection logic (dbConnect.js)
│   ├── config/            # config.env for environment variables
│   └── server.js          # Entry point
├── Frontend/              # Patient UI built with React
│   ├── src/
│   │   ├── pages/         # Home, Appointment, AboutUs, Login, Register
│   │   ├── components/
│   │   ├── App.jsx        # Main App component
│   │   └── main.jsx       # ReactDOM entry point
├── Dashboard/             # Admin UI built with React
│   ├── src/
│   │   ├── pages/         # Dashboard, Doctors, Messages, AddNewAdmin, AddNewDoctors, Login
│   │   ├── components/
│   │   ├── App.jsx        # Main App component
│   │   └── main.jsx       # ReactDOM entry point
└── README.md
```
