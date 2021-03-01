
import {fetchPosts  , updatePost , deletePost, createPost}  from '../api/index.js'

//Action Creators

export const getPostsAction = () => async (dispatch) => {
    try {
        
        const {data} = await fetchPosts()
        //console.log(data)
        dispatch({type : 'FETCH_ALL' , payload : data})

    } catch (error) {
        console.log(error)
    }
}

export const createPostAction = (post) => async(dispatch) => {
    try {

        const response = createPost(post)
        dispatch({type : 'CREATE' , payload : response.data})
        const {data} = await fetchPosts()
        //console.log(data)
        dispatch({type : 'FETCH_ALL' , payload : data})
        
    } catch (error) {
        console.log(error)
    }
}

export const updatePostAction = (id , post ) => async (dispatch) => {
    try {

        const {data} = await updatePost(id , post)
        dispatch({type : 'UPDATE' , payload: data})
        
    } catch (error) {
        console.log(error)
    }

}

export const deletePostAction = (id) => async(dispatch) => {
    try {
        
        await deletePost(id)
        dispatch({type : 'DELETE' , payload : id})
        const response = await fetchPosts()
        console.log(response , 'response')
    } catch (error) {
        console.log(error)
    }
}