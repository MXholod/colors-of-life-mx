import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPostBySearch } from './../../actions/posts';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import useStyles from './styles';
import Posts from './../Posts/Posts';
import Form from './../Form/Form';
import PaginationBlock from '../Pagination/PaginationBlock';
import  { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

function useQuery(){
  return new URLSearchParams(useLocation().search);
}

const Home = ()=>{
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  const query = useQuery();
  const history = useHistory();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);

const handleKeyPress = (e)=>{
  if(e.keyCode === 13){//That's 'Enter'
    searchPost();
  }
};
const addTag = (tag)=>{
  setTags( s => [...s, tag]);
};
const deleteTag = (tag)=>{
  setTags( s => s.filter(t => t !== tag));
};
//Searching post
const searchPost = ()=>{
  if(search.trim() || tags){
    //Dispatch - fetch search post
    dispatch(getPostBySearch({ search, tags: tags.join(',') }));
    //Go to the searching Post. Create URL on client side.
    history.push(`posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
  }else{
    history.push('/');
  }
};
  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid container className={ classes.mainContainer } justify="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={ setCurrentId } />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={ classes.appBarSearch } position="static" color="inherit">
              <TextField 
                name="search" 
                variant="outlined" 
                label="Colors of life" 
                fullWidth 
                value={ search } 
                onChange={ (e)=>{ 
                  setSearch( s => s = e.target.value); 
                } }
                onKeyPress={ handleKeyPress }
              />
              <ChipInput
                style={ {margin: '10px 0'} }
                value={ tags }
                onAdd={ addTag }
                onDelete={ deleteTag }
                variant="outlined" 
                label="Search tags"
              />
              <Button 
                onClick={ searchPost }
                className={ classes.searchButton }
                color="primary"
                variant="contained"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={ currentId } setCurrentId={ setCurrentId } />
            { (!searchQuery && !tags.length) && (
              <Paper elevation={ 6 } className={ classes.pagination }>
                <PaginationBlock page={ page } />
              </Paper>
            ) }
          </Grid>
        </Grid>
      </Container>
    </Grow>    
  );
};

export default Home;