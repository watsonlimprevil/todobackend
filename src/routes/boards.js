import express from 'express' ;
import { pool } from '../db.js';
import requireAuth from '../Middleware/Authe.js';

const router = express.Router();

router.post('/' , requireAuth , async(req,res)=>{
    const { title , description } = req.body;
    const userId = req.user.userId;

    try{
        const result = await pool.query(
            `INSERT INTO boards (user_id , title , descritption)
            VALUES ($1 , $2, $3) 
            RETURNING *`
        ,[userId , title , description])

        res.json(result.rows[0])
    }catch(error){
        res.status(500).json({error : 'server error'})
    }
})

router.get('/', requireAuth , async(req,res)=>{
    const userId = req.user.userId;
    try{
        const result = await pool.query(
            `SELECT * FROM boards WHERE user_id = $1`
        ,[userId]);

        res.json(result.rows[0])
    }catch(error){
        res.status(500).json({error :'server error'})
    }
})

export default router