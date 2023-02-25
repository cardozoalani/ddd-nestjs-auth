import { Test, TestingModule } from '@nestjs/testing'
import { UsersController } from '../../../controller/users.controller'
import { USER_TYPES } from '../../../interfaces/types'

const signinUser = {
  password: '123456',
  email: 'cardozoalani@hotmail.com',
}

const signupUser = {
  password: '12121212',
  email: 'aaa@aaa.com',
  patents: [{ id: '1' }],
}

const signupResponse = {
  statusCode: 201,
  message: 'aaa@aaa.com successfully created',
}

const sessionResponse = {
  currentUser: {
    id: '88762a1b-cd18-48aa-98eb-af57597f756b',
    email: 'cardozoalani@hotmail.com',
    patents: [
      {
        id: '1',
      },
    ],
  },
  token:
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg4NzYyYTFiLWNkMTgtNDhhYS05OGViLWFmNTc1OTdmNzU2YiIsImVtYWlsIjoiY2hyaXN0b3BoZXIuaGl0Y2hAbWFpbC5jb20iLCJwYXRlbnRzIjpbeyJpZCI6IjEifV0sImlhdCI6MTY3NjUzOTUxMn0.l3tA9YlaFU0ozqV4R0gIoXxi1hkC8Q5KZB_M3rlwN8hdm5zb8g1zqgX2FPGn8QxWz3fj8-DpzjagU6KR3QvagNWUq_5YCM1_Lk78QM4Qgse6c9GTwE8TcoC9qxVhNwwFCwUpV5IET-Fh-iFsOozytdYo1GbjLMDhY8L7V5LQpyHbDiONY5B5NX5_cWVapIP8P1Q7lVemVYR8813vPMWbaOtcIyRe3cPFwYNy1I41UqkcVy-fVDZgZCxpn5xz6dn6SVgkq8s_AjsmQAifxUB69CekMmiUtPob80UcLCxa_EUyo2ZbZhEnHn61UFxT4eWrILwea7E2PmjHy2US5d2WJ39P9WDdhmBzfngUBafcnYL_mPqa52lndwymp4HgnHACsQr3CfJspv_KbeQoEFkIaALQTaeRD43y9V8XNr_RNYsYjI0NNsCHnPefsctjC81_q10aUr-NvdoR5Gm2fUWjs1ubAxV04H4O-KTjL2W-S1qZyoP1DdtpFNQMnx7HUQOcRhq0zbQWmyql_uOhHI6kyddzOlAOvDJhj1VroLHYZ5z5dMOpN6I59gDPan7ZIBIaWIYT3MkYXJQ8-qjX1NAlHY8e_Yd0ADoxTkb9QVG6S1Jv3GrmHGWYaO5IbSWHTpUoIGuYrxBt6JhT0boH-nPb26cNNAUpURGO8O33V3VbfNo',
  statusCode: 200,
  message: 'session info',
}

class SigninUserApplicationMock {
  signin(obj) {
    return sessionResponse
  }
}

class SignupUserApplicationMock {
  signup(id) {
    return signupResponse
  }
}

class VerifiedEmailUserApplicationMock {
  emailUsed(id) {
    return false
  }
}

describe('Users Controller', () => {
  let controller: UsersController
  let signinUserApplicationMock
  let signupUserApplicationMock
  let verifiedEmailUserApplicationMock

  const response = {
    status: (statusCode: number) => response,
    json: (json) => json,
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: USER_TYPES.applications.ISigninUserApplication,
          useClass: SigninUserApplicationMock,
        },
        {
          provide: USER_TYPES.applications.ISignupUserApplication,
          useClass: SignupUserApplicationMock,
        },
        {
          provide: USER_TYPES.applications.IVerifiedEmailUserApplication,
          useClass: VerifiedEmailUserApplicationMock,
        },
      ],
    }).compile()

    controller = module.get<UsersController>(UsersController)
    signinUserApplicationMock = module.get(USER_TYPES.applications.ISigninUserApplication)
    signupUserApplicationMock = module.get(USER_TYPES.applications.ISignupUserApplication)
    verifiedEmailUserApplicationMock = module.get(USER_TYPES.applications.IVerifiedEmailUserApplication)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('signin', () => {
    it('should signin user', async () => {
      jest.spyOn(signinUserApplicationMock, 'signin')

      expect(await controller.signin(response, signinUser)).toEqual(sessionResponse)
      expect(signinUserApplicationMock.signin).toBeCalled()
    })
  })

  describe('signup', () => {
    it('should signup user', async () => {
      jest.spyOn(signupUserApplicationMock, 'signup')

      expect(await controller.signup(response, signupUser)).toEqual(signupResponse)
      expect(signupUserApplicationMock.signup).toBeCalled()
    })
  })
})
