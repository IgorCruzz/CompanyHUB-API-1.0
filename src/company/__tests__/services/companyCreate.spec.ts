import 'jest-extended'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { CompanyCreateService } from '../../services/companycreate.service'
import { Repository } from 'typeorm'
import { Companies } from '../../../entities/Company.entity'

describe('Company', () => {
  let service: CompanyCreateService
  let repo: Repository<Companies>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyCreateService,
        {
          provide: getRepositoryToken(Companies),
          useValue: {
            findOne: jest.fn().mockResolvedValue({
              id: 1,
              name: 'company',
              cnpj: '000000000000000',
              user_id: 1,
              created_at: new Date(),
              updated_at: new Date(),
            }),
            find: jest.fn(),
            save: jest.fn().mockReturnValue({
              id: 1,
              name: 'company',
              cnpj: '000000000000000',
              user_id: 1,
              created_at: new Date(),
              updated_at: new Date(),
            }),
          },
        },
      ],
    }).compile()

    service = module.get<CompanyCreateService>(CompanyCreateService)
    repo = module.get<Repository<Companies>>(getRepositoryToken(Companies))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should be able to register a Company', async () => {
    jest.spyOn(repo, 'findOne').mockResolvedValue(undefined)
    jest.spyOn(repo, 'find').mockResolvedValue([])

    const req: any = {
      body: {
        name: 'company',
        cnpj: '000.000.000/0000-00',
      },
      user: 1,
    }

    expect(await service.execute(req)).toContainKeys([
      'id',
      'name',
      'cnpj',
      'user_id',
      'created_at',
      'updated_at',
    ])
  })

  it('throw an error if user have had already an company registered', async () => {
    try {
      const req: any = {
        body: {
          name: 'company',
          cnpj: '000.000.000/0000-00',
        },
        user: 1,
      }

      await service.execute(req)
    } catch (e) {
      expect(e.message).toStrictEqual('Http Exception')
    }
  })

  it('throw an error if the cnpj passed on request already exists', async () => {
    try {
      jest.spyOn(repo, 'findOne').mockResolvedValue(undefined)
      jest.spyOn(repo, 'find').mockResolvedValue([
        {
          id: 1,
          name: 'company',
          cnpj: '000000000000000',
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ])

      const req: any = {
        body: {
          name: 'company',
          cnpj: '000.000.000/0000-00',
        },
        user: 1,
      }

      await service.execute(req)
    } catch (e) {
      expect(e.message).toStrictEqual('Http Exception')
    }
  })
})
