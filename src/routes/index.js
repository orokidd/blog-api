const authRoute = require("./auth.routes")
const postsRoute = require("./posts.routes")
const commentsRoute = require("./comments.routes")

const routes = {
    auth: authRoute,
    posts: postsRoute,
    comments: commentsRoute
}

module.exports = routes