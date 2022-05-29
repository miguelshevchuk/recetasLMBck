import { v2 as cloudinary } from 'cloudinary'

export const executeConfig = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME || "efscloud",
    api_key: process.env.CLOUD_API_KEY || "877276172451655",
    api_secret: process.env.CLOUD_SECRET_KEY || "NMMIQRZcJQ2_QBfGTqUuEZ7ZScY",
  })
}
