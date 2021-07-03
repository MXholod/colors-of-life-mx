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
      const clockTimestamp = Math.floor(new Date().getTime() / 1000);
      jwt.verify(token, 'secret', { clockTimestamp }, function(err, decoded){
        if(err) return res.status(401).json({ message: "You are unauthorized" });
        if(decoded && decoded.id){
          //Add User data to 'req'
          req.userId = decoded.id;
          next();
        }else{
          return res.status(401).json({ message: 'Unauthorized' });
        }
      });
    }else{
      //Google OAuth token
      decodedData = jwt.decode(token);
      //Add User data to 'req'. 'sub' is a Google's name for a specific 'id'
      req.userId = decodedData?.sub;
      //For example: User have permissons to like a Post then go to 'like controller'
      if(req.userId) next();
    }
  }catch(e){
    console.log(e);
  }
}

export default auth;