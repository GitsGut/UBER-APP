const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cookies = require('cookie-parser');
const cors = require('cors')
const connectToDb = require('./db/db');
const userRoute = require('./routes/user.route');
const app = express();
app.use(cookies());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));
connectToDb();
app.get('/',(req,res)=>
    {
        res.send("The official Uber App");
    });
app.use('/users',userRoute);


module.exports = app;
