import User from "../models/user.js";
import bcrypt from "bcryptjs";

//Update an user

export const updateUser = async (req,res,next)=>{
  try {
    let updateBody = {...req.body};
    if (req.body.password) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      updateBody = { ...updateBody, password: hash };
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateBody },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
}

//Delete an user

export const deleteUser = async (req,res,next)=>{
  try {
    console.log(req.params.id);
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
}

//Get an user

export const getUser = async (req,res,next)=>{
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}

//Get random user

export const getRandomUser = async (req,res,next)=>{
  try {
    const users = await User.find();
    const randomIndex = Math.floor(Math.random() * users.length);
    const user = users[randomIndex];
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}

//Get all user

export const getAllUser = async (req,res,next)=>{
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}