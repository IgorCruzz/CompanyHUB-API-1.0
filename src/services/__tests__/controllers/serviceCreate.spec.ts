import 'jest-extended'
import { Test, TestingModule } from '@nestjs/testing'
import { ServiceCreateController } from '../../controllers/servicecreate.controller'
import { ServiceCreateService } from '../../services/servicecreate.service'

describe('Service', () => {
  let controller: ServiceCreateController
  let service: ServiceCreateService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceCreateController],
      providers: [
        {
          provide: ServiceCreateService,
          useValue: {
            execute: jest.fn().mockReturnValue({
              id: 1,
              name: 'product',
              description: 'description',
              product_id: 1,
              created_at: new Date(),
              updated_at: new Date(),
            }),
          },
        },
      ],
    }).compile()

    controller = module.get<ServiceCreateController>(ServiceCreateController)
    service = module.get<ServiceCreateService>(ServiceCreateService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('ServiceCreateController', () => {
    it('should be able to create an Service', async () => {
      const req: any = {
        params: {
          id: 1,
        },
        body: {
          name: 'service',
          description: 'description',
          product_id: 1,
        },
        user: 1,
      }

      expect(await controller.execute(req)).toContainKeys([
        'id',
        'name',
        'description',
        'product_id',
        'created_at',
        'updated_at',
      ])
    })
  })
})
