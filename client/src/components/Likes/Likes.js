import React from 'react';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import { ThumbUpAltOutlined } from '@material-ui/icons';

const Likes = ({ user, post })=>{

  const likesLength = post.likes.length;
    if(likesLength > 0){
      return post.likes.find( like => like === (user?.result?.googleId || user?.result?._id) )
      ? (<>
        <ThumbUpAltIcon fontSize="small" />&nbsp;{ likesLength > 2 ? `You and ${likesLength - 1} others` : `${likesLength} like${likesLength > 1 ? 's' : ''}` }
      </>)
      : (<>
        <ThumbUpAltOutlined fontSize="small" />&nbsp;{likesLength} { likesLength === 1 ? 'Like' : 'Likes'}
      </>)
    }
    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>
};

export default Likes;