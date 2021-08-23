import React, { useState, useEffect } from 'react';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import { Button } from '@material-ui/core';
import { ThumbUpAltOutlined } from '@material-ui/icons';
import usePrev from './../../hooks/usePrevious';

const Likes = ({ userId, post, likeWatcher })=>{

  //Into 'likes' we add user 'id' or if it is already there delete it.  
  const [likes, setLikes] = useState(post?.likes);
  //false - zero likes, true - one like
  const [isLiked, setIsLiked] = useState(false);
  //const prevLike = useRef();

  const handleLikeClick = (e)=>{
    //false - zero likes, true - one like
    let isLikedPost = !!likes.find( like => like === userId );
    //If 'like' is absent
    if(!isLikedPost){
      setLikes([ ...likes, userId ]);
    }else{
      setLikes(likes.filter( likeId => likeId !== userId ));
    }
    //Update previous data
    setIsLiked(!isLikedPost);
    //Call parent function
    likeWatcher(!isLikedPost);
  }
  //componentDidMount - It is called only once
  useEffect(()=>{
    //false - zero likes, true - one like
    let isLikedPost = !!likes.find( like => like === userId );
    //Set initial state
    setIsLiked(isLikedPost);
    //Call parent function. Here is only on componentDidMount
    likeWatcher(isLikedPost, true);
  },[]);
  //componentDidmount, componentDidUpdate
  /*useEffect(()=>{
    prevLike.current = isLiked;
  }, [ isLiked ]);*/
  //Use custom hook
  usePrev(isLiked);

  const likesLength = likes.length;
    if(likesLength > 0){
      let likeJSX = null; 
      likeJSX = likes.find( like => like === userId )
      ? (<>
        <ThumbUpAltIcon fontSize="small" />&nbsp;{ likesLength > 2 ? `You and ${likesLength - 1} others` : `${likesLength} like${likesLength > 1 ? 's' : ''}` }
        </>)
      : (
        <>
        <ThumbUpAltOutlined fontSize="small" />&nbsp;{likesLength} { likesLength === 1 ? 'Like' : 'Likes'}
        </>)
      return <Button size="small" color="primary" 
                disabled={ !userId }
                onClick={ handleLikeClick }>
                { likeJSX }
              </Button>;
    }
    return (<Button size="small" color="primary" 
              disabled={ !userId }
              onClick={ handleLikeClick }>
              <ThumbUpAltOutlined fontSize="small" />&nbsp;Like
            </Button>);
};

export default Likes;