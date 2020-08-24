import 'jest-extended'
import { Test, TestingModule } from '@nestjs/testing'
import { ProductIndexController } from '../../controllers/productindex.controller'
import { ProductIndexService } from '../../services/productindex.service'

describe('Product', () => {
  let controller: ProductIndexController
  let service: ProductIndexService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductIndexController],
      providers: [
        {
          provide: ProductIndexService,
          useValue: {
            execute: jest.fn().mockReturnValue([
              {
                id: 1,
                name: 'product',
                company_id: 1,
                serviceConnection: [],
                created_at: '2020-08-11T18:40:05.227Z,',
                updated_at: '2020-08-11T18:40:05.227Z,',
              },
              {
                id: 2,
                name: 'product',
                company_id: 1,
                serviceConnection: [],
                created_at: '2020-08-11T18:40:05.227Z,',
                updated_at: '2020-08-11T18:40:05.227Z,',
              },
            ]),
          },
        },
      ],
    }).compile()

    controller = module.get<ProductIndexController>(ProductIndexController)
    service = module.get<ProductIndexService>(ProductIndexService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('ProductIndexController', () => {
    it('should be able to an admin show all of products', async () => {
      const req: any = {
        user: 1,
      }

      expect(await controller.execute(req)).toEqual([
        {
          id: 1,
          name: 'product',
          company_id: 1,
          serviceConnection: [],
          created_at: '2020-08-11T18:40:05.227Z,',
          updated_at: '2020-08-11T18:40:05.227Z,',
        },
        {
          id: 2,
          name: 'product',
          company_id: 1,
          serviceConnection: [],
          created_at: '2020-08-11T18:40:05.227Z,',
          updated_at: '2020-08-11T18:40:05.227Z,',
        },
      ])
    })
  })
})
