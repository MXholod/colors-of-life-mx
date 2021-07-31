import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use( req => {
  if(localStorage.getItem('profile')){
    req.headers.Authorization = `Bearer ${ JSON.parse(localStorage.getItem('profile')).token }`;
  }
  //Interceptors must return Request to make all the future Requests below
  return req;
});

/*// Add a 401 response interceptor
API.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (401 === error.response.status) {
    //console.log("Error ",error.response);
    return error.response;
      // handle error: inform user, go to login, etc
  } else {
    return Promise.reject(error);
  }
  //return error;
});*/

//Posts
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);

export const fetchPostBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);

export const createPost = (newPost) => API.post('/posts', newPost);

export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

//Auth
export const signIn = (formData)=> API.post('/users/signin', formData);

export const signUp = (formData)=> API.post('/users/signup', formData);