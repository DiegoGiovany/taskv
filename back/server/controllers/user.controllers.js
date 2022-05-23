'use strict';
const jwt = require('jsonwebtoken');
const User = require('../models/user.models');
const md5 = require('md5');

exports.postLogin = async (req, res) => {
  const user=req.body || undefined;
  const findUsers=await User.find({ email: req.body.email, password: md5(req.body.password) });

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
  (new User({...req.body,password:md5(req.body.password)} )).save();
  return res.status(201).json({message: 'User Created'})
}

