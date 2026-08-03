import express from 'express';
import { pool } from '../db';
import requireAuth from '../Middleware/Authe';

const router = express.Router();

router.post('/:boardIn' , requireAuth , async(req,res)=>{
    const { title , position } = req.body;
    const { boardIn } = req.params;

    try{
        const result = await pool.query(
        `INSERT INTO lists (board_in , title , position)
         VALUES ($1 , $2 , $3)
         RETURNING *`
        ,[boardIn , title , position])

        res.json(result.rows[0])
    }catch(error){
        res.status(500).json({error : 'server error'})
    }
})


router.get('/:boardIn' , requireAuth , async(req,res)=>{
    const { boardIn } = req.params;

    try{
        const result = await pool.query(
        `SELECT * FROM lists WHERE board_id = $1 ORDER BY position 
         ASC`
        ,[boardIn])

        res.json(result.rows)
    }catch(error){
        res.status(500).json({error : 'server error'})
    }
})

export default router;