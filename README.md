# 🧠 Full Stack Quiz Application

This is a dynamic **Quiz Web Application** built with **Node.js, Express, MongoDB, HTML, CSS, and Vanilla JavaScript**. It supports both **Users** and **Admins**, with separate login and functionality flows.

---

## 📌 Table of Contents

- [Features](#-features)
- [Project Structure](#-project-structure)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [Running the App](#-running-the-app)
- [Application Flow](#-application-flow)
- [Quiz Topics](#-quiz-topics--example-question-format)
- [Styling](#-styling--ui)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🚀 Features

### 👤 User
- Choose role from Home
- Register / Login
- Take quizzes one question at a time
- View final score
- Select from multiple topics

### 🛠️ Admin
- Add new quiz questions by topic
- View all users’ scores
- Manage quiz content

---

## 📁 Project Structure
quiz-app/ 
│ ├── frontend/ # Client-side code 
  │ ├── home.html # Role selection (User/Admin) 
  │ ├── login.html # Login page (dynamic role-based) 
  │ ├── register.html # Registration page (dynamic role-based) 
  │ ├── quiz.html # User quiz interface 
  │ ├── admin.html # Admin dashboard to manage quiz 
  │ ├── styles.css # Global CSS styling 
  │ └── scripts/ # (Optional) JavaScript modules 
 │ ├── server.js # Main Express server for APIs 
 ├── .env # MongoDB URI and port config 
 ├── package.json # Backend dependencies and scripts 
 ├── package-lock.json 
 ├── node_modules/

---

## 🧰 Tech Stack

| Layer     | Tech                            |
|-----------|---------------------------------|
| Frontend  | HTML, CSS, JavaScript (Vanilla) |
| Backend   | Node.js, Express                |
| Database  | MongoDB (Mongoose)              |
| Security  | bcrypt (for password hashing)   |
| UI Theme  | Light Blue (`#e0f2ff`)          |

---

## 🔧 Installation & Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/quiz-app.git
cd quiz-app
npm install

node server.js

http://localhost:5500/home.html

🧠 Quiz Topics + Example Question Format
Topics include:

History

Maths

English

Funny

Riddles

Current Affairs

Example Format
json
Copy code
{
  "question": "What is the capital of France?",
  "options": ["Berlin", "Madrid", "Paris", "Lisbon"],
  "correctOption": 2,
  "topic": "Current Affairs"
}

🎨 Styling & UI
🎨 Styling & UI
Theme Color: Light Blue #e0f2ff

All pages use a shared styles.css for consistency

Quiz options are shown one at a time (not side by side)

Responsive layout, clean look

All HTML files include:

html
Copy code
<link rel="stylesheet" href="styles.css">