import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory } from 'react-router';
import { getPost, getPostBySearch } from './../../actions/posts';
import Comments from './Comments/Comments';

import useStyles from './styles';

const PostDetails = ()=>{
  const { post, posts, isLoading } = useSelector(state => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  // http://localhost:3000/posts/60de15b7cc05213d78f84227 - id
  const { id } = useParams();

  useEffect(()=>{
    dispatch(getPost(id));
  },[id]);
  
  /*useEffect(()=>{
    if(post){
      dispatch(getPostBySearch({ search: 'none', tags: post?.tags.join(',') }));
    }
  },[post]);*/

  if(!post) return null;

  if(isLoading){
    return (
      <Paper elevation={6} className={ classes.loadingPaper }>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

const recomendedPosts = posts.filter( item => item._id !== post._id );

const openPost = (id) => history.push(`/posts/${id}`);

  return (
    <Paper style={ {padding: '20px', borderRadius: '15px' } } elevation={6}>
      <div className={ classes.card }>
        <div className={ classes.section }>
          <Typography variant="h3" component="h2">{ post.title }</Typography>
          <Typography variant="h6" component="h2" color="textSecondary">{ post.tags.join('#') }</Typography>
          <Typography variant="body1" component="p">{ post.message }</Typography>
          <Typography variant="h6">Created by: { post.name }</Typography>
          <Typography variant="body1">{ moment(post.created_at).fromNow() }</Typography>
          <Divider style={ {margin: '20px 0'} } />
          <Typography variant="body1"><strong>Chat coming soon</strong></Typography>
          <Divider style={ {margin: '20px 0'} } />
          <Comments post={ post } />
          <Divider style={ {margin: '20px 0'} } />
        </div>
        <div className={ classes.imageSection }>
          <img src={ post.selectedFile } className={ classes.media } alt="" />
        </div>
      </div>
      { recomendedPosts.length && (
        <div className={ classes.section }>
          <Typography gutterBottom variant="h5">You might also like:</Typography>
          <Divider />
          <div className={ classes.recomendedPosts }>
            { recomendedPosts.map( ({ title,message,name, likes, selectedFile,_id  })=>(
              <div style={ { margin: '20px', cursor: 'pointer' } } onClick={ ()=>{
                openPost(_id);
              }} key={_id}>
                <Typography gutterBottom variant="h6">{ title }</Typography>
                <Typography gutterBottom variant="subtitle2">{ name }</Typography>
                <Typography gutterBottom variant="subtitle2">{ message }</Typography>
                <Typography gutterBottom variant="subtitle1">{ likes.length }</Typography>
                <img src={ selectedFile } alt="" width="100" />
              </div>
            ) ) }
          </div>
        </div>
      ) }
    </Paper>
  );
};

export default PostDetails;