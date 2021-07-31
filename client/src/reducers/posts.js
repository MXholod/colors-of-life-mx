import { 
  FETCH_ALL_POST,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  LIKE_POST,
  FETCH_BY_SEARCH
} from './../constants/actionTypes';

const initialState = [];

const posts = (state = initialState, action)=>{
  switch(action.type){
    case FETCH_ALL_POST: 
    return {
      ...state,
      posts: action.payload.data,
      currentPage: action.payload.currentPage,
      numberOfPages: action.payload.numberOfPages
    };
    case CREATE_POST: return [ ...state, action.payload ];
    case UPDATE_POST: return state.map( post => post._id === action.payload._id ? action.payload : post);
    case LIKE_POST: return state.map( post => post._id === action.payload.postUpdated._id ? action.payload.postUpdated : post);
    case DELETE_POST: return state.filter( post => post._id !== action.payload ? true : false);
    case FETCH_BY_SEARCH: return { ...state, posts: action.payload };
    default: return state;
  }
}

export default posts;