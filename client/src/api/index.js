import axios from 'axios'

const url = 'https://good-memories.herokuapp.com/posts'

export const fetchPosts = () => axios.get(url)

export const createPost = (newPost) => {axios.post(url , newPost) ; axios.get(url)}

export const updatePost = (id , updatedPost) => {axios.patch(`${url}/${id}` , updatedPost) ;axios.get(url)}

export const deletePost = (id) => axios.delete(`${url}/${id}`)