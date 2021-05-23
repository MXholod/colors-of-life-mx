import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';
import Post from './Post/Post';
import useStyles from './styles';

const Posts = ()=>{
    const classes = useStyles();
    //The state is the whole global Redux store
    const posts = useSelector((state)=>{
        //'posts' - from 'combineReducers({ posts: posts })' where it's a key 
        return state.posts;
    });
    console.log("Posts ",posts);
    return (
      !posts.length ? <CircularProgress /> : (
          <Grid className={ classes.container } 
            container
            alignItems="stretch"
            spacing={3}
          >
          { posts.map( post => (
            <Grid key={post._id} item xs={12} sm={6}>
              <Post post={post} />
            </Grid>))}
        </Grid>
      )
    );
};

export default Posts;