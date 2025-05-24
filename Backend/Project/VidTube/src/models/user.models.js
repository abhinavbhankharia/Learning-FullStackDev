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

const useSchema = new Schema(
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

export const User = mongoose.model("User", userSchema);

//mongoose will create a documnet in MongoDB with this structure, if it doesnt exist it will go ahead and create the document
//mongoose builds a new structure and document in my daata named "User" and sturuture to be followed is userSchema
//userSchema is to be defined which will be followed by the MongoDB
//MongoDB automatically creates a _id field for every document, which is unique
