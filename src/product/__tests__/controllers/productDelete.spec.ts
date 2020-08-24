import 'jest-extended'
import { Test, TestingModule } from '@nestjs/testing'
import { ProductDeleteController } from '../../controllers/productdelete.controller'
import { ProductDeleteService } from '../../services/productdelete.service'

describe('Product', () => {
  let controller: ProductDeleteController
  let service: ProductDeleteService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductDeleteController],
      providers: [
        {
          provide: ProductDeleteService,
          useValue: {
            execute: jest.fn().mockReturnValue(true),
          },
        },
      ],
    }).compile()

    controller = module.get<ProductDeleteController>(ProductDeleteController)
    service = module.get<ProductDeleteService>(ProductDeleteService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('ProductDeleteController', () => {
    it('should be able to delete an Product', async () => {
      const req: any = {
        params: {
          id: 1,
        },
        body: {
          company_id: 1,
        },
        user: 1,
      }

      expect(await controller.execute(req)).toBeTruthy()
    })
  })
})
