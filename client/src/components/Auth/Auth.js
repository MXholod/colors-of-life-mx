import React, { useState } from 'react';
import { Avatar, Button, Paper, Container, Typography, Grid } from '@material-ui/core';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';

const Auth = ()=>{
  const styles = useStyles();
  //Show password or hide
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = (e)=>{

  };
  const handleChange = (e)=>{

  };
  const handleShowPassword = ()=>{
    setShowPassword( passwordState => !passwordState );
  };
  //Switch between 'Sign In' and 'Sign Up'
  const switchMode = ()=>{
    setIsSignUp( formModeState => !formModeState);
    //handleShowPassword(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={ styles.paper } elevation={3}>
        <Avatar className={ styles.avatar }>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">
          { isSignUp ? 'Sign up' : 'Sign in' }
        </Typography>
        <form className={ styles.form } onSubmit={ handleSubmit }>
          <Grid container spacing={2}>
            {
              isSignUp && (
                <>
                  <Input 
                    name="firstName" 
                    label="First name"
                    autoFocus
                    half
                    handleChange={ handleChange }
                    />
                  <Input 
                    name="lastName" 
                    label="Last name"
                    half
                    handleChange={ handleChange }
                  />
                </>
              )
            }
            <Input 
              name="email"  
              label="Email address"
              handleChange={ handleChange }
              type="email"
            />
            <Input 
              name="password"  
              label="Password"
              handleChange={ handleChange }
              type={ showPassword ? 'text' : 'password' }
              handleShowPassword={ handleShowPassword }
            />
            { 
              isSignUp && <Input 
                            name="confirmPassword" 
                            label="Repeat password"
                            handleChange={ handleChange }
                            type="password"
                          /> 
            }
          </Grid>
          <Button 
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={ styles.submit }
          >
            { isSignUp ? 'Sign up' : 'Sign in' }
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={ switchMode }>
                { isSignUp ? 'Already have an account? Sign in' : 'Don\'t have an account? Sign up' }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;