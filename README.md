# 🔐 Production-Ready Auth Template: NestJS + Next.js + Prisma 7

<div align="center">

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Prisma](https://img.shields.io/badge/Prisma-7.0.0-informational)
![NestJS](https://img.shields.io/badge/NestJS-10.x-red)
![Next.js](https://img.shields.io/badge/Next.js-15%2B-black)
![Docker](https://img.shields.io/badge/Docker-Ready-blue)

**A robust, flexible, and secure authentication boilerplate using the latest tech stack.**



</div>

---

## 🚀 Overview

This template is designed for developers who need a **solid starting point** without the headache of setting up authentication flows from scratch. Unlike complex monorepos, this project maintains a decoupled structure for maximum flexibility.

It features the **latest Prisma 7**, pre-configured to work flawlessly with Docker and local environments, solving common installation issues found in other boilerplates.

### Key Features
* **🔌 Prisma 7 Ready:** Fully configured to use the latest ORM version without versioning conflicts.
* **🛡️ HttpOnly Cookies:** Secure authentication flow (no tokens in localStorage).
* **⚡ Next.js Server Actions:** Modern frontend data mutation without extra API routes.
* **🐳 Dockerized:** Full containerization for Backend, Frontend, and Database.
* **✅ Strong Validation:** Environment variables and DTOs validated with `Joi` to prevent runtime errors.
* **📐 Decoupled Structure:** Independent backend and frontend folders for flexible deployment.
* **🔑 Google OAuth:** Passport strategy fully implemented.

---

## 🧠 Authentication Workflow

We believe in transparency. Here is exactly how the backend handles the OAuth flow to ensure security.

<img width="1840" height="771" alt="backend-auth-workflow" src="https://github.com/user-attachments/assets/3b40d425-f147-4b71-94ab-bf4080b1c939" />

---

## 🛠️ Tech Stack

### Backend
* **Framework:** NestJS
* **Database:** PostgreSQL with Prisma 7
* **Auth:** Passport (Google Strategy), JWT
* **Validation:** Joi

### Frontend
* **Framework:** Next.js (App Router)
* **Styling:** TailwindCSS
* **State/Actions:** Server Actions

---

## ⚡ Quick Start (Docker)

The easiest way to run the project.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/RodrigoAlexander7/login-template.git](https://github.com/RodrigoAlexander7/login-template.git)
    cd login-template
    ```

2.  **Environment Setup:**
    Create `.env` files from the examples.
    ```bash
    cp backend/.env.example backend/.env
    cp frontend/.env.example frontend/.env
    ```

3.  **Run with Docker Compose:**
    ```bash
    docker-compose up -d --build
    ```

4.  **Access the App:**
    * **Backend:** `http://localhost:3000`
    * **Frontend:** `http://localhost:4000`

---

## 🔧 Manual Installation

If you prefer running it locally without Docker:

### Backend
```bash
cd backend
npm install

# Initialize Prisma 7
npx prisma generate
npx prisma migrate dev

npm run start:dev
````

### Frontend

```bash
cd frontend
npm install
npm run dev
```

-----

## 📝 Environment Variables

This project uses **Joi** to validate environment variables. The app will not start if these are missing.

| Variable | Description |
| :--- | :--- |
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret key for signing tokens |
| `GOOGLE_CLIENT_ID` | OAuth Client ID from Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | OAuth Client Secret |
| `FRONTEND_URL` | URL for CORS and Cookies (e.g., `http://localhost:4000`) |

-----

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

-----

## ⭐️ Show your support

Give a ⭐️ if this project helped you\!

-----

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
