import { Test, TestingModule } from '@nestjs/testing'
import { UserDeleteController } from '../../controllers/userdelete.controller'
import { UserDeleteService } from '../../services/userdelete.service'

describe('User', () => {
  let controller: UserDeleteController
  let service: UserDeleteService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserDeleteController],
      providers: [
        {
          provide: UserDeleteService,
          useValue: {
            execute: jest.fn().mockReturnValue(true),
          },
        },
      ],
    }).compile()

    controller = module.get<UserDeleteController>(UserDeleteController)
    service = module.get<UserDeleteService>(UserDeleteService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('UserDeleteController', () => {
    it('should be able to delete an User', async () => {
      const req: any = {
        params: {
          id: 1,
        },
        user: 1,
      }

      expect(await controller.execute(req)).toBeTruthy()
      expect(service.execute).toBeCalledTimes(1)
    })
  })
})
