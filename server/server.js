import express from 'express'
import cors from 'cors'
import path from 'path';
import { fileURLToPath } from 'url'
import posts from './routes/posts.js'
import error from './middleware/error.js'
import notfound from './middleware/notfound.js'

const app = express()
const port = process.env.PORT || 5000

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// CORS middleware for mysql
app.use(cors())

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// Serve static
app.use(express.static(path.join(__dirname, "dist")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Routes
app.use('/api/posts', posts)

// Error handler
app.use(notfound)
app.use(error)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})