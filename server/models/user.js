import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["Marketing", "Client", "Technique"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("User", userSchema);