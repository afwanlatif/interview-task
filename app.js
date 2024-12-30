const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectDB } = require('./config/db.config');
const setupRoutes = require('./routes/base.router');
const port = 3003

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// setting up the routes
setupRoutes(app);

// db connection
connectDB();


app.listen(port, () => {
    console.log(`Server is running on port no ${port}`);
});