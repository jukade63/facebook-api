require('dotenv').config()
const express = require('express')
const cors = require('cors')

const authRouter = require('./routes/authRoute')
const userRouter = require('./routes/userRoute')
const friendRouter = require('./routes/friendRoute')
const postRouter = require('./routes/postRoute')
const authenticate = require('./middlewares/authenticate')
const notFoundMiddleware = require('./middlewares/notFound')
const errorMiddleware = require('./middlewares/error')

const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/auth', authRouter)
app.use('/users', authenticate, userRouter)
app.use('/friends', authenticate, friendRouter)
app.use('/posts', authenticate, postRouter)

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`server running on port ${port}`))