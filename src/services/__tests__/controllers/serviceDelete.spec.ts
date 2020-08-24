import 'jest-extended'
import { Test, TestingModule } from '@nestjs/testing'
import { ServiceDeleteController } from '../../controllers/servicedelete.controller'
import { ServiceDeleteService } from '../../services/servicedelete.service'

describe('Service', () => {
  let controller: ServiceDeleteController
  let service: ServiceDeleteService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceDeleteController],
      providers: [
        {
          provide: ServiceDeleteService,
          useValue: {
            execute: jest.fn().mockReturnValue(true),
          },
        },
      ],
    }).compile()

    controller = module.get<ServiceDeleteController>(ServiceDeleteController)
    service = module.get<ServiceDeleteService>(ServiceDeleteService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('ServiceDeleteController', () => {
    it('should be able to delete an Service', async () => {
      const req: any = {
        params: {
          id: 1,
        },
        body: {
          product_id: 1,
        },
        user: 1,
      }

      expect(await controller.execute(req)).toBeTruthy()
    })
  })
})
