import { Button, Paper, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import useStyles from './styles.js'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import { createPostAction, updatePostAction } from '../../actions/posts.js'

const Form = ({setCurrentID , currentID}) => {

    const [postData , setPostData] = useState({creator : '' , title : '' , message : '' , tags : '' , selectedFile : '' })
    const classes = useStyles()
    const dispatch = useDispatch()
    const post = useSelector((state) => currentID ? state.posts.find((post) => post._id === currentID) : null  )

    const handleSubmit = (event) => {
       event.preventDefault()

       if(currentID){
       dispatch(updatePostAction(currentID , postData))
       //console.log('FORM' , currentID ,postData )
       clear()
       }
       else{
       //console.log('form dispatch done' , postData)
       dispatch(createPostAction(postData))
       clear()
       setTimeout(() => {window.location.reload()} , 1000)
    }
    

}

    const clear = () => {
        setCurrentID(null)
        setPostData({creator : '' , title : '' , message : '' , tags : '' , selectedFile : '' })
    }

    useEffect(() => {
        
        if(post){
            setPostData(post)
        }


    } , [post])

    return (
        <Paper className = {classes.paper}>
            <form autoComplete = 'off' noValidate className = {`${classes.root} ${classes.form}`} onSubmit = {handleSubmit}>
              <Typography variant = 'h6'>{currentID ? 'Editing' : 'Creating'} Memories</Typography>
              <TextField name = 'creator' variant = 'outlined' label = 'Creator' fullWidth value = {postData.creator} onChange ={(event) => setPostData({ ...postData , creator : event.target.value})} />
              <TextField name = 'title' variant = 'outlined' label = 'Title' fullWidth value = {postData.title} onChange ={(event) => setPostData({ ...postData , title : event.target.value})} />
              <TextField name = 'message' variant = 'outlined' label = 'Message' fullWidth value = {postData.message} onChange ={(event) => setPostData({ ...postData , message : event.target.value})} />
              <TextField name = 'tags' variant = 'outlined' label = 'Tags' fullWidth value = {postData.tags} onChange ={(event) => setPostData({ ...postData , tags : event.target.value.split(',')})} />
            <div className = {classes.fileInput}>
                <FileBase type = 'file' multiple = {false} onDone = {({base64}) => setPostData({...postData , selectedFile: base64})} />
            </div>
            <Button className = {classes.buttonSubmit} variant = 'contained' color = 'primary' size = 'large' type = 'submit' onSubmit= {handleSubmit} fullWidth>Submit</Button>
            <Button  variant = 'contained' color = 'secondary' size = 'small' onClick = {clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form
