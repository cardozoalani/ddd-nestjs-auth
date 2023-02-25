import { IsString, IsEmail, IsArray, IsObject } from 'class-validator'
import { Patents } from './user.domain'

class CurrentUser {
  @IsString()
  readonly id: string

  @IsEmail()
  readonly email: string

  @IsArray()
  readonly patents: Patents[]
}

export class UserSessionDomain {
  @IsObject()
  readonly currentUser: CurrentUser

  @IsString()
  readonly token: string
}
