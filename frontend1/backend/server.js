const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Database Connection
mongoose.connect(process.env.Mongo_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("DB mongoose.Connection Error:",err));
//Routes
app.use('/api/auth',require('./routes/authRoutes'));
app.use('/api/expenses',require('./routes/expenseRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
     console.log(`Server running on  http://localhost:${PORT}`)
});