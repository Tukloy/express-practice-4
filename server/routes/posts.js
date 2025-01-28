import express from 'express'
import {getPosts, getPost, createPost, updatePost, deletePost} from '../controllers/postsController.js'

const router = express.Router()

router.get('/' , getPosts)
router.get('/:id', getPost)
router.post('/', createPost)
router.put('/:id', updatePost)
router.delete('/:id', deletePost)

export default router