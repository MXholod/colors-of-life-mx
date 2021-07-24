import React from 'react';
import { Container } from '@material-ui/core';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

const App = ()=>{
  const user = JSON.parse(localStorage.getItem('profile'));
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route path="/" exact component={ ()=>{
            return (<Redirect to="/posts" />);
          } } />
          <Route path="/posts" exact component={ Home } />
          <Route path="/posts/search" component={ Home } />
          <Route path="/posts/:id" component={ PostDetails } />
          <Route path="/auth" component={ ()=>{
            return !user ? <Auth /> : <Redirect to="/posts" />
          } } />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;