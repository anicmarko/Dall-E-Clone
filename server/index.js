import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDb from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'

dotenv.config();
const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(express.json({limit:'50mb'}));

app.use('/api/v1/post',postRoutes);
app.use('/api/v1/dalle',dalleRoutes);

app.get('/', async (req,res) => {
    res.send('Hello from DALL-E');
    res.status(200).json({message:'Hello from DALL-E'});
})

const startServer = async () => {

    try {
        connectDb(process.env.MONGODB_URL);
        app.listen(PORT, () =>  console.log('Server has started on port http://localhost:8080'));
    } catch (error) {
        console.log(error);
    }

} 
startServer();