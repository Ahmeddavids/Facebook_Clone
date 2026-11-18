const express = require('express');
const router = express.Router();

const { createPost, getOnePost } = require('../controllers/postController.js')

router.post('/newPost/:userId', createPost);
router.get('/onePost/:id', getOnePost)

module.exports = router
