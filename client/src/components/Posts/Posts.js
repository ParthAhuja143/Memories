import React from 'react'
import Post from './Post/Post.js'
import useStyles from './styles.js'
import {useSelector} from 'react-redux'
import { Grid } from '@material-ui/core'

const Posts = ({setCurrentID}) => {

    const classes = useStyles()
    const posts = useSelector((state) => state.posts)
    //console.log(posts)

    return (
        !posts.length ?(<h1 style = {{color : 'white', fontFamily : 'sans-serif'}}> No Memories :( </h1>): (
            <Grid className = {classes.mainContainer} container alignItems = 'stretch' spacing = {3}>
              {posts.map((post) => (
                  <Grid key = {post._id} xs = {12} sm = {6} item>
                      <Post post = {post} setCurrentID = {setCurrentID}/>
                  </Grid>
              ))}
            </Grid>
        )
    )
}

export default Posts
