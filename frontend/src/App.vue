<script setup>
import { onMounted, reactive } from 'vue'
import axios from 'axios'

const state = reactive({
  posts: {}
})

const form = reactive({
  title: '',
  content: ''
})

const fetchData = async () => {
  const response = await axios.get('/api/posts')
  state.posts = response.data
}

const createPost = async () => {
  try {
    const newPost = {
      title: form.title,
      content: form.content
    }
    await axios.post('/api/posts', newPost)
    form.title = ''
    form.content = ''
    fetchData()
  } catch (error) {
    console.error('Error creating post:', error)
  }
}

const deletePost = async (id) => {
  try {
    if (!confirm('Are you sure you want to delete this post?')) return
    await axios.delete(`/api/posts/${id}`)
    fetchData()
  } catch (error) {
    console.error('Error deleting post:', error)
  }
}

onMounted(() => {
  fetchData()
})
</script>
<template>
  <div class="grid grid-cols-3 gap-4 text-white p-8">
    <div v-for="post in state.posts" :id="post.id" class="flex p-10 bg-black relative group">
      <p class="flex-1">{{ post.title }}</p>
      <p class="flex-1">{{ post.content }}</p>
      <div class="absolute right-4 top-0 group-hover:opacity-100 opacity-0">
        <button @click="deletePost(post.id)" type="button" class="text-white cursor-pointer hover:scale-110">X</button>
      </div>
    </div>
    <form @submit.prevent="createPost()">
      <div class="flex gap-x-4">
        <input v-model="form.title" class="border border-3 border-black text-black" type="text" placeholder="title">
        <input v-model="form.content" class="border border-3 border-black text-black" type="text" placeholder="content">
        <button class="bg-blue-500  text-black p-2 rounded-lg cursor-pointer hover:bg-blue-600"
          type="submit">Save</button>
      </div>
    </form>
  </div>
</template>