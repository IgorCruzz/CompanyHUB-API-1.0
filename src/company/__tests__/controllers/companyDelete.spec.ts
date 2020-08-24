import 'jest-extended'
import { Test, TestingModule } from '@nestjs/testing'
import { CompanyDeleteController } from '../../controllers/companydelete.controller'
import { CompanyDeleteService } from '../../services/companydelete.service'

describe('Company', () => {
  let controller: CompanyDeleteController
  let service: CompanyDeleteService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyDeleteController],
      providers: [
        {
          provide: CompanyDeleteService,
          useValue: {
            execute: jest.fn().mockReturnValue(true),
          },
        },
      ],
    }).compile()

    controller = module.get<CompanyDeleteController>(CompanyDeleteController)
    service = module.get<CompanyDeleteService>(CompanyDeleteService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('CompanyDeleteController', () => {
    it('should be able to delete an Company', async () => {
      const req: any = {
        params: {
          id: 1,
        },
        user: 1,
      }

      expect(await controller.execute(req)).toBeTruthy()
    })
  })
})
