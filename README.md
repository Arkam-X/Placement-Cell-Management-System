# 🎓 Placement Cell Management System

## 📌 Overview
The **Placement Cell Management System** is a full-stack web application designed to digitize and streamline college placement activities.  
It replaces informal tools such as WhatsApp groups and spreadsheets with a **secure, role-based, centralized platform**.

The system enables students to apply for placement opportunities and track their application status, while allowing Training & Placement Officers (TPOs) to manage companies and applicants efficiently.

---

## 🧩 Problem Statement
Traditional placement processes often suffer from:
- Manual data handling
- Lack of transparency for students
- Missed WhatsApp message === Missed OPPORTUNITY
- 100's of Google Forms and links
- No centralized tracking of applications
- Security and role-confusion issues

This project solves these problems by providing:
- Role-based access control
- Smooth's the placement process
- Secure REST APIs
- Structured placement workflows
- Scalable backend architecture

---

## ✨ Features

### 👨‍🎓 Student
- Register & login
- View listed companies
- Apply to eligible companies
- Track application status (Applied, Shortlisted, Rejected, Selected)

### 👨‍💼 TPO / Admin
- Register & login
- Add, view, edit, and delete companies
- View applicants per company
- Update application status

---

## 🛠 Tech Stack

### Backend
- Javascript
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

### Frontend (Planned / In Progress)
- React.js
- Axios
- CSS / Tailwind CSS

---

## 🔐 Role-Based Access Control

| Role     | Permissions |
|---------|-------------|
| STUDENT | View companies, apply, track applications |
| TPO     | Manage companies, view applicants, update application status |

Authorization is enforced at both **API level** and **business logic level**.

---

## 🛡 Security Measures
- Password hashing using bcrypt
- JWT-based authentication
- Role-based authorization middleware
- Server-side eligibility validation
- Duplicate application prevention using database-level unique index


---
Developed by **Arkam Chaudhary**😎