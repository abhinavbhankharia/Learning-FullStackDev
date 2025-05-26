import { v2 as cloudinary } from "cloudinary";
import fs from "fs"


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
        fs.unlinkSync(localFilePath)
        return null
    }
}

export {uploadOnCloudinary}