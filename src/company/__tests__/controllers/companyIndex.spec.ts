import 'jest-extended'
import { Test, TestingModule } from '@nestjs/testing'
import { CompanyIndexController } from '../../controllers/companyindex.controller'
import { CompanyIndexService } from '../../services/companyindex.service'

describe('Company', () => {
  let controller: CompanyIndexController
  let service: CompanyIndexService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyIndexController],
      providers: [
        {
          provide: CompanyIndexService,
          useValue: {
            execute: jest.fn().mockReturnValue([
              {
                id: 1,
                name: 'company',
                cnpj: '00000000000000',
                user_id: 1,
                productConnection: [],
                created_at: '2020-08-11T18:40:05.227Z,',
                updated_at: '2020-08-11T18:40:05.227Z,',
              },
              {
                id: 2,
                name: 'company',
                cnpj: '00000000000000',
                user_id: 1,
                productConnection: [],
                created_at: '2020-08-11T18:40:05.227Z,',
                updated_at: '2020-08-11T18:40:05.227Z,',
              },
            ]),
          },
        },
      ],
    }).compile()

    controller = module.get<CompanyIndexController>(CompanyIndexController)
    service = module.get<CompanyIndexService>(CompanyIndexService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('CompanyIndexController', () => {
    it('should be able to an admin show all of companies', async () => {
      const req: any = {
        user: 1,
      }

      expect(await controller.execute(req)).toEqual([
        {
          id: 1,
          name: 'company',
          cnpj: '00000000000000',
          user_id: 1,
          productConnection: [],
          created_at: '2020-08-11T18:40:05.227Z,',
          updated_at: '2020-08-11T18:40:05.227Z,',
        },
        {
          id: 2,
          name: 'company',
          cnpj: '00000000000000',
          user_id: 1,
          productConnection: [],
          created_at: '2020-08-11T18:40:05.227Z,',
          updated_at: '2020-08-11T18:40:05.227Z,',
        },
      ])
    })
  })
})
