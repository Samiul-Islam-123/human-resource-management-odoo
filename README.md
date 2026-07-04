# Enterprise HR Management System 🚀

A modern, full-stack Human Resource Management System designed to handle enterprise needs ranging from core employee directory management to dynamic leave tracking, automated employee ID generation, and company-wide announcements. 

Built with the **MERN** stack (MongoDB, Express, React, Node) and beautifully styled with **Tailwind CSS**.

---

## 🌟 Key Features

*   **Smart Authentication & RBAC**: Role-Based Access Control distinguishing between `Admin/HR` and standard `Employee` accounts. Includes a dynamic login system that seamlessly handles both Email and Auto-Generated Employee IDs.
*   **Auto-Generated Employee IDs**: Enforces a strict enterprise ID standard. When a new employee is added, the system automatically builds a unique identifier (e.g., `OIJODO20240001`) based on their name, joining year, and serial sequence.
*   **Live Dashboards**: 
    *   *Employee*: View real-time weekly hours worked (calculating towards a 40-hour week), today's live attendance status, recent log history, and broadcasted announcements.
    *   *Admin*: See high-level metrics including total headcount, active employees, on-leave counts, and system-wide audit logs.
*   **Talent Directory**: A comprehensive CRUD interface for HR to onboard, update, deactivate, and manage employee profiles, complete with custom role designations and automated default avatars.
*   **Advanced Leave Management (Time Off)**: 
    *   *Employees* can request leaves (Paid, Sick, Unpaid), view real-time leave balances, and track their history on a gorgeous monthly Calendar View.
    *   *Admins* can approve or reject leaves, which automatically updates the employee's global leave balance and records the action in an immutable Audit Log.
*   **Company Announcements**: A dedicated module for HR to broadcast important updates (with customizable color themes) directly to all employee dashboards.
*   **Profile Management**: Secure password change flows, role overview, and employment details.

---

## 🧭 System Flow & Guide

The platform is divided into two distinct portals: **Admin** and **Employee**.

### 1. For Admins & HR (`/admin/dashboard`)
*   **Login**: Use an admin email or Admin Employee ID.
*   **Onboarding Employees**: Navigate to the **Employees** tab. Click "Add Employee", fill out their basic details, and set an initial password. The system will auto-generate their Employee ID and activate them.
*   **Managing Leave Requests**: Go to the **Leave Requests** tab. You'll see pending requests from your staff. You can Accept or Reject them. Accepting a leave will automatically deduct from the employee's leave balance.
*   **Broadcasting Announcements**: Under the **Announcements** tab, you can create new company-wide posts. Choose a priority color (e.g., Red for Urgent, Purple for Info) and post it to push it instantly to all employee dashboards.
*   **Audit Logging**: The system automatically tracks every time you approve or reject a leave in the **Audit Logs** tab for compliance.

### 2. For Employees (`/dashboard`)
*   **Login**: Use the `Employee ID` generated for you by HR (e.g., OIJODO20260002) and your password.
*   **Your Dashboard**: Upon logging in, you'll see your live weekly hours worked against your 40-hour goal. You will also see your check-in status for the day, recent activity logs, and the latest announcements from HR.
*   **Requesting Time Off**: Navigate to the **Time Off** tab. Here you can see your current Leave Balance. Select dates on the interactive calendar to request time off (Sick, Paid, or Unpaid). You can track the status (Pending, Approved, Rejected) of your past requests right here.
*   **Managing Profile**: Click on your avatar at the top right to visit your Profile. You can view your employment details and securely update your password.

---

## 🛠️ Tech Stack

*   **Frontend**: React (Vite), Tailwind CSS, Lucide Icons, Axios, React Router.
*   **Backend**: Node.js, Express.js, MongoDB (Mongoose).
*   **Security**: JSON Web Tokens (JWT) for stateless authentication, Bcrypt for password hashing.
*   **Architecture**: Modular MVC-style backend architecture (Modules separated by feature: Auth, Users, TimeOff, Dashboard, Announcements).

---

## 🚀 Getting Started (Local Development)

### Prerequisites
*   Node.js (v16+)
*   MongoDB Instance (Atlas or Local)

### Setup Backend
1. Navigate to the `backend` directory.
2. Run `npm install` to install dependencies.
3. Create a `.env` file and set the following:
   ```env
   PORT=5500
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server: `npm run dev`

### Setup Frontend
1. Navigate to the `frontend` directory.
2. Run `npm install` to install dependencies.
3. Start the dev server: `npm run dev`
4. The application will run at `http://localhost:5173`.
