const fs = require("fs");
const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./OpenAPI/swagger_output.json";
const endpointsFiles = ["./src/app.js", "./app/routes/*.js"];

const doc = {
  openapi: "3.0.0",
  info: {
    title: "My Express API with Auth",
    description: "Documentation for an Express.js API For Task App",
    version: "1.0.0",
  },
  host: "localhost:5000",
  schemes: ["http"],

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  const data = JSON.parse(fs.readFileSync(outputFile, "utf8"));
  delete data.swagger;
  fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
  require("./src/app.js");
});
