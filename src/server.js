import express from 'express' ;
import dotenv from 'dotenv';
import cors from 'cors';
import boardRoutes from './routes/boards.js';
import listRoutes from './routes/lists.js';
import taskRoutes from './routes/tasks.js'
import authRoutes from './Authentication/Auth.js'
dotenv.config();

const app =  express()


origin: (origin, callback) => {
  const allowed = [
    "http://localhost:5173",
    /\.vercel\.app$/
  ];

  if (!origin) {
    return callback(null, true);
  }

  const isAllowed = allowed.some(rule => {
    if (rule instanceof RegExp) return rule.test(origin);
    return rule === origin;
  });

  // ⭐ DO NOT THROW ERROR — JUST DENY WITHOUT CRASHING
  if (isAllowed) {
    callback(null, true);
  } else {
    callback(null, false);  // <— THIS IS THE FIX
  }
},

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/boards', boardRoutes);
app.use('/lists', listRoutes);
app.use('/tasks', taskRoutes);
app.listen(5000 , ()=>{
    console.log('backend is started on port 5000')
})