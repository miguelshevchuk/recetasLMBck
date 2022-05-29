import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { IJwtUnsigned } from '../../interfaces/jwt/IJwtUnsigned'
import { IJwtSigned } from '../../interfaces/jwt/IJwtSigned'
import { JWTSecretError } from '../../error/auth/JWTSecretError'
import { JWTCreateError } from '../../error/auth/JWTCreateError'


export const jwtSecret: string | undefined = process.env.JWT_SECRET || 'Me cago en la concha de tu madre'
const tokenExpirationInSeconds = 86400 // 24 HOURS

class JwtService {
  createJWT(signObject: IJwtUnsigned): IJwtSigned {
    if (!jwtSecret) {
      throw new JWTSecretError();
    }

    try {
      const refreshId = signObject.usuarioId + jwtSecret
      const salt = crypto.createSecretKey(crypto.randomBytes(16))
      const hash = crypto
        .createHmac('sha512', salt)
        .update(refreshId)
        .digest('base64')

      const token = jwt.sign(signObject, jwtSecret, {
        expiresIn: tokenExpirationInSeconds,
      })

      return {
        token,
        refreshToken: hash,
      }
    } catch (err) {
      throw new JWTCreateError();
    }
  }
}

export const jwtService = new JwtService();
