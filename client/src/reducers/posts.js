import { 
  FETCH_POST,
  FETCH_ALL_POST,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  LIKE_POST,
  FETCH_BY_SEARCH,
  COMMENT_POST,
  START_LOADING,
  END_LOADING
} from './../constants/actionTypes';

const initialState = { isLoading: true, posts: [] };

const posts = (state = initialState, action)=>{
  switch(action.type){
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL_POST: 
    return {
      ...state,
      posts: action.payload.data,
      currentPage: action.payload.currentPage,
      numberOfPages: action.payload.numberOfPages
    };
    case CREATE_POST: return { ...state, posts: [ ...state.posts, action.payload] };
    case UPDATE_POST: return { ...state, posts: state.posts.map( post => post._id === action.payload._id ? action.payload : post) };
    case LIKE_POST: return { ...state, posts: state.posts.map( post => post._id === action.payload.postUpdated._id ? action.payload.postUpdated : post) };
    case COMMENT_POST: return {
      ...state, posts: state.posts.map( post => {
        if(post._id === action.payload._id){
          return action.payload;
        }else{
          return post;
        }
      })
    }
    case DELETE_POST: return {...state, posts:  state.posts.filter( post => post._id !== action.payload ? true : false) };
    case FETCH_POST: return { ...state, post: action.payload };
    case FETCH_BY_SEARCH: return { ...state, posts: action.payload };
    default: return state;
  }
}

export default posts;