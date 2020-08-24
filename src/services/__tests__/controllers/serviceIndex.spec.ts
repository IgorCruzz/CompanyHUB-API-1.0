import 'jest-extended'
import { Test, TestingModule } from '@nestjs/testing'
import { ServiceIndexController } from '../../controllers/serviceindex.controller'
import { ServiceIndexService } from '../../services/serviceindex.service'

describe('Service', () => {
  let controller: ServiceIndexController
  let service: ServiceIndexService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceIndexController],
      providers: [
        {
          provide: ServiceIndexService,
          useValue: {
            execute: jest.fn().mockReturnValue([
              {
                id: 1,
                name: 'product',
                description: 'description',
                product_id: 1,
                created_at: '2020-08-11T18:40:05.227Z,',
                updated_at: '2020-08-11T18:40:05.227Z,',
              },
              {
                id: 2,
                name: 'product',
                description: 'description',
                product_id: 1,
                created_at: '2020-08-11T18:40:05.227Z,',
                updated_at: '2020-08-11T18:40:05.227Z',
              },
            ]),
          },
        },
      ],
    }).compile()

    controller = module.get<ServiceIndexController>(ServiceIndexController)
    service = module.get<ServiceIndexService>(ServiceIndexService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('ServiceIndexController', () => {
    it('should be able to an admin show all of services', async () => {
      const req: any = {
        user: 1,
      }

      expect(await controller.execute(req)).toEqual([
        {
          id: 1,
          name: 'product',
          description: 'description',
          product_id: 1,
          created_at: '2020-08-11T18:40:05.227Z,',
          updated_at: '2020-08-11T18:40:05.227Z,',
        },
        {
          id: 2,
          name: 'product',
          description: 'description',
          product_id: 1,
          created_at: '2020-08-11T18:40:05.227Z,',
          updated_at: '2020-08-11T18:40:05.227Z',
        },
      ])
    })
  })
})
