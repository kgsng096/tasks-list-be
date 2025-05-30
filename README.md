# Tasks List Backend

A Node.js/Express backend for a task management application, featuring authentication, role-based access, and a RESTful API documented with Swagger/OpenAPI.

## Technology Stack

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/docs/)
- [Docker](https://www.docker.com/)
- [Swagger UI](https://swagger.io/tools/swagger-ui/) (API documentation)
- [swagger-autogen](https://www.npmjs.com/package/swagger-autogen) (API doc generation)
- [express-validator](https://express-validator.github.io/docs/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+ recommended)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) (for running Postgres easily)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-username/tasks-list-be.git
   cd tasks-list-be/backend
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Set up environment variables:**

   - Copy `.env.example` to `.env` and fill in your configuration (DB connection, JWT secret, etc.).

4. **Start PostgreSQL with Docker (optional):**

   ```sh
   docker-compose up -d
   ```

   Or run Postgres manually if you prefer.

5. **Run database migrations (if applicable):**

   ```sh
   npm run migrate
   ```

6. **Start the server:**
   ```sh
   npm run dev:init
   ```
   The server will start on [http://localhost:5000].

## API Documentation

- **Swagger UI:**  
  Visit [http://localhost:5000/documents] after starting the server to view and test the API.

- **Regenerate Swagger docs:**  
  If you change routes or comments, regenerate the docs:
  ```sh
  npm run swagger-autogen
  ```

## Project Structure

```
backend/
├── app/
│   ├── controller/        # Route controllers
│   ├── entities/          # Validation schemas
│   ├── routes/
│   │   ├── public/        # Public routes (auth, register, login)
│   │   └── private/       # Protected routes (tasks, roles, users)
├── src/
│   └── app.js             # Express app entry point
├── OpenAPI/
│   └── swagger_output.json # Generated Swagger docs
├── swagger.js             # Swagger autogen config
├── package.json
└── README.md
```

## Useful Resources

- [Express Documentation](https://expressjs.com/)
- [Swagger/OpenAPI Specification](https://swagger.io/specification/)
- [express-validator Docs](https://express-validator.github.io/docs/)
- [Docker Compose Docs](https://docs.docker.com/compose/)

## License

MIT

---

**Feel free to update this README with more details as your project evolves!**
