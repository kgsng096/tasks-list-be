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

### Running the App

#### Option 1: Using Docker Compose (Recommended)

1. **Copy environment variables:**
   ```sh
   cp .env_example .env
   ```

2. **Start the backend and database:**
   ```sh
   docker-compose up --build
   ```
   This will build the backend image and start both the backend and PostgreSQL containers.

3. **Access the API:**  
   The backend will be available at [http://localhost:5000](http://localhost:5000).

#### Option 2: Run Manually (Locally)

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Start PostgreSQL**  
   You can use Docker or a local installation. Example with Docker:
   ```sh
   docker run --name tasks-list -e POSTGRES_DB=tasks_app -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -p 5432:5432 -d postgres:13
   ```

3. **Set up environment variables:**  
   Copy `.env_example` to `.env` and update as needed.

4. **Run database migrations (if applicable):**
   ```sh
   npm run migrate
   ```

5. **Start the backend:**
   ```sh
   npm run dev:init
   ```

6. **Access the API:**  
   The backend will be available at [http://localhost:5000](http://localhost:5000).

## API Documentation

- **Swagger UI:**  
  Visit [http://localhost:5000/api-docs](http://localhost:5000/api-docs) after starting the server to view and test the API.

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
