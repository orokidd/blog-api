const express = require('express')
const postsController = require('../controllers/posts.controller')
const router = express.Router()

router.get('/', postsController.getAllPosts)
router.get('/published', postsController.getAllPublishedPosts)
router.get('/:postId', postsController.getPostById)

router.post('/', postsController.newPost)
router.put('/:postId', postsController.editPost)
router.delete('/:postId', postsController.deletePost)

module.exports = router;