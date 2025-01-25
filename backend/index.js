const express = require('express');
const cors = require('cors');
const db = require('./connection');
const appuserRoute = require('./routes/appuser');
const categoryRoutes = require('./routes/category');
const articleRoutes = require('./routes/article');


const app = express();
app.use(express.json());
app.use(cors());

app.use('/appuser', appuserRoute);
app.use('/category', categoryRoutes);
app.use('/article', articleRoutes);

module.exports = app;