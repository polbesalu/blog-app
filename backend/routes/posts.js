import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Get posts route');
});

router.post('/', (req, res) => {
  res.send('Create post route');
});

export default router;
