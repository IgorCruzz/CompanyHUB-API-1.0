import 'jest-extended'
import { Test, TestingModule } from '@nestjs/testing'
import { UserCreateController } from '../../controllers/usercreate.controller'
import { UserCreateService } from '../../services/usercreate.service'

describe('User', () => {
  let controller: UserCreateController
  let service: UserCreateService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserCreateController],
      providers: [
        {
          provide: UserCreateService,
          useValue: {
            execute: jest.fn().mockReturnValue({
              id: 1,
              name: 'username',
              email: 'email@gmail.com',
              password_hash: '12345789',
              activation: false,
              administrator: false,
              created_at: new Date(),
              updated_at: new Date(),
            }),
          },
        },
      ],
    }).compile()

    controller = module.get<UserCreateController>(UserCreateController)
    service = module.get<UserCreateService>(UserCreateService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('UserCreateController', () => {
    it('should be able to register an User', async () => {
      const req: any = {
        params: {
          id: 1,
        },
      }

      expect(await controller.execute(req)).toContainKeys([
        'id',
        'name',
        'email',
        'password_hash',
        'activation',
        'administrator',
        'created_at',
        'updated_at',
      ])
      expect(service.execute).toBeCalledTimes(1)
    })
  })
})
