import express from 'express';
const router = express.Router();

app.get("/api/posts", (req, res) => {
    res.json([
      { id: "1", slug: "example-post", title: "Example Post" },
    ]);
  });
  

router.post('/', (req, res) => {
  res.send('Create post route');
});

export default router;
