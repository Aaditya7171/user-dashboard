# 🌌 User Dashboard (React + Vite + Tailwind)

A **minimal user management dashboard** where you can **view, search, add, edit, and inspect user details**. Built with a focus on **clean UI, theme toggle, subtle animations, and a purple brand style**.  

> ⚡ Note: No pagination or infinite scroll — the dataset is intentionally small to prioritize **UX polish**.

[![Live Demo](https://img.shields.io/badge/Live-Demo-purple?style=for-the-badge)](https://user-dashboard-uc.netlify.app/)
![React](https://img.shields.io/badge/React-17.0-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-4.0-brightgreen?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-purple?style=for-the-badge&logo=tailwind-css)

---

## 🎨 Features

- **Users List**: Search by name/email, animated cards with initials as avatars.  
- **Details Page**: Click a card → `/users/:id` for detailed view.  
- **Add & Edit Users**: Add via `/add`; edit via `/edit/:id`. Data persists in **LocalStorage**.  
- **Theme Toggle**: Light/dark switch stored in LocalStorage, applied via Tailwind’s `dark` class.  
- **Purple Theme**: Gradients, hover shadows, and consistent focus rings.  

---

## 🛠 Tech Stack

- **React** + **Vite**  
- **React Router v6**  
- **Tailwind CSS** (dark mode + purple theme)  
- **Axios** (JSONPlaceholder API)  
- **Sonner** (toasts)  
- **LocalStorage** (persist added/edited users)  

---



## 🔄 State / Props / Hooks

**State:** `useState` for forms, Home stores API users, LocalStorage for persistence.  
**Props:** `UserCard` receives `user`; `SearchBar` controlled via `value` & `onChange`.  
**Hooks:** `useEffect` for fetching & hydrating edit forms, `useParams` & `useNavigate` for routing, custom `ThemeContext` for theme toggling.  

---

## 🚀 Routes

| Route         | Description                  |
|---------------|------------------------------|
| `/`           | Home (Users list & search)   |
| `/add`        | Add user                     |
| `/users/:id`  | User details                 |
| `/edit/:id`   | Edit user (AddUser mode)     |

---

## ⚙ Setup (Local)

```bash
# Node 18+ (I use Node 20)
npm install
npm run dev
# Open the URL shown by Vite

npm run build
npm run preview


## 🌐 Live Demo

Check it out here: https://user-dashboard-uc.netlify.app/

Made with ❤️ by Aditya Tomar
