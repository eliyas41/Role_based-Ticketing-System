# Role-Based Ticketing System

## Overview

The **Role-Based Ticketing System** is a web application built using **Node.js** and **React.js**. The app provides a role-based access control mechanism where users and admins have distinct access privileges. The system allows users to create support tickets, and admins can manage, view, and resolve tickets.

### Key Features:

- **Authentication**: Users can log in or sign up to create an account.
- **Role-Based Access**:
  - **Admin**: Admin users have the ability to manage all tickets and view detailed user information.
  - **User**: Regular users can create new tickets and view only their own tickets.
- **Dashboard**:
  - **Admin Dashboard**: Admins can view all tickets and resolve them.
  - **User Dashboard**: Users can view and manage their own tickets.

---

## Tech Stack:

- **Frontend**:
  - React.js
  - React Router
  - React Icons
  - TailwindCSS for styling
- **Backend**:
  - Node.js
  - Express.js
  - JWT Authentication for securing user data and role management
  - MongoDB for storing ticket and user data (or MySQL/other DB)
- **Authentication**:
  - JWT (JSON Web Tokens) for securing authentication and authorization
- **Deployment**:
  - Can be deployed on platforms like Heroku, Vercel, or any other platform.

---

## Installation

### **1. Clone the repository:**

```bash
git clone https://github.com/eliyas41/Role_based-Ticketing-System.git
cd role-based-ticketing-system
```
