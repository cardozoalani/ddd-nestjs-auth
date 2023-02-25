import { Test } from '@nestjs/testing'
import { Repository } from 'typeorm'
import { getRepositoryToken } from '@nestjs/typeorm'
import { SigninUserService } from '../../../services/signin.user.service'
import { User } from '../../../domain/user.entity'
import { HttpException } from '@nestjs/common'

const responseSucces = {
  currentUser: {
    id: '123123123',
    email: 'cardozoalani@hotmail.com',
    patents: [{ id: '1' }],
  },
  token:
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzEyMzEyMyIsImVtYWlsIjoicmFmYWVsQHBlenpldHRpLmNvbSIsInBhdGVudHMiOlt7ImlkIjoiMSJ9XSwiaWF0IjoxNjc2NTQ0NzQ1fQ.SjyIRyQbhMZ7UaYEwZQbxnQIr43sH1cSj-NSbv_sdd-3dGEF-kaGhE6dZ0Eg0L_ebCuQZEB-BEEdiX7Rkj5nnm9bDpLgjjjwKeGLPadDF50iq0RO09-SSO-3BpPl_PkfD8tH0T60YGZbT2wChvzT9ZpvTW4kPoQyATiQ_Kk6FuB55lBNaixP-LYYtyiufcdTIzEcZYgY66Tk5PQBSycI5S1PsaTwxw1elBS-BHIiwrIHaHwNlah-VfnHMgLhQio5qFLsoXJQFnCbJQutA9z38prtwSosTi78Jnf7lFKTHz3jQDTa-leDVq28agkI14NROzY0imfTx9we65Zyks1D7_9O04-REXoP39ZVPBH2whsMBt0JvVUJnO3JFnp5C-KGJGzOLsNWRSt2gUR_vUoJ9gwtZiyLKlgdMM_5M9Y6rcVfeCGL98PaPWgMhLhnZTum8vsRtdNmuHJGWdkEe5DOej5n1OOvMzhUsyeu2tecUSa1qwEvPOcy_dWPWa4nV3_KmwAk5hheHlNbgzV30K-drqw-6qpO01CIu_5GVs35ovbZreDnIn6qnkO5opKuLaDSimESb2aawpRLAPc2MLw2SCxSGVYWuqKKfCtLyLZscs5ItWxXtNh1nE72FlTX6F54Q2dIA8bTBwLrfmIYI753OjeFbMwIJOa-WdNlTJAJJvc',
}

describe('SigninUserService', () => {
  let service: SigninUserService
  let repositoryMock: Repository<User>
  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [
        SigninUserService,
        {
          // how you provide the injection token in a test instance
          provide: getRepositoryToken(User),
          // as a class value, Repository needs no generics
          useClass: Repository,
        },
      ],
    }).compile()

    service = app.get<SigninUserService>(SigninUserService)
    repositoryMock = app.get<Repository<User>>(getRepositoryToken(User))
  })

  describe('signin', () => {
    it('should signin user', async () => {
      const user = {
        userId: '123123123',
        patents: [{ id: '1' }],
        password:
          '747e3e3e320b98525146b04b949d14b004ce638509eed48748ddd81f13e23e42c111fcd0260fb1536b2887efccb2f275797f554197bd62536e7d14fdda3db7fc.259fc3e8a50cc015',
        email: 'cardozoalani@hotmail.com',
      }
      const entity = Object.assign(new User(), user)
      jest.spyOn(repositoryMock, 'findOne').mockResolvedValueOnce(entity)
      const signin = await service.signin({
        email: 'cardozoalani@hotmail.com',
        password: 'hitcslap123',
      })
      expect(signin.currentUser).toEqual(responseSucces.currentUser)
      expect(repositoryMock.findOne).toBeCalled()
    })
    it('should password not match user', async () => {
      const user = {
        userId: '123123123',
        patents: [{ id: '1' }],
        password:
          '747e3e3e320b98525146b04b949d14b004ce638509eed48748ddd81f13e23e42c111fcd0260fb1536b2887efccb2f275797f554197bd62536e7d14fdda3db7fc.259fc3e8a50cc015',
        email: 'cardozoalani@hotmail.com',
      }
      const entity = Object.assign(new User(), user)
      jest.spyOn(repositoryMock, 'findOne').mockResolvedValueOnce(entity)

      try {
        await service.signin({
          email: 'cardozoalani@hotmail.com',
          password: 'hitcsap123',
        })
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException)
      }
    })
  })
})
