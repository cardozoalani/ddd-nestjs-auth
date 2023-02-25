import { Test } from '@nestjs/testing'
import { Repository } from 'typeorm'
import { getRepositoryToken } from '@nestjs/typeorm'
import { SignupUserService } from '../../../services/signup.user.service'
import { User } from '../../../domain/user.entity'

describe('SignupUserService', () => {
  let service: SignupUserService
  let repositoryMock: Repository<User>
  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [
        SignupUserService,
        {
          // how you provide the injection token in a test instance
          provide: getRepositoryToken(User),
          // as a class value, Repository needs no generics
          useClass: Repository,
        },
      ],
    }).compile()

    service = app.get<SignupUserService>(SignupUserService)
    repositoryMock = app.get<Repository<User>>(getRepositoryToken(User))
  })

  describe('signup', () => {
    it('should signup user', async () => {
      const user = {
        userId: '123123123',
        patents: [{ id: '1' }],
        password: '123456',
        email: 'cardozoalani@hotmail.com',
      }
      const entity = Object.assign(new User(), user)
      jest.spyOn(repositoryMock, 'save').mockResolvedValueOnce(entity)
      const signup = await service.signup(entity)
      expect(signup).toEqual(entity)
      expect(repositoryMock.save).toBeCalled()
    })
  })
})
