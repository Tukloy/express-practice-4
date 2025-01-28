import db from '../config/database.js'

// Get all posts
// GET /api/posts
export const getPosts = async (req, res, next) => {
    try {
        const [posts] = await db.query('SELECT * FROM posts')
        res.status(200).json(posts)
    } catch (e) {
         const error = new Error(`Unable to fetch posts`);
        error.status = 404;
        return next(error)
    }
}

// Get a post by ID
// GET /api/posts/:id
export const getPost = async (req, res, next) => {
    const id = req.params.id
    try {
        const [posts] = await db.query('SELECT * FROM posts WHERE id = ?', id)
        if (!posts.length) {
            const error = new Error(`Post with id ${id} not found`);
            error.status = 404;
            return next(error)
        }

        res.status(200).json(posts)
    } catch (e) {
       console.error('Cannot fetch post', e)
    }
}


//@desc Create a post
//@route POST /api/posts
export const createPost = async (req, res, next) => {
    const {title, content} = req.body
    try {
        const [result] = await db.query('INSERT INTO posts (title, content) VALUES (?, ?)', [title, content])
        const [posts] = await db.query('SELECT * FROM posts')
        res.status(201).json(posts)
    } catch (e) {
        console.error('Cannot create post', e)
    }
}

//@desc Update a post
//@route PUT /api/posts/:id
export const updatePost = async (req, res, next) => {
    const id = parseInt(req.params.id)
    const {title, content} = req.body
    try {
        const [result] = await db.query('UPDATE posts SET title = ?, content = ? WHERE id = ?', [title, content, id])
        const [posts] = await db.query('SELECT * FROM posts')
        res.status(200).json(posts)
    } catch (e) {
        console.error('Cannot update post', e)
    }
}

//@desc Delete a post
//@route DELETE /api/posts/:id
export const deletePost = async (req, res, next) => {
    const id = parseInt(req.params.id)
    try {
        const [result] = await db.query('DELETE FROM posts WHERE id = ?', id)
        const [posts] = await db.query('SELECT * FROM posts')
        res.status(200).json(posts)
    } catch (e) {
        console.error('Cannot delete post', e)
    }
}