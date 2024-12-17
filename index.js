const express = require('express');
const { AppDataSource, initializeDatabase } = require('./utils/db-connection');

const app = express();

app.use(express.json());


// Handle other routes (optional)
app.use((req, res) => {
    sendResponse(res, 404, false, 'Route not found.');
});

initializeDatabase().then(() => {
    const port = process.env.PORT || 3000;

    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
});