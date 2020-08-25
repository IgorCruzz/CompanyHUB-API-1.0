import 'jest-extended'
import { Test, TestingModule } from '@nestjs/testing'
import { CompanyCreateController } from '../../controllers/companycreate.controller'
import { CompanyCreateService } from '../../services/companycreate.service'

describe('Company', () => {
  let controller: CompanyCreateController
  let service: CompanyCreateService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyCreateController],
      providers: [
        {
          provide: CompanyCreateService,
          useValue: {
            execute: jest.fn().mockReturnValue({
              id: 1,
              name: 'username',
              cnpj: '00000000000000',
              password_hash: '12345789',
              user_id: 1,
              created_at: new Date(),
              updated_at: new Date(),
            }),
          },
        },
      ],
    }).compile()

    controller = module.get<CompanyCreateController>(CompanyCreateController)
    service = module.get<CompanyCreateService>(CompanyCreateService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('CompanyCreateController', () => {
    it('should be able to create an Company', async () => {
      const req: any = {
        params: {
          id: 1,
        },
      }

      expect(await controller.execute(req)).toContainKeys([
        'id',
        'name',
        'cnpj',
        'user_id',
        'created_at',
        'updated_at',
      ])
    })
  })
})
