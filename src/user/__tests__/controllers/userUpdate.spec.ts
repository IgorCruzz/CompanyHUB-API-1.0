import { Test, TestingModule } from '@nestjs/testing'
import { UserUpdateController } from '../../controllers/userupdate.controller'
import { UserUpdateService } from '../../services/userupdate.service'

describe('User', () => {
  let controller: UserUpdateController
  let service: UserUpdateService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserUpdateController],
      providers: [
        {
          provide: UserUpdateService,
          useValue: {
            execute: jest.fn().mockReturnValue(true),
          },
        },
      ],
    }).compile()

    controller = module.get<UserUpdateController>(UserUpdateController)
    service = module.get<UserUpdateService>(UserUpdateService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('UserUpdateController', () => {
    it("should be able to update an User's data", async () => {
      const req: any = {
        params: {
          id: 1,
        },
        body: {
          name: 'igor cruz',
        },
        user: 1,
      }

      expect(await controller.execute(req)).toBeTruthy()
      expect(service.execute).toBeCalledTimes(1)
    })
  })
})
