import express from 'express' ;
import dotenv from 'dotenv';
import cors from 'cors';
import boardRoutes from './routes/boards.js';
import listRoutes from './routes/lists.js';
import taskRoutes from './routes/tasks.js'
import authRoutes from './Authentication/Auth.js'
dotenv.config();

const app = express.Router();

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/boards', boardRoutes);
app.use('/lists', listRoutes);
app.use('/tasks', taskRoutes);
app.listen(5000 , ()=>{
    console.log('backend is started on port 5000')
})