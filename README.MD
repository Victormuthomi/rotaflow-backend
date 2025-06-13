

# RotaFlow API – Backend

RotaFlow is a workforce management system that helps employers manage their employees, roles, and shift schedules efficiently.

This is the backend API for RotaFlow, built using **Node.js**, **Express**, and **PostgreSQL**, with RESTful routes for managing employers, employees, roles, and schedules.

---

## 📦 Tech Stack

- **Node.js**
- **Express.js**
- **PostgreSQL**
- **pg / Sequelize** (choose depending on implementation)
- **dotenv**
- **JWT** for authentication (optional but recommended)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone git@github.com:Victormuthomi/rotaflow-backend.git
cd rotaflow-backend

2. Install Dependencies

npm install

3. Environment Variables

Create a .env file in the root:

PORT=5000
DATABASE_URL=postgres://username:password@localhost:5432/rotaflow
JWT_SECRET=your_jwt_secret

    Adjust credentials to match your local setup.

4. Run the Server

npm run dev   # Development (nodemon)
# or
node server.js   # Production

📡 API Documentation

Base URL: http://localhost:5000/api
🔐 Employers (Authentication + Management)
Method	Endpoint	Description
POST	/employers/register	Register a new employer
POST	/employers/login	Login employer
GET	/employers	Get all employers
GET	/employers/:id	Get employer by ID
PUT	/employers/:id	Update employer
DELETE	/employers/:id	Delete employer
👷 Employees (Under Employer)
Method	Endpoint	Description
POST	/employers/:employerId/employees	Create a new employee
GET	/employers/:employerId/employees	Get all employees under an employer
GET	/employers/:employerId/employees/:id	Get specific employee
PUT	/employers/:employerId/employees/:id	Update employee
DELETE	/employers/:employerId/employees/:id	Delete employee
🧑‍💼 Roles (Job Titles, Positions)
Method	Endpoint	Description
POST	/employers/:employerId/roles	Create new role
GET	/employers/:employerId/roles	Get all roles
GET	/employers/:employerId/roles/:id	Get role by ID
PUT	/employers/:employerId/roles/:id	Update role
DELETE	/employers/:employerId/roles/:id	Delete role
📆 Schedules (Auto-Generate Monthly)
Method	Endpoint	Description
POST	/employers/:employerId/schedule	Generate a monthly schedule for all employees
🧪 Testing

If you're using tools like Postman, import the routes above and test the endpoints.
You can also use automated tests if configured:

npm test

🖥️ Related Projects

    🔗 RotaFlow Frontend – Built with Vite, React, and Tailwind CSS

📄 License

MIT License
🙌 Contribution

Pull requests and suggestions are welcome!

    Fork the repo

    Create your feature branch: git checkout -b feature/my-feature

    Commit your changes: git commit -m "Add something"

    Push to the branch: git push origin feature/my-feature

    Open a Pull Request
