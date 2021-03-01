import PostMessage from "../models/postMessage.js"
import mongoose from 'mongoose'

export const getPosts = async (req,res) => {
    try {
        const postMessages = await PostMessage.find()  
        //console.log(postMessages)
        res.status(200).json(postMessages)
    } catch (error) {
        res.status(404).json({message : error.message})
    }
}

export const createPost = async (req,res) => {

    const post = req.body
    const newPost = new PostMessage(post) 

    try {
        await newPost.save()
        res.status(200)
        console.log(newPost)

    } catch (error) {
        res.status(409).json({message : error.message})
    }
}

export const updatePost = async(req,res) => {
    const {id : _id } = req.params
    const post = req.body 

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('No post with the id')
}

const updatedPost = await PostMessage.findByIdAndUpdate(_id , {...post , _id} , {new : true}) // We need to send id along with post too 

res.status(200).json(updatedPost)
}

export const deletePost = async(req,res)=> {
       const {id} =req.params

       if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send('No post with the id')
}

await PostMessage.findByIdAndDelete(id)
//console.log('delete')
res.json({message : 'Post deleted successfully'})
}