import { Injectable, Inject } from '@nestjs/common'
import { USER_TYPES } from '../interfaces/types'
import { ISigninUserApplication } from '../interfaces/applications/signin.user.application.interface'
import { ISigninUserService } from '../interfaces/services/signin.user.service.interface'
import { UserSessionDomain } from '../domain/user.session.domain'
import { UserSigninDomain } from '../domain/user.singin.domain'

@Injectable()
export class SigninUserApplication implements ISigninUserApplication {
  constructor(
    @Inject(USER_TYPES.services.ISigninUserService)
    private userService: ISigninUserService,
  ) {}

  async signin(user: UserSigninDomain): Promise<UserSessionDomain> {
    return this.userService.signin(user)
  }
}
