import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useHistory } from 'react-router';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { likePost, deletePost } from './../../../actions/posts';
import Likes from './../../Likes/Likes';

const Post = ({ post, setCurrentId })=>{
  const dispatch = useDispatch();
  const classes = useStyles();
  //This state needs when 'Likes' mounted or changes the state when dispatch() 
  const [postLikeInitial, setPostLikeInitial] = useState(false);
  //This state always changes when clicking 'Likes' button in child 
  const [postLikeEachChange, setPostLikeEachChange] = useState(false);
  //Get User from the Local Storage
  const user = JSON.parse(localStorage.getItem('profile'));
  const userId = (user?.result?.googleId || user?.result?._id);
  const history = useHistory();
  
  const openPost = (e)=>{
    history.push(`/posts/${post._id}`);
  }
  //It calls when 'Likes' componentDidMount and componentDidUpdate
  const likeWatcherHandler = (likeState, onMount = false)=>{
    //'likeState' will be changed if 'postLike' is different from it
    //Changes each time when click on 'like' button
    setPostLikeEachChange(likeState);
    //Works only if 'Likes' componentDidMount
    if(onMount){
      setPostLikeInitial(likeState);
    }
  }
  //Calls when leaves a post limits
  const leavePostHandler = (e)=>{
    //Compare like state. If they are different - dispatch() the data. If not do nothing
    if(postLikeInitial !== postLikeEachChange){
      //Set new state according to the changed state of 'Likes' component 
      setPostLikeInitial(postLikeEachChange);
      //Send an action
      dispatch(likePost(post._id, history));
    }
  }

    return (
      <Card className={ classes.card } raised elevation={6} onMouseLeave={ leavePostHandler }>
        <ButtonBase className={ classes.cardActionsTop } onClick={ openPost }></ButtonBase>
        <CardMedia 
          className={ classes.media }
          image={ post.selectedFile } 
          title={ post.title }
        />
        <div className={ classes.overlay }>
          <Typography variant="h6" className={ classes.name }>{ post.name }</Typography>
          <Typography variant="body2">{ moment(post.createdAt).fromNow() }</Typography>
        </div>
        { (userId === post?.creator || userId === post?.creator) && (
          <div className={ classes.overlay2 }>
            <Button 
              style={ {color: 'white'} }
              size="small"
              onClick={ ()=>{ setCurrentId(post._id) } }
            >
              <MoreHorizIcon fontSize="default" />
            </Button>
          </div>
        )}
        <div className={ classes.details }>
          <Typography variant="body2" color="textSecondary">
            { post.tags.map( tag => `#${tag} ` ) }
          </Typography>
        </div>
        <Typography className={ classes.title } variant="h5" gutterBottom>
            { post.title }
          </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            { post.message }
          </Typography>
        </CardContent>
        <CardActions className={ classes.cardActions }>
      
        <Likes userId={userId} post={post} likeWatcher={ likeWatcherHandler } />
        
          { (userId === post?.creator || userId === post?.creator) && (
            <Button size="small" color="primary" onClick={ ()=>{ 
              dispatch(deletePost(post._id, history));
            } }>
              <DeleteIcon fontSize="small" />
              Delete
            </Button>
          )}
        </CardActions>
      </Card>
  );
};

export default Post;