require("express-async-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const errorHandler = require("./Error/error-middleware");
const cors = require("cors");
const connectDB = require("./db/connectDB");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

// Initialized express app
const app = express();

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
        url: "http://localhost:" + (process.env.PORT || 4000),
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

// Routes
const authRoutes = require("./routes/auth.routes");
const blogRoutes = require("./routes/blog.routes");
const commentRoutes = require("./routes/comment.routes");
const categoryTag = require("./routes/categoryTag.routes");
const adminRoutes = require("./routes/admin.routes");

//Middlewars
app.use(cors({ origin: `${process.env.CLIENT_URL}`, Credential: true })); // let's test with postman for now
dotenv.config();
app.use(express.json());
app.use(cookieParser());

// Swagger UI route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/blogs-api/v1", authRoutes);
app.use("/blogs-api/v1", blogRoutes);
app.use("/blogs-api/v1", commentRoutes);
app.use("/blogs-api/v1", categoryTag);
app.use("/blogs-api/v1", adminRoutes);

// error middleware
app.use(errorHandler);

connectDB();
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
