const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

// swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Multi-User Blog Platform API",
      version: "1.0.0",
      description:
        "API documentation for a full-featured multi-user blog with admin panel.\n\n🚨 Authentication is handled via HttpOnly cookies containing JWTs. After logging in, your browser will store a secure cookie automatically. You do not need to manually attach the token in headers.",
    },
    servers: [
      {
        url: "https://multi-user-blog-api.onrender.com",
      },
    ],
    components: {
      // Optional: You can define reusable parameters for cookies here
      parameters: {
        AuthCookie: {
          name: "token",
          in: "cookie",
          required: true,
          description: "JWT token stored in HttpOnly cookie after login",
          schema: {
            type: "string",
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

function setupSwagger(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}

module.exports = setupSwagger;
