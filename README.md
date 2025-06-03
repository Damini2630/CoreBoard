# 🧑‍💼 CoreBoard - The mini HR Performance Dashboard

A modern HR management dashboard built with **Next.js App Router**, **Tailwind CSS**, and **React**, designed for HR managers to track employee performance, manage teams, and view detailed analytics.

---

## 🔧 Tech Stack

- ⚛️ **React (Next.js App Router)**
- 🎨 **Tailwind CSS and Material UI**
- 🟨 **JavaScript (ES6+)**
- 📦 **State Management:** Context API
- 📊 **Charts:** Chart.js
- 🔐 **Authentication:** (Optional) NextAuth.js

---

## 🚀 Live Demo

[🔗 Deployed App (https://core-board-flame.vercel.app/)]

---

## 🧩 Features

### 🏠 Dashboard (`/`)
- Fetches employee data from [dummyjson.com](https://dummyjson.com/users?limit=20)
- Displays user cards with:
  - Name, Email, Age, Department
  - Performance Rating (1–5 stars)
  - Actions: **View**, **Bookmark**, **Promote**

### 🔍 Search & Filter
- Case-insensitive search by name, email, or department
- Multi-select dropdown filters by **Department** & **Rating**

### 👤 Dynamic User Details (`/employee/[id]`)
- Profile includes:
  - Address, Phone, Bio
  - Past performance history
  - Color-coded badges and rating stars
- **Tabbed UI** with:
  - `Overview`, `Projects`, `Feedback` (mocked dynamic content)

### 📌 Bookmarks Manager (`/bookmarks`)
- View all bookmarked employees
- Remove bookmarks or promote directly from list
- Responsive and intuitive UI with status handling

### 📊 Analytics Page (`/analytics`)
- Charts powered by Chart.js:
  - **Department-wise average performance**
  - **Bookmark trends** (mocked)
- Supports both client-side and SSR/SSG rendering

---

## ✨ Advanced Highlights

- ✅ Responsive design with Tailwind
- 🌗 Dark/Light Mode support
- 🔁 Custom hooks: `useDashboard`, `useSearch`, `useBookmarks`
- ♻️ Modular folder structure:
  - `components/`, `hooks/`, `pages/`, `context/`
- 🎯 Form handling with validations (in Feedback and Add Employee)
- 🧑‍💻 Developer Experience:
  - ESLint, Prettier, Git Hooks (optional)

---

## ⚙️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/hr-dashboard.git
cd hr-dashboard

# Install dependencies
npm install

# Run the development server
npm run dev

# Visit
http://localhost:3000







![coreboard1](https://github.com/user-attachments/assets/3ca2bf6f-5fd6-4ed9-990e-3e1fa3444cea)
![coreboard2-filter by 2 stars](https://github.com/user-attachments/assets/643c8484-9ec7-44e9-a44b-0090c18a4fe2)
![coreboard3-overview of employee card](https://github.com/user-attachments/assets/f1bd3249-6e1a-4045-96a6-3fd96a04ccaa)
![coreboard4](https://github.com/user-attachments/assets/52476f76-ff8a-48b3-8380-6028389f9fbb)
