const express = require('express')
const postsController = require('../controllers/posts.controller')
const middleware = require('../middleware/auth.middleware')
const router = express.Router()

router.get('/', postsController.getAllPosts)
router.get('/published', postsController.getAllPublishedPosts)
router.get('/search', postsController.searchPostByTitle)
router.get('/:postId', postsController.getPostById)

router.post('/', middleware.loginAuthenticate, middleware.roleAuthenticate, postsController.newPost)
router.put('/:postId', middleware.loginAuthenticate, middleware.roleAuthenticate, postsController.editPost)
router.delete('/:postId', middleware.loginAuthenticate, middleware.roleAuthenticate, postsController.deletePost)

module.exports = router;