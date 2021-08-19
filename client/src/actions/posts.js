import * as api from './../api';
import { 
    FETCH_ALL_POST,
    FETCH_POST,
    CREATE_POST,
    UPDATE_POST,
    DELETE_POST,
    LIKE_POST,
    FETCH_BY_SEARCH,
    COMMENT_POST,
    START_LOADING,
    END_LOADING
 } from './../constants/actionTypes';
/*
//Action creator without 'redux-thunk'
const getPosts = ()=> {
    const action = { type: 'FETCH_ALL', payload: [] };
    return action;
}
//With 'redux-thunk'
const getPosts = ()=> async (dispatch)=> {
    const action = { type: 'FETCH_ALL', payload: [] };
    return action;
}
  The problem is we are working with asynchronous data to actually fetch all
the posts that's why we should use 'redux-thunk'
  'redux-thunk' allows us to use the 'async / await' capabilities, it wraps 
the content of the 'action cretor' with a function, this function contains 
'dispatch'
*/
//
const unauthorized = (e, dispatch, history)=>{
    if(e?.response?.status === 401){
        dispatch({ type: 'LOGOUT' });
        history.push('/');
    }
};
//Action Creators
export const getPost = (id)=> async (dispatch)=> {
    try{
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPost(id);
        dispatch({ type: FETCH_POST, payload: data.post });
        dispatch({ type: END_LOADING });
    }catch(e){
        //console.log(e.message);
    }
}
export const getPosts = (page)=> async (dispatch)=> {
    try{
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPosts(page);
        dispatch({ type: FETCH_ALL_POST, payload: data });
        dispatch({ type: END_LOADING });
    }catch(e){
        //console.log(e.message);
    }
}
export const getPostBySearch = (searchQuery)=> async (dispatch)=> {
    try{
        dispatch({ type: START_LOADING });
        const { data: { data } } = await api.fetchPostBySearch(searchQuery);
        //console.log("Data ",data);
        dispatch({ type: FETCH_BY_SEARCH, payload: data });
        dispatch({ type: END_LOADING });
    }catch(e){
        //console.log(e.message);
    }
}
export const createPost = (post, history)=> async (dispatch)=> {
    try{
        dispatch({ type: START_LOADING });
        const { data } = await api.createPost(post);
        dispatch({ type: CREATE_POST, payload: data });
        dispatch({ type: END_LOADING });
    }catch(e){
        //console.log(e.message);
        unauthorized(e, dispatch, history);
    }
}
export const updatePost = (id, post, history)=> async (dispatch)=> {
    try{
        const { data } = await api.updatePost(id, post);
        dispatch({ type: UPDATE_POST, payload: data });
    }catch(e){
        //console.log(e.message);
        unauthorized(e, dispatch, history);
    }
}
export const deletePost = (id, history)=> async (dispatch)=> {
    try{
        await api.deletePost(id);
        dispatch({ type: DELETE_POST, payload: id });
    }catch(e){
        //console.log(e.message);
        unauthorized(e, dispatch, history);
    }
}
export const likePost = (id, history)=> async (dispatch)=> {
    try{
        const {data} = await api.likePost(id);
        //console.log("Data ",data);
        dispatch({ type: LIKE_POST, payload: data });
    }catch(e){
        //console.log("Error ",e.message);
        unauthorized(e, dispatch, history);
    }
}

export const commentPost = (comment, postId)=> async (dispatch)=>{
    try{
        const { data } = await api.addComment(comment, postId);
        dispatch({ type: COMMENT_POST, payload: data});
        //console.log("Data ",data);
        if(data && data.updatedPost){
            return data.updatedPost.comments;
        }
    }catch(e){
        console.log(e);
    }
} 