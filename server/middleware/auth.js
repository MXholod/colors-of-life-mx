import jwt from 'jsonwebtoken';

const auth = async (req, res, next)=>{
  try{
    //If token is valid after 'sign in' or 'sign up'. Get the token from the Front-end
    const token = req.headers.authorization.split(" ")[1];
    //Here we have two kinds of tokens: Google OAuth and our own
    const isCustomAuth = token.length < 500;//If less than 500 it's our own
    let decodedData;
    //If token exists and it's our own
    if(token && isCustomAuth){
      decodedData = jwt.verify(token, 'secret');
      //Add User data to 'req'
      req.userId = decodedData?.id;
    }else{
      //Google OAuth token
      decodedData = jwt.decode(token);
      //Add User data to 'req'. 'sub' is a Google's name for a specific 'id'
      req.userId = decodedData?.sub;
    }
    //For example: User have permissons to like a Post then go to 'like controller'
    next();
  }catch(e){
    console.log(e);
  }
}

export default auth;