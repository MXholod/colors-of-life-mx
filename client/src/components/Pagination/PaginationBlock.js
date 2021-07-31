import React, { useEffect } from 'react';
//import { Pagination, PaginationItem } from '@material-ui/lab';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import useStyles from './styles';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from './../../actions/posts';

const PaginationBlock = ({ page })=>{
  const classes = useStyles();
  const dispatch = useDispatch();
  const { numberOfPages } = useSelector( state => state.posts );

  useEffect(()=>{
    //Pass getPosts() to the Reducer
    dispatch(getPosts(page));
  },[page]); //dispatch [currentId, dispatch]

  return (
    <Pagination 
      classes={ { ul: classes.ul } }
      count={ numberOfPages }
      page={ Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={ (item)=> (
        <PaginationItem  { ...item } component={ Link } to={ `/posts?page=${item.page}` } />
      ) }
    />
  );
};

export default PaginationBlock;