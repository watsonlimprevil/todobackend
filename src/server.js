import express from 'express' ;
import dotenv from 'dotenv';
import cors from 'cors';
import boardRoutes from './routes/boards.js';
import listRoutes from './routes/lists.js';
import taskRoutes from './routes/tasks.js'
import authRoutes from './Authentication/Auth.js'
dotenv.config();

const app =  express()


app.use(cors({
  origin: (origin, callback) => {
    const allowed = [
      "http://localhost:5173",
      /\.vercel\.app$/
    ];

    if (!origin) return callback(null, true);

    const isAllowed = allowed.some(rule => {
      if (rule instanceof RegExp) return rule.test(origin);
      return rule === origin;
    });

    // ⭐ SAFE — does NOT crash Railway
    callback(null, isAllowed);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));





app.use(express.json());
app.use('/auth', authRoutes);
app.use('/boards', boardRoutes);
app.use('/lists', listRoutes);
app.use('/tasks', taskRoutes);
app.listen(5000 , ()=>{
    console.log('backend is started on port 5000')
})