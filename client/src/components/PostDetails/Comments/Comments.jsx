import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { commentPost } from './../../../actions/posts';
import useStyles from './styles';

const Comments = ({ post })=>{
  const classes = useStyles();
  const [ comments, setComments ] = useState(post?.comments);
  const [ commentText, setCommentText ] = useState('');
  //Get user from localStorage
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  const commentsRef = useRef();

  const addComment = async (e)=>{
    const preparedComment = `${ user.result.name }: ${ commentText }`;
    //Pass to Redux
    const newComments = await dispatch(commentPost(preparedComment, post._id));
    //Update local comments state
    setComments(newComments);
    //Clear current comment
    setCommentText('');
    //
    commentsRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div>
      <div className={ classes.commentsOuterContainer }>
        { user?.result?.name && (
          <div style={ {width: '70%'} }>
            <Typography gutterBottom variant="h6">Write a comment</Typography>
            <TextField 
              fullWidth
              rows={ 4 }
              variant="outlined"
              label="Comment"
              multiline
              value={ commentText }
              onChange={ (e)=> setCommentText(s => s = e.target.value) }
            />
            <Button 
              style={ {marginTop: '10px'} }
              fullWidth
              disabled={ !commentText }
              variant="contained"
              onClick={ addComment }
            >
              Add comment
            </Button>
          </div>
        ) }
        <div className={ classes.commentsInnerContainer }>
          <Typography gutterBottom variant="h6">Comments</Typography>
          {
            comments.map( (comment, ind) => (
              <Typography key={ind} gutterBottom variant="subtitle1">
                <b>{ comment.split(': ')[0] }</b>
                { comment.split(':')[1] }
              </Typography>
            ) )
          }
          <div ref={ commentsRef } />
        </div>
      </div>
    </div>
  );
}

export default Comments;