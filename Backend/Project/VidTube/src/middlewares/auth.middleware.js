import jwt from "jsonwebtoken"
import {User} from "../models/user.models.js"
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"


export const verifyJWT = asyncHandler(async(req, _, next) => {      //as we dont want res, we keep it as blank

    const token = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ", "")

    if(!token){
        throw new ApiError(401, "Unauthorized")
    }
    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id).select("-passwrod -refreshToken")

        if(!user){
            throw new ApiError(401, "Unauthorized")
        }

        req.user = user             //creating a new parameter for req and assigning it with user extracted from the database

        next()          //transfering the flow control from middleware to the controller

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token" );
    }
})