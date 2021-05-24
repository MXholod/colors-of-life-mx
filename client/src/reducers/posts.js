const initialState = [];

const posts = (state = initialState, action)=>{
  switch(action.type){
    case "FETCH_ALL": return action.payload;
    case "CREATE_POST": return [ ...state, action.payload ];
    case "UPDATE_POST": return state.map( post => post._id === action.payload._id ? action.payload : post);
    default: return state;
  }
}

export default posts;