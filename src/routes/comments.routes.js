const express = require('express')
const commentsController = require('../controllers/comments.controller')
const middleware = require('../middleware/auth.middleware')
const router = express.Router()

router.get('/post/:postId', commentsController.getPostComments)

router.post('/post/:postId', middleware.loginAuthenticate, commentsController.newComment)

router.delete('/:commentId', middleware.loginAuthenticate, middleware.roleAuthenticate, commentsController.deleteComment)

router.put('/:commentId', middleware.loginAuthenticate, middleware.roleAuthenticate, commentsController.editComment)

module.exports = router