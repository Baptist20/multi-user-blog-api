require("express-async-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const errorHandler = require("./Error/error-middleware");
const cors = require("cors");
const connectDB = require("./db/connectDB");
const setupSwagger = require("./utils/swaggerui");

// Initialized express app
const app = express();
dotenv.config();
setupSwagger(app);

// Routes
const authRoutes = require("./routes/auth.routes");
const blogRoutes = require("./routes/blog.routes");
const commentRoutes = require("./routes/comment.routes");
const categoryTag = require("./routes/categoryTag.routes");
const adminRoutes = require("./routes/admin.routes");

//Middlewars
app.use(cors({ origin: `${process.env.CLIENT_URL}`, credentials: true })); // let's test with postman for now
app.use(express.json());
app.use(cookieParser());

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
