const express = require('express');
const cookieParser = require('cookie-parser');
const { AppDataSource, initializeDatabase } = require('./utils/db-connection');
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const priorityRoutes = require("./routes/priorityRoutes");
const statusRoutes = require("./routes/statusRoutes");
const path = require("path");
const authenticateJWT = require('./middleware/authMiddleware'); // Import the JWT authentication middleware
const authController = require('./controllers/authController'); // Import authController for logout functionality

const app = express();

// Set view engine and views directory
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "public")));

// Middleware for JSON and URL encoding
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize cookie-parser middleware
app.use(cookieParser());

// Routes
app.use("/", authRoutes); // Public routes (e.g., login, registration)

// Apply authentication middleware to protected routes
app.use("/categories", authenticateJWT, categoryRoutes);
app.use("/priorities", authenticateJWT, priorityRoutes);
app.use("/statuses", authenticateJWT, statusRoutes);

// app.use("/user", authenticateJWT, userRoutes);

// Initialize database connection and start server
initializeDatabase().then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
});
