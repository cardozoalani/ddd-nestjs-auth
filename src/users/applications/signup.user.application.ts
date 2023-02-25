import { Injectable, Inject } from '@nestjs/common'
import { UserDomain } from '../domain/user.domain'
import { USER_TYPES } from '../interfaces/types'
import { ISignupUserApplication } from '../interfaces/applications/signup.user.application.interface'
import { ISignupUserService } from '../interfaces/services/signup.user.service.interface'

@Injectable()
export class SignupUserApplication implements ISignupUserApplication {
  constructor(
    @Inject(USER_TYPES.services.ISignupUserService)
    private userService: ISignupUserService,
  ) {}

  async signup(user: UserDomain): Promise<UserDomain> {
    return this.userService.signup(user)
  }
}
