import 'jest-extended'
import { Test, TestingModule } from '@nestjs/testing'
import { ServiceUpdateController } from '../../controllers/serviceupdate.controller'
import { ServiceUpdateService } from '../../services/serviceupdate.service'

describe('Service', () => {
  let controller: ServiceUpdateController
  let service: ServiceUpdateService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceUpdateController],
      providers: [
        {
          provide: ServiceUpdateService,
          useValue: {
            execute: jest.fn().mockReturnValue(true),
          },
        },
      ],
    }).compile()

    controller = module.get<ServiceUpdateController>(ServiceUpdateController)
    service = module.get<ServiceUpdateService>(ServiceUpdateService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('ServiceUpdateController', () => {
    it('should be able to update an Service', async () => {
      const req: any = {
        params: {
          id: 1,
        },
        body: {
          product_id: 1,
          name: 'service',
        },
        user: 1,
      }

      expect(await controller.execute(req)).toBeTruthy()
    })
  })
})
