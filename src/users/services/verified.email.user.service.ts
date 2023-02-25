import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../domain/user.entity'
import { IVerifiedEmaileUserService } from '../interfaces/services/verified.email.user.service.interface'

@Injectable()
export class VerifiedEmailUserService implements IVerifiedEmaileUserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async emailUsed(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email } })
    return !!user
  }
}
