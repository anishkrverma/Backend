import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDENAY_CLOUD_NAME,
    api_key: process.env.CLOUDENAY_API_KEY,
    api_secret: process.env.CLOUDENAY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload file and video on cloudinary
        const response = await cloudinary.uploader.upload(
            localFilePath, {
            resource_type: "auto"
        }
        )
        //file has been uploaded successfully
        console.log("File is  uploaded to Cloudinary", response.url);
        return response

    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null
    }
}

export { uploadOnCloudinary }