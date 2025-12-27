const express = require('express')
const cors = require('cors')
const routes = require('./routes/index')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', routes.auth)
app.use('/api/posts', routes.posts)
app.use('/api/comments', routes.comments)
app.use('/api/users', routes.users)

app.get('/', (req, res)=> {
    res.send("API Running")
})

app.use((err, req, res, next) => {
    res.status(500).send(`Server error: ${err}`)
})