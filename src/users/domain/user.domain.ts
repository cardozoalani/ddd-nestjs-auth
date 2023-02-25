import { IsString, IsEmail, IsArray } from 'class-validator'

export class Patents {
  @IsString()
  readonly id: string
}

export class UserDomain {
  @IsArray()
  patents: Patents[]

  @IsString()
  readonly password: string

  @IsEmail()
  readonly email: string
}
