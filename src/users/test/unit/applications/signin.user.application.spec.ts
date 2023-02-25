import { Test } from '@nestjs/testing'
import { SigninUserApplication } from '../../../applications/signin.user.application'
import { USER_TYPES } from '../../../interfaces/types'

class SigninUserService {
  signin(user) {
    return user
  }
}
describe('SigninUserApplication', () => {
  let application: SigninUserApplication
  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [
        SigninUserApplication,
        {
          provide: USER_TYPES.services.ISigninUserService,
          useClass: SigninUserService,
        },
      ],
    }).compile()

    application = app.get<SigninUserApplication>(SigninUserApplication)
  })

  describe('signin', () => {
    it('should signin user', async () => {
      const user = {
        password: '123456',
        email: 'cardozoalani@hotmail.com',
      }
      const signin = await application.signin(user)
      expect(signin).toEqual(user)
    })
  })
})
