import 'jest-extended'
import { Test, TestingModule } from '@nestjs/testing'
import { TokenCreateController } from '../../controllers/tokencreate.controller'
import { TokenCreateService } from '../../services/tokencreate.service'

describe('Token', () => {
  let controller: TokenCreateController
  let service: TokenCreateService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TokenCreateController],
      providers: [
        {
          provide: TokenCreateService,
          useValue: {
            execute: jest.fn().mockReturnValue(true),
          },
        },
      ],
    }).compile()

    controller = module.get<TokenCreateController>(TokenCreateController)
    service = module.get<TokenCreateService>(TokenCreateService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('TokenCreateController', () => {
    it('should be able actives an user', async () => {
      const req: any = {
        params: {
          token: 'TOKEN',
        },
      }

      expect(await controller.execute(req)).toBeTruthy()
    })
  })
})
