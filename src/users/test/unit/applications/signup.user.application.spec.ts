import { Test } from '@nestjs/testing'
import { SignupUserApplication } from '../../../applications/signup.user.application'
import { USER_TYPES } from '../../../interfaces/types'

class SignupUserService {
  signup(user) {
    return user
  }
}
describe('SignupUserApplication', () => {
  let application: SignupUserApplication
  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [
        SignupUserApplication,
        {
          provide: USER_TYPES.services.ISignupUserService,
          useClass: SignupUserService,
        },
      ],
    }).compile()

    application = app.get<SignupUserApplication>(SignupUserApplication)
  })

  describe('signup', () => {
    it('should signup user', async () => {
      const user = {
        userId: '123123123',
        password: '123456',
        email: 'cardozoalani@hotmail.com',
        patents: [{ id: '1' }],
      }
      const signup = await application.signup(user)
      expect(signup).toEqual(user)
    })
  })
})
