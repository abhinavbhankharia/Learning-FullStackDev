/*
users [icon: user] {
    id string pk
    username string
    email string
    fullName string
    avatar string
    coverImage string
    watchHistory ObjectId[] videos
    password string
    refreshToken string
    createdAt Date
    updatedAt Date
  }
*/

import mongoose, { Schema } from "mongoose"; //destructuring Schema
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },
    avatar: {
      type: String,
      required: true,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "password is required"], //required field with error message
    },
    refreshToken: {
      type: String,
    },
  },
  { timeStamps: true }      //defining timestamps object which automatically adds "createdAt" & "updatedAt" fields of type Date

);


//when you wwant some methods that are only attahced to the model and you dont want to put them in controllers

userSchema.pre("save", async function (next){

    if (!this.isModified("password")) return next()       //if the modified field is not password then exit this function
        //updating the password only in case of any modification and avoid runnning this encryption every time
        //if password is modified then password is first encyprted and then saved 
    this.password = bcrypt.hash(this.password, 10)

    next()
})

userSchema.methods.isPasswordCorrect = async function(password){

    return await bcrypt.compare(password, this.password)

}

userSchema.methods.generateAccessToken = function () {
    //short lived access token

    return jwt.sign(
      {
        _id: this._id, //key value pair
        email: this.email,
        username: this.username,
        fullname: this.fullname,
      },
      process.env.ACCESS_TOKEN_SECRET, //secret

      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
}

userSchema.methods.generateRefreshToken = function () {
  //short lived refresh token

  return jwt.sign(
    {
      _id: this._id, //key value pair
    },
    process.env.REFRESH_TOKEN_SECRET, //secret

    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};


export const User = mongoose.model("User", userSchema);

//mongoose will create a documnet in MongoDB with this structure, if it doesnt exist it will go ahead and create the document
//mongoose builds a new structure and document in my daata named "User" and sturuture to be followed is userSchema
//userSchema is to be defined which will be followed by the MongoDB
//MongoDB automatically creates a _id field for every document, which is unique
