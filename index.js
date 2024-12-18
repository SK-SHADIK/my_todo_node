const express = require('express');
const { AppDataSource, initializeDatabase } = require('./utils/db-connection');
const userRoutes = require("./routes/userRoutes");
const path = require("path");

const app = express();

// Set view engine and views directory
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "public")));

// Middleware for JSON and URL encoding
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/users", userRoutes);

initializeDatabase().then(() => {
    const port = process.env.PORT || 3000;

    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
});