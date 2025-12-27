const authRoute = require("./auth.routes")
const postsRoute = require("./posts.routes")
const commentsRoute = require("./comments.routes")
const usersRoute = require("./users.routes")

const routes = {
    auth: authRoute,
    posts: postsRoute,
    comments: commentsRoute,
    users: usersRoute
}

module.exports = routes