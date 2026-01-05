const prisma = require('../config/prisma')

const getPostComments = async (req, res) => {
    const postId = Number(req.params.postId)

    const comments = await prisma.comment.findMany({
        where: { postId: postId },
        include: {
            user: {
                select: { username: true }
            }
        },
        orderBy: { createdAt: 'desc' }
    })

    res.json(comments)
}

const newComment = async (req, res) => {
    const postId = Number(req.params.postId)
    const comment = req.body.comment
    const userId = req.user.id

    if (!comment || comment.trim() === "") {
        return res.status(400).json({ message: "Comment content cannot be empty." });
    }

    const createdComment = await prisma.comment.create({
        data: {
            content: comment,
            userId,
            postId
        },
        include: {
            user: {
                select: {
                    username: true,
                    id: true  // Include id if needed for comparison
                }
            }
        }
    })

    res.status(200).json({ message: 'Comment posted successfully.', createdComment})
}

const deleteComment = async (req, res) => {
    const commentId = Number(req.params.commentId)
    const loggedInUserId = req.user.id

    const comment = await prisma.comment.findUnique({
        where: { id: commentId }
    });

    if (comment.userId !== loggedInUserId) {
        return res.status(403).json({ message: "You can only delete your own comments" });
    }

    await prisma.comment.delete({
        where: { id: commentId }
    })

    res.json({ message: "Comment deleted successfully" });
}

const editComment = async (req, res) => {
    const commentId = Number(req.params.commentId)
    const loggedInUserId = req.user.id
    const { content } = req.body

    const comment = await prisma.comment.findUnique({
        where: { id: commentId }
    });

    if (comment.userId !== loggedInUserId) {
        return res.status(403).json({ message: "You can only edit your own comments" });
    }

    if (!content) {
        return res.status(400).json({ error: "Content is required" });
    }

    await prisma.comment.update({
        where: { id: commentId },
        data: { content }
    })

    res.json({ message: "Comment edited successfully" })
}

module.exports = {
    getPostComments,
    newComment,
    deleteComment,
    editComment
}