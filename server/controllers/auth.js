import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const createAllUser = async (req, res, next) => {
  try {
    const users = req.body;
    const newUsers = [];

    for (const user of users) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(user.password, salt);

      const newUser = new User({
        ...user,
        password: hash,
      });
      newUsers.push(newUser);
    }

    await User.insertMany(newUsers);
    res.status(200).send("Users have been created.");
  } catch (err) {
    next(err);
  }
};

// Create an user

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    console.log('salt:', salt)
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};

// Login 

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found !"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    console.log('isPasswordCorrect:', isPasswordCorrect)

    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username !"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: false,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};