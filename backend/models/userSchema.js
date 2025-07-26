
// const userSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },              
//     password: { type: String, required: true },
//     createdAt: { type: Date, default: Date.now },// Default value for createdAt 
//     updatedAt: { type: Date, default: Date.now }//
// }, { timestamps: true }); // Automatically manage createdAt and updatedAt fields    
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, "Name must contain at least 3 character!"],
    maxLength: [32, "Name cannot exceed 32 character!"],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please provide a valid email!"],
  },
  phone: {
    type: Number,
    required: true,
  },
  avatar: {
    public_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
  },
  education: {
    type: String,
    required: true,
  },
  // here we want three roles: Reader, Author, Admin
  // now 
  role: {
    type: String,
    required: true,
    enum: ["Reader", "Author"],
    // default: "Reader", // Default role is Reader
    // enum: ["Reader", "Author","Admin"],
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password must contain at least 8 character!"],
    maxLength: [32, "Password cannot exceed 32 character!"],
    select: false,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to hash password before saving user

userSchema.pre("save", async function () {// This function runs before saving the user document
  // If the password is not modified, skip hashing
  if (!this.isModified("password")) {
    next();
  }
    // Hash the password using bcrypt
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

export const User = mongoose.model("User", userSchema);

