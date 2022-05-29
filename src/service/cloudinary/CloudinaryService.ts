import { v2 } from 'cloudinary'
import { executeConfig as configCloudinary } from '../../config/cloudinary'
import { CloudinaryError } from '../../error/reel/CloudinaryError'

export class CloudinaryService {

  private baseFile = "recetas/"

  constructor() {
    this.config()
  }

  private config() {
    configCloudinary()
  }

  public async uploadReel(imagen: string): Promise<string> {

//deprecated

    try {
      const reelUpload = await v2.uploader.upload(this.baseFile+"images.png", {
        folder: "imagen",
        unique_filename: true,
        use_filename: true,
        access_mode: 'public',
      })
      const reelUrl = reelUpload.url
      return reelUrl
    } catch (e) {
      console.log(e)
      throw new CloudinaryError()
    }
  }
}

const cloudinaryService = new CloudinaryService()
export default cloudinaryService