import React from 'react';
import { useSelector } from 'react-redux';
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
        <>
            <h1>Posts</h1>
            <Post />
            <Post />
        </>
    );
};

export default Posts;