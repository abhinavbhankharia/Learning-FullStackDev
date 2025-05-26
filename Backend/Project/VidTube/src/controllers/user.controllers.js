import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.models.js"
import {uploadOnCloudinary, deleteFromCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const registerUser = asyncHandler( async(req, res) => {
    const {fullname, email, username, password} = req.body

    //validation for all the fields at once
    if(
        [fullname, username, email, password].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{username},{email}]
    })
    if (existedUser) {
        throw new ApiError(409, "User email or username already exits"); 
    }

    const avatarLocalPath = req.files?.avatar?.[0]?.path
    const coverLocalPath = req.files?.coverImage?.[0]?.path

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is missing"); 
    }

    /* const avatar = await uploadOnCloudinary(avatarLocalPath)
    let coverImage = ""
    if (coverLocalPath) {
        coverImage = await uploadOnCloudinary(avatarLocalPath);
    } */
    
    let avatar;
    try {
        avatar = await uploadOnCloudinary(avatarLocalPath);
        console.log("Uploaded avatar ", avatar );
        
    } catch (error) {
        console.log("Error uploading avatar ", error);
        throw new ApiError(500, "Failed to upload avatar");
        
    }

    let coverImage;
    try {
      coverImage = await uploadOnCloudinary(coverLocalPath);
      console.log("Uploaded CoverImage ", coverImage);
    } catch (error) {
      console.log("Error uploading CoverImage ", error);
      throw new ApiError(500, "Failed to upload CoverImage");
    }

    try {
        //creating user in the database
        const user = await User.create({     //as this is a database operation we use await
            fullname,
            avatar: avatar.url,
            coverImage: coverImage?.url || "",
            password,
            username: username.toLowerCase()
        })
    
        //verifying if the user was created or not
        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"       //deselecting the fields not required
        )
        if(!createdUser){
          throw new ApiError(500, "Something went wrong while creating user");
        }
    return res
        .status(201)
        .json(new ApiResponse(200, createdUser, "User registered successfully"))
    
    } catch (error) {
        console.log("user creation failed");
        if(avatar){
            await deleteFromCloudinary(avatar.public_id)
        }
        if (coverImage) {
          await deleteFromCloudinary(coverImage.public_id);
        }

        throw new ApiError(500, "Something went wrong while creating user and images were deleted");
    }
})
export {
    registerUser
}