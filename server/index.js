import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import settings from  './config';

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

//Mongoose connection to MongoDB
mongoose.connect(settings.mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    app.listen(settings.port, ()=>{
        console.log(`Server running on port: ${ settings.port }`);
    });
}).catch((error)=>{
    console.log("Error ",error.message);
});
mongoose.set('useFindAndModify', false);
