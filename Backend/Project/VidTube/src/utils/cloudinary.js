import { v2 as cloudinary } from "cloudinary";
import fs from "fs"
import dotenv from "dotenv"

dotenv.config()

// Configure cloudinarry
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

//

const uploadOnCloudinary = async (localFilePath) => {       //async function to upload file
    try {
        if(!localFilePath) return null
        const response = await cloudinary.uploader.upload(
            localFilePath, {
                resource_type: "auto"
            }
        )
        console.log("file uploaded on cloudinary. File src: " + response.url);
        //once the file is uploaded, we would like to delete it from our servers
        fs.unlinkSync(localFilePath)
        return response

    } catch (error) {                   //if any error, simply delete (unlink) the file 
        console.error("Cloudinary upload error:", error);
        fs.unlinkSync(localFilePath)
        return null
    }
}

const deleteFromCloudinary = async (publicID) => {
    try {
        const result = await cloudinary.uploader.destroy(publicID)
        console.log("deleted from cloudinary, Public ID: ", publicID);
        
    } catch (error) {
        console.log("error deleting from cloudinary ", error);
        return null
    }
}

export {uploadOnCloudinary, deleteFromCloudinary}