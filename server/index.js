import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import settings from  './config';
//Routers
import postRoutes from './routes/posts'; 
import userRoutes from './routes/users'; 

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
//Register routes
app.use('/posts', postRoutes);
app.use('/users', userRoutes);
//Mongoose connection to MongoDB
mongoose.connect((process.env.MONGO_URL || settings.mongo_url), {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    app.listen((process.env.PORT || settings.port), ()=>{
        console.log(`Server running on port: ${ process.env.PORT || settings.port }`);
    });
}).catch((error)=>{
    console.log("Error ",error.message);
});
mongoose.set('useFindAndModify', false);
