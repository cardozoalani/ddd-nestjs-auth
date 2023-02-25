import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'

describe('UserController (e2e)', () => {
  let app

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })
  afterEach(() => app.close())

  describe('signin', () => {
    it('/ (GET)', () => {
      return request(app.getHttpServer()).post('/users/signin').expect(400)
    })
  })
})
