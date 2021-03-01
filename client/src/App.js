import React , {useEffect, useState} from 'react'
import {AppBar, Container, Grid, Grow, Typography} from '@material-ui/core'
import memories from './images/memories.png'
import Form from './components/Form/Form';
import Posts from './components/Posts/Posts';
import useStyles from './styles'
import {useDispatch} from 'react-redux'
import {  getPostsAction } from './actions/posts.js';

function App() {

  const classes = useStyles()
  const dispatch = useDispatch()
  const [currentID , setCurrentID] = useState(null)

  useEffect(() => {

      dispatch(getPostsAction())

  } , [currentID ,dispatch])

  return (
    <Container maxWidth = 'lg'>
      <AppBar className = {classes.appBar} position = 'static' color = 'inherit'>
        <Typography className = {classes.heading} variant = 'h2' align = 'center'>Memories</Typography>
        <img className = {classes.image} src={memories} alt="memories" height = '60' />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container className = {classes.mainContainer} justify = 'space-between' alignItems = 'stretch' spacing = {4}>
            <Grid item xs = {12} sm ={7}>
               <Posts currentID = {currentID} setCurrentID = {setCurrentID}/>
            </Grid>
            <Grid item xs = {12} sm ={4}>
              <Form currentID = {currentID} setCurrentID = {setCurrentID}/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;
