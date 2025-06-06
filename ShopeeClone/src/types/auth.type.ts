import { User } from './user.type'
import { ResponseApi } from './utilss.type'

export type AuthResponse = ResponseApi<{
  accessToken: string
  expires: string
  user: User
}>
