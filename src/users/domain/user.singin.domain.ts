import { IsString, IsEmail } from 'class-validator'

export class UserSigninDomain {
  @IsString()
  readonly password: string

  @IsEmail()
  readonly email: string
}
