# Parlour Admin Dashboard 💇‍♀️

A full-stack web dashboard for managing employees, tasks, and real-time attendance in a parlour business.

---

## 📦 Tech Stack

| Layer      | Tech                                                |
|------------|-----------------------------------------------------|
| Frontend   | Next.js 15 (App Router), TypeScript, TailwindCSS, ShadCN UI |
| Backend    | Node.js, Express, TypeScript, MVC Architecture      |
| Auth       | JWT-based login with Role-based Access Control      |
| Database   | MongoDB + Mongoose                                  |
| Realtime   | WebSocket via Socket.IO                             |
| Deployment | Vercel (Frontend) + Render/Railway (Backend)        |

---

## 👤 User Roles

### 🧑‍💼 Super Admin
- Can **add/update/delete** employees and tasks
- Can **view live attendance**
- Can **export attendance logs (PDF)**

### 👨‍💻 Admin
- Can **only view** employees, tasks, and attendance

---

## 🖥 Features

- 🔐 Login with email + password (JWT-based)
- 🎛 Role-based dashboard access
- 👥 Employee Management (CRUD for superadmin)
- 📋 Task Management (CRUD for superadmin)
- ⏱ Realtime Attendance Punch In/Out (WebSocket)
- 📊 Live dashboard auto-updates
- 🧾 Attendance PDF export (superadmin)
- 🖥 Frontdesk Attendance Screen (`/attendance`)

---

## 📁 Project Structure (monorepo)

/parlour-project
├── /frontend-parlour-dashboard     → Next.js 15 + TypeScript + TailwindCSS + ShadCN UI
│   ├── /app                        → App Router pages like /login, /dashboard, /attendance
│   ├── /components                 → Reusable UI components (e.g. Navbar, EmployeeCard)
│   ├── /lib                        → Helper functions (e.g. auth utils, API fetchers)
│   ├── /hooks                      → Custom React hooks
│   ├── /context                    → Auth context and providers
│   ├── /styles                     → Global CSS and Tailwind config
│   └── tailwind.config.ts         → Tailwind + ShadCN config
│
├── /backend-parlour-api           → Node.js + Express + TypeScript + MongoDB + Socket.IO
│   ├── /models                    → Mongoose models (User, Employee, Task, Attendance)
│   ├── /controllers               → Business logic for routes
│   ├── /routes                    → Express route handlers (auth, employee, task, etc.)
│   ├── /middlewares               → Auth middleware, error handling
│   ├── /utils                     → JWT helpers, validators, etc.
│   ├── /config                    → DB config, server setup
│   └── server.ts                 → Main entry point
│
└── README.md                      → Project documentation (you’re reading it!)


---

## 🛠️ Local Setup

### 1. Clone the Repo

```bash
git clone https://github.com/<your-username>/parlour-admin-dashboard.git
cd parlour-admin-dashboard

2. Setup Backend

cd backend-parlour-api
npm install

# .env file
PORT=5000
MONGODB_URI=mongodb://localhost:27017/parlourdb
JWT_SECRET=your-secret-key

npm run dev

3. Setup Frontend

cd ../frontend-parlour-dashboard
npm install
npm run dev

Visit: http://localhost:3000
