interface ApiAuthRefreshToken {
  success: boolean
  code: KnownResponseCodes
  message: string
  meta: unknown
  data: DataRefreshToken
}
interface DataRefreshToken {
  accessToken: string
  refreshToken: string
  isVerified: boolean
  deviceKeyId: string
}
