/*  owner ObjectId users
    videoFile string
    thumbnail string
    title string
    description string
    duration number
    views number
    isPublished boolean
    createdAt Date
    updatedAt Date 
*/

import mongoose, { Schema } from "mongoose"; //destructuring Schema
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
  {
    videoFile: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublished:{
        type: Boolean,
      default: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
  },
  { timeStamps: true } //defining timestamps object which automatically adds "createdAt" & "updatedAt" fields of type Date
);

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", videoSchema);
