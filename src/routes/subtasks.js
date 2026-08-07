import express from 'express';
import { pool } from '../db.js';
import requireAuth from '../Middleware/Authe.js';

const router = express.Router();

router.get('/:taskId' , requireAuth , async(req,res)=>{
    const { taskId } = req.params;

    try{
        const result = await pool.query(
    `SELECT * FROM subtasks WHERE task_id = $1 ORDER BY id ASC`,
    [taskId]
     );

        res.json(result.rows)
    }catch(error){
        console.error(error);
        res.status(500).json({error :' Failed to fetch subtasks'})
    }
})

router.post('/' , requireAuth , async(req,res) =>{
    const { taskId , title } = req.body;

    try{
        const result = await pool.query(
            `INSERT INTO subtasks (task_id , title)
            VALUES($1 , $2) 
            RETURNING *`
        ,[taskId , title]);
        res.json(result.rows[0]);
    }catch(error){
        console.error(error);
        res.status(500).json({error : 'Failed to create subtasks'})
    }
})

router.patch('/:id' , requireAuth , async(req,res)=>{
    const { id } = req.params;
    const { completed } = req.body;
    try{
       const result = await pool.query(
    `UPDATE subtasks 
     SET completed = $1,
     updated_at = NOW()
     WHERE id = $2`,
    [completed, id]
);


       res.json(result.rows[0])
    }catch(error){
        console.error(error);
        res.status(500).json({error : 'Failed to update subtasks'})
    }
})


router.delete('/:id' , requireAuth , async(req,res)=>{
    const { id } = req.params;
    try{
        await pool.query('DELETE FROM subtasks WHERE id = $1', [id]);
        res.status(204).end();
    }catch(err){
        console.error(err);
        res.status(500).json({error : 'Failed to delet subtasks'})
    }
})

export default router;