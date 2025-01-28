import express from 'express'
import cors from 'cors'
import posts from './routes/posts.js'
import error from './middleware/error.js'
import notfound from './middleware/notfound.js'

const app = express()
const port = process.env.PORT || 5000

// CORS middleware for mysql
app.use(cors())

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/posts', posts)

// Error handler
app.use(notfound)
app.use(error)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})