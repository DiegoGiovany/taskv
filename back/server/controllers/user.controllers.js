'use strict';
const jwt = require('jsonwebtoken');
const User = require('../models/user.models');


exports.postLogin = async (req, res) => {
  const user=req.body || undefined;
  const findUsers=await User.find({ email: req.body.email, password: req.body.password });

    if(findUsers.length == 0) {
     return  res.status(401).send('Fail to Login');
  } else {
        const currentUser = { ...findUsers[0]._doc };
        const token = jwt.sign({ ...currentUser } ,  process.env.JWT_SECRET_KEY || 'NotSoSecretKey');
        const answerUser= {...findUsers[0]._doc }
        answerUser.password=undefined
        res.json({...answerUser, token});
  }
}
exports.postSubscribe = async (req, res) => {
  const findUsers=await User.find({ email: req.body.email });
  if(findUsers.length > 0) {
     return res.status(401).json({message: `Can't create user with email: ${req.body.email}`})
  }
  (new User(req.body)).save();
  return res.status(201).json({message: 'User Created'})
}




// exports.getUsers = (req, res) => {
//   try {
//     const data = userModel.reading_room;
//     res.status(200);
//     res.send(JSON.stringify(data));
//   } catch (error) {
//     res.sendStatus(500);
//   }
// };
// exports.postUser = async (req, res) => {
//   try {
//     const newUser = await userModel.reading_room.push(newUser);
//     res.status(201);
//     res.send(JSON.stringify(newUser));
//   } catch (error) {
//     res.sendStatus(500);
//   }
// };
