# Rotaflow

Rotaflow is a worker scheduling platform that assigns shifts to workers based on a defined business logic.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=black)
![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
---
## ✨ Features

- **User Authentication** – secure login & registration with JWT tokens.  
- **Role Management** – define and manage roles for workers.  
- **Worker Management** – add, update, and manage worker profiles.  
- **Automated Scheduling** – generates shifts based on a 4-week cycle  
  (3 weeks on, 1 week off).  
- **Printable Schedules** – export and print generated schedules.  
- **Planned Enhancements**:  
  - Email notifications (Mailgun)  
  - WhatsApp notifications (WhatsApp Business API)  
  - Advanced administrative features and extended scheduling rules  
---
## 🛠 Tech Stack

- **Backend Framework**: [Node.js](https://nodejs.org/) + [Express.js](https://expressjs.com/)  
- **Database**: [PostgreSQL](https://www.postgresql.org/)  
- **Authentication**: JSON Web Tokens (JWT)  
- **API Documentation**: [Swagger](https://swagger.io/)  
- **Deployment**: [Render](https://render.com/) (Node.js service + external PostgreSQL)  
- **Containerization**: [Docker](https://www.docker.com/) & Docker Compose  
---
## 🚀 Getting Started

Follow these steps to set up Rotaflow locally.

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)  
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)  
- [PostgreSQL](https://www.postgresql.org/) (if running without Docker)  

---

### Installation

#### 🔹 Option 1: Run without Docker
```bash
# Clone the repository
git clone <your-repo-url>
cd rotaflow

# Install dependencies
npm install

# Start the development server
npm run dev

#### 🔹 Option 1: Run with Docker
# Clone the repository
git clone <your-repo-url>
cd rotaflow

# Start services with Docker Compose
docker-compose up --build
```
----

## 🔑 Environment Variables

Rotaflow uses environment variables for configuration.  
Create a `.env` file in the project root or update your Docker Compose configuration.  

### Example `.env` file:
```env
PORT=5000
DB_URL=postgres://username:password@localhost:5432/rotaflow
JWT_SECRET=your_jwt_secret_key
```
---
## 📖 API Documentation

Rotaflow provides interactive API documentation with **Swagger**.

Once the server is running, you can access it at:  
👉 `http://localhost:PORT/api-docs`

### Available Endpoints (high-level overview)

- **Auth**  
  - `POST /api/auth/register` → Register a new user  
  - `POST /api/auth/login` → Login and receive JWT token  

- **Roles**  
  - `POST /api/roles` → Create a role  
  - `GET /api/roles` → Get all roles  

- **Workers**  
  - `POST /api/workers` → Add a worker  
  - `GET /api/workers` → Get all workers  

- **Schedules**  
  - `POST /api/schedules/generate` → Generate worker schedule (3 weeks on, 1 week off)  
  - `GET /api/schedules` → Retrieve generated schedules  
---
## ☁️ Deployment

Rotaflow is deployed on [Render](https://render.com/).  

### Setup on Render
1. Create a **new Web Service** in Render.  
2. Connect your GitHub repository.  
3. Choose **Node.js** as the environment.  
4. Add the required **environment variables** (`PORT`, `DB_URL`, `JWT_SECRET`).  
5. Deploy the service.  

### Database
- Use **Render’s managed PostgreSQL instance** or connect an external PostgreSQL database.  
- Update `DB_URL` in your environment variables with the connection string.  

### Post-deployment
- Your API will be available at your Render domain, for example:  
  👉 `https://rotaflow.onrender.com/api`  
- Swagger docs will be available at:  
  👉 `https://rotaflow.onrender.com/api-docs`  
---
## 🗺 Roadmap

Rotaflow is under active development.  

- ✅ Core scheduling logic (3 weeks on, 1 week off)  
- ✅ User authentication with JWT  
- ✅ Role & worker management  
- ✅ Swagger API documentation  
- ✅ Docker & Docker Compose setup  
- ✅ Render deployment  

### Upcoming Features
- 🔜 Email notifications via **Mailgun**  
- 🔜 WhatsApp notifications via **WhatsApp Business API**  
- 🔜 Advanced administrative features  
- 🔜 Extended scheduling rules & customization options  
---
## 🤝 Contributing

Rotaflow is a **private/internal project**.  
Contributions are limited to the internal development team.  

If you are part of the team:  
- Follow the Git workflow (feature branches + pull requests).  
- Ensure all new code is tested and documented.  
- Update Swagger docs when adding or modifying endpoints.  

---

## 📄 License

This project is proprietary and **not open source**.  
Unauthorized use, distribution, or modification is prohibited.

