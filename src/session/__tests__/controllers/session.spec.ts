import 'jest-extended'
import { Test, TestingModule } from '@nestjs/testing'
import { SessionCreateController } from '../../controllers/sessioncreate.controller'
import { SessionService } from '../../services/session.service'

describe('Session', () => {
  let controller: SessionCreateController
  let service: SessionService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SessionCreateController],
      providers: [
        {
          provide: SessionService,
          useValue: {
            execute: jest.fn().mockReturnValue({
              id: 1,
              name: 'username',
              email: 'email@gmail.com',
              token: 'token',
              created_at: new Date(),
              updated_at: new Date(),
            }),
          },
        },
      ],
    }).compile()

    controller = module.get<SessionCreateController>(SessionCreateController)
    service = module.get<SessionService>(SessionService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('SessionCreateController', () => {
    it('should be able to log in', async () => {
      const req: any = {
        body: {
          email: 'email@gmail.com',
          password: '123456789',
        },
      }

      expect(await controller.execute(req)).toContainKeys([
        'id',
        'name',
        'email',
        'token',
        'created_at',
        'updated_at',
      ])
    })
  })
})
