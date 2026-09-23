import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from './config/config/connectDB';
// import cors from 'cors';



require('dotenv').config();
let app = express();
// app.use(cors({
//     origin: true,
//     credentials: true
// }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.URL_REACT); // Replace with your frontend URL
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', ' x-requested-with, content-type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 6969;

app.listen(port, () => {
    console.log("backend nodejs is running on the port :" + port);
});