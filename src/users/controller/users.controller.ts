import { Controller, Inject, Post, Res, Body, HttpStatus, UsePipes } from '@nestjs/common'
import { UserDomain } from '../domain/user.domain'
import { USER_TYPES } from '../interfaces/types'
import { IVerifiedEmailUserApplication } from '../interfaces/applications/verified.email.user.application.interface'
import { ISignupUserApplication } from '../interfaces/applications/signup.user.application.interface'
import { ISigninUserApplication } from '../interfaces/applications/signin.user.application.interface'
import { ValidationPipe } from '../../common/validation.pipe'
import { UserSigninDomain } from '../domain/user.singin.domain'

@Controller('users')
export class UsersController {
  constructor(
    @Inject(USER_TYPES.applications.ISignupUserApplication)
    private signupUserApp: ISignupUserApplication,
    @Inject(USER_TYPES.applications.ISigninUserApplication)
    private signinUserApp: ISigninUserApplication,
    @Inject(USER_TYPES.applications.IVerifiedEmailUserApplication)
    private verifiedEmailUserApp: IVerifiedEmailUserApplication,
  ) {}

  @UsePipes(new ValidationPipe())
  @Post('/signup')
  async signup(@Res() res, @Body() userDomain: UserDomain) {
    try {
      const emailUsed = await this.verifiedEmailUserApp.emailUsed(userDomain.email)
      if (emailUsed)
        return res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.CONFLICT,
          message: `email ${userDomain.email} already in use`,
        })
      userDomain.patents = [{ id: '1' }]
      await this.signupUserApp.signup(userDomain)
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.CREATED,
        message: `${userDomain.email} successfully created`,
      })
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json(err)
    }
  }

  @UsePipes(new ValidationPipe())
  @Post('/signin')
  async signin(@Res() res, @Body() userDomain: UserSigninDomain) {
    try {
      const user = await this.signinUserApp.signin(userDomain)
      return res.status(HttpStatus.OK).json({
        ...user,
        statusCode: HttpStatus.OK,
        message: 'session info',
      })
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json(err)
    }
  }
}
