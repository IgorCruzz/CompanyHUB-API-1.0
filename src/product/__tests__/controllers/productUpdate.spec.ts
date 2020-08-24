import 'jest-extended'
import { Test, TestingModule } from '@nestjs/testing'
import { ProductUpdateController } from '../../controllers/productupdate.controller'
import { ProductUpdateService } from '../../services/productupdate.service'

describe('Product', () => {
  let controller: ProductUpdateController
  let service: ProductUpdateService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductUpdateController],
      providers: [
        {
          provide: ProductUpdateService,
          useValue: {
            execute: jest.fn().mockReturnValue(true),
          },
        },
      ],
    }).compile()

    controller = module.get<ProductUpdateController>(ProductUpdateController)
    service = module.get<ProductUpdateService>(ProductUpdateService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('ProductUpdateController', () => {
    it('should be able to update an Product', async () => {
      const req: any = {
        params: {
          id: 1,
        },
        body: {
          company_id: 1,
          name: 'product',
        },
        user: 1,
      }

      expect(await controller.execute(req)).toBeTruthy()
    })
  })
})
