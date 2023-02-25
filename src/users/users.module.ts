import { Module } from '@nestjs/common'
import { UsersController } from './controller/users.controller'
import { SignupUserService } from './services/signup.user.service'
import { User } from './domain/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { USER_TYPES } from './interfaces/types'
import { SignupUserApplication } from './applications/signup.user.application'
import { VerifiedEmailUserApplication } from './applications/verified.email.user.application'
import { VerifiedEmailUserService } from './services/verified.email.user.service'
import { SigninUserApplication } from './applications/signin.user.application'
import { SigninUserService } from './services/signin.user.service'

const signupUserApp = {
  provide: USER_TYPES.applications.ISignupUserApplication,
  useClass: SignupUserApplication,
}
const signinUserApp = {
  provide: USER_TYPES.applications.ISigninUserApplication,
  useClass: SigninUserApplication,
}
const verifiedEmailUserApp = {
  provide: USER_TYPES.applications.IVerifiedEmailUserApplication,
  useClass: VerifiedEmailUserApplication,
}

const signupUserService = {
  provide: USER_TYPES.services.ISignupUserService,
  useClass: SignupUserService,
}
const signinUserService = {
  provide: USER_TYPES.services.ISigninUserService,
  useClass: SigninUserService,
}
const verifiedEmailUserService = {
  provide: USER_TYPES.services.IVerifiedEmaileUserService,
  useClass: VerifiedEmailUserService,
}

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    signupUserApp,
    signinUserApp,
    verifiedEmailUserApp,
    signupUserService,
    signinUserService,
    verifiedEmailUserService,
  ],
})
export class UsersModule {}
