import express from 'express';
import { pool } from '../db.js';
import requireAuth from '../Middleware/Authe.js';

const router = express.Router();

router.post('/', requireAuth, async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.userId;

  try {
    const result = await pool.query(
      `INSERT INTO boards (user_id, title, description)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [userId, title, description]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'server error' });
  }
});

router.get('/', requireAuth, async (req, res) => {
  const userId = req.user.userId;

  try {
    const result = await pool.query(
      `SELECT * FROM boards WHERE user_id = $1`,
      [userId]
    );

    // ⭐ Return an array, not a single object
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'server error' });
  }
});

router.get('/:boardId', requireAuth, async (req, res) => {
  const { boardId } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM boards WHERE id = $1`,
      [boardId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Board not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});


router.delete('/:boardId' , requireAuth , async(req,res) => {
    const { boardId } = req.params;
    try{
    await pool.query(`DELETE from boards where id = $1`, [boardId]);
    res.json({success : true})
}catch(error){
    console.error(error);
    res.status(500).json({error : 'server error'})
}
})


router.patch('/boards/:id' , async(req,res)=>{
    const { id } = req.params;
    const { title } = req.body;

    try{
        const result = await pool.query(
            `UPDATE boards SET title = $1 WHERE id  = $2 RETURNING *`
       ,[title , id] 
    );

    res.json(result.rows[0])
    }catch(error){
        console.error(error);
        res.status(500).json({error :'server error'})
    }
})
export default router;
