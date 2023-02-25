import { Inject, Injectable } from '@nestjs/common'
import { IVerifiedEmailUserApplication } from '../interfaces/applications/verified.email.user.application.interface'
import { IVerifiedEmaileUserService } from '../interfaces/services/verified.email.user.service.interface'
import { USER_TYPES } from '../interfaces/types'

@Injectable()
export class VerifiedEmailUserApplication implements IVerifiedEmailUserApplication {
  constructor(
    @Inject(USER_TYPES.services.IVerifiedEmaileUserService)
    private userService: IVerifiedEmaileUserService,
  ) {}
  async emailUsed(email: string): Promise<boolean> {
    return this.userService.emailUsed(email)
  }
}
