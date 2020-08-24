import 'jest-extended'
import { Test, TestingModule } from '@nestjs/testing'
import { CompanyUpdateController } from '../../controllers/companyupdate.controller'
import { CompanyUpdateService } from '../../services/companyupdate.service'

describe('Company', () => {
  let controller: CompanyUpdateController
  let service: CompanyUpdateService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyUpdateController],
      providers: [
        {
          provide: CompanyUpdateService,
          useValue: {
            execute: jest.fn().mockReturnValue(true),
          },
        },
      ],
    }).compile()

    controller = module.get<CompanyUpdateController>(CompanyUpdateController)
    service = module.get<CompanyUpdateService>(CompanyUpdateService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('CompanyUpdateController', () => {
    it('should be able to update an Company', async () => {
      const req: any = {
        params: {
          id: 1,
        },
        body: {
          name: 'company',
        },
        user: 1,
      }

      expect(await controller.execute(req)).toBeTruthy()
    })
  })
})
