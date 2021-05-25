const initialState = [];

const posts = (state = initialState, action)=>{
  switch(action.type){
    case "FETCH_ALL": return action.payload;
    case "CREATE_POST": return [ ...state, action.payload ];
    case "UPDATE_POST": return state.map( post => post._id === action.payload._id ? action.payload : post);
    case "LIKE_POST": return state.map( post => post._id === action.payload.postUpdated._id ? action.payload.postUpdated : post);
    case "DELETE_POST": return state.filter( post => post._id !== action.payload ? true : false);
    default: return state;
  }
}

export default posts;