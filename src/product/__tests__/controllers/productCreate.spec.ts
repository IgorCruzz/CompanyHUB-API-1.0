import 'jest-extended'
import { Test, TestingModule } from '@nestjs/testing'
import { ProductCreateController } from '../../controllers/productcreate.controller'
import { ProductCreateService } from '../../services/productcreate.service'

describe('Product', () => {
  let controller: ProductCreateController
  let service: ProductCreateService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductCreateController],
      providers: [
        {
          provide: ProductCreateService,
          useValue: {
            execute: jest.fn().mockReturnValue({
              id: 1,
              name: 'product',
              company_id: 1,
              created_at: new Date(),
              updated_at: new Date(),
            }),
          },
        },
      ],
    }).compile()

    controller = module.get<ProductCreateController>(ProductCreateController)
    service = module.get<ProductCreateService>(ProductCreateService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('ProductCreateController', () => {
    it('should be able to create an Product', async () => {
      const req: any = {
        params: {
          id: 1,
        },
      }

      expect(await controller.execute(req)).toContainKeys([
        'id',
        'name',
        'company_id',
        'created_at',
        'updated_at',
      ])
    })
  })
})
