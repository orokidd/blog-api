const express = require('express')
const commentsController = require('../controllers/comments.controller')
const router = express.Router()

router.get('/post/:postId', commentsController.getPostComments)

router.delete('/:commentId', commentsController.deleteComment)

router.put('/:commentId', commentsController.editComment)

module.exports = router