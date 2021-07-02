import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Typography, Toolbar, Button } from '@material-ui/core';
import decode from 'jwt-decode';
import Rainbow from './../../images/Rainbow.jpg';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { LOGOUT } from './../../constants/actionTypes';

const Navbar = ()=>{
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  
  useEffect(()=>{
    const token = user?.token;//If token exists
    if(token){
      const decodedToken = decode(token);
      //'decodedToken.exp' - milisec;
      if((decodedToken.exp * 1000) < new Date().getTime()){
        userLogout();
      }
    }
    setUser(JSON.parse(localStorage.getItem('profile')));
  },[location]);

  const userLogout = ()=>{
    dispatch({ type: LOGOUT });
    setUser(null);
    history.push('/');
  };

  return (
    <AppBar className={ classes.appBar } position="static" color="inherit">
      <div className={ classes.brandContainer }>
        <Typography component={ Link } to="/" className={ classes.heading } variant="h2" align="center"> Colors of life</Typography>
        <img className={ classes.image } src={ Rainbow } alt={''} height="60" />
      </div>
      <Toolbar className={ classes.toolbar }>
        {
          user ? (
            <div className={ classes.profile }>
              <Avatar className={ classes.purple } 
                alt={ user.result.name }
                src={ user.result.imageUrl }
              >
                { user.result.name.charAt(0) }
              </Avatar>
              <Typography className={ classes.userName } variant="h6">{ user.result.name }</Typography>
              <Button variant="contained" className={ classes.logout } color="secondary" onClick={ userLogout }>
                Logout
              </Button>
            </div>
          ) : (
            <Button component={ Link } to="/auth" variant="contained"  color="primary">
              Sign in
            </Button>
          )
        }
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;