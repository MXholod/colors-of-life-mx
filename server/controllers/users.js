import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './../models/user';

export const signin = async (req, res)=>{
  const { email, password } = req.body;
  if(!email || !password) return res.status(404).json({ message: 'User doesn\'t exist' });
  try{
    const existingUser = await User.findOne({ email });
    if(!existingUser){
      return res.status(404).json({ message: 'User doesn\'t exist' });
    }
    const isPasswordCorrect = bcrypt.compare(password, existingUser.password);
    if(!isPasswordCorrect){
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({
      email: existingUser.email,
      id: existingUser._id
    },'secret',{ expiresIn: '1h' });
    //Send the successfull data to the user
    return res.status(200).json({ message: 'User signed in', result: existingUser, token });
  }catch(e){
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

export const signup = async (req, res)=>{
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  if(!email || !password || !confirmPassword || !firstName || !lastName){
    return res.status(404).json({ message: 'You can\'t sign up' });
  }
  try{
    const existingUser = await User.findOne({ email });
    if(existingUser){
      return res.status(400).json({ message: 'User already exists' });
    }
    if(password !== confirmPassword) return res.status(400).json({ message: 'Passwords don\'t match' });
    //Hashing password
    const hashedPassword = await bcrypt.hash(password, 12);
    //Create a User
    const user = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`  
    });
    if(!user) return res.status(400).json({ message: 'User hasn\'t been created' });
    //Create a token
    const token = jwt.sign({
      email: user.email,
      id: user._id
    },'secret',{ expiresIn: '1h' });
    //Send the successfull data to the user
    return res.status(200).json({ message: 'User signed up', result: user, token });
  }catch(e){
    return res.status(500).json({ message: 'Something went wrong' });
  }
};