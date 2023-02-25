import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../domain/user.entity'
import { UserDomain } from '../domain/user.domain'
import { ISignupUserService } from '../interfaces/services/signup.user.service.interface'

@Injectable()
export class SignupUserService implements ISignupUserService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async signup(user: UserDomain): Promise<UserDomain> {
    const entity = Object.assign(new User(), user)
    return this.usersRepository.save(entity)
  }
}
