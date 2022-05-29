import { v2 } from 'cloudinary'
import { executeConfig as configCloudinary } from '../../config/cloudinary'
import { CloudinaryError } from '../../error/reel/CloudinaryError'
import { Reel } from '../../model/Models'

export class CloudinaryService {

  private baseFile = "reels/"

  constructor() {
    this.config()
  }

  private config() {
    configCloudinary()
  }

  public async uploadReel(reel: Reel): Promise<string> {

//deprecated

    try {
      const reelUpload = await v2.uploader.upload(this.baseFile+"images.png", {
        folder: "reel.ubicacion",
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