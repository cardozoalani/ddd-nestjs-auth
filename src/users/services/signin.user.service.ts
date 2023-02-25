import * as jwt from 'jsonwebtoken'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../domain/user.entity'
import { UserSessionDomain } from '../domain/user.session.domain'
import { ISigninUserService } from '../interfaces/services/signin.user.service.interface'
import { UserSigninDomain } from '../domain/user.singin.domain'
import { Password } from '../../utils/services/password'
import * as DotEnv from 'dotenv'
DotEnv.config()
const privateKey = process.env.PRIVATE_KEY
@Injectable()
export class SigninUserService implements ISigninUserService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async signin(user: UserSigninDomain): Promise<UserSessionDomain> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: user.email },
    })
    if (!existingUser) {
      throw new HttpException('Invalid email or password', HttpStatus.NOT_FOUND)
    }
    const passwordMatch = await Password.compare(existingUser.password, user.password)
    if (!passwordMatch) {
      throw new HttpException('Invalid email or password', HttpStatus.NOT_FOUND)
    }
    const userJwt = jwt.sign(
      {
        id: existingUser.userId,
        email: existingUser.email,
        patents: existingUser.patents,
      },
      privateKey,
      { algorithm: 'RS256' },
    )
    return {
      currentUser: {
        id: existingUser.userId,
        email: existingUser.email,
        patents: existingUser.patents,
      },
      token: userJwt,
    }
  }
}
