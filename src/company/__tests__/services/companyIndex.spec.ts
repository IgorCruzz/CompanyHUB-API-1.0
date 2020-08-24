import 'jest-extended'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Companies } from '../../../entities/Company.entity'
import { Users } from '../../../entities/User.entity'
import { CompanyIndexService } from '../../services/companyindex.service'

describe('Company', () => {
  let service: CompanyIndexService
  let repo: Repository<Companies>
  let userRepo: Repository<Users>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyIndexService,
        {
          provide: getRepositoryToken(Companies),
          useValue: {
            find: jest.fn().mockResolvedValue([
              {
                id: 1,
                name: 'company',
                cnpj: '000000000000000',
                user_id: 1,
                productConnection: [],
                created_at: '2020-08-11T19:43:23.892Z',
                updated_at: '2020-08-11T19:43:23.892Z',
              },
              {
                id: 1,
                name: 'company',
                cnpj: '000000000000000',
                user_id: 1,
                productConnection: [],
                created_at: '2020-08-11T19:43:23.892Z',
                updated_at: '2020-08-11T19:43:23.892Z',
              },
            ]),
          },
        },
        {
          provide: getRepositoryToken(Users),
          useValue: {
            findOne: jest.fn().mockResolvedValue({
              id: 1,
              name: 'igorcruz',
              email: 'email@gmail.com',
              password_hash: '123456789',
              activation: true,
              administrator: true,
              created_at: '2020-08-11T19:43:23.892Z',
              updated_at: '2020-08-11T19:43:23.892Z',
            }),
          },
        },
      ],
    }).compile()

    service = module.get<CompanyIndexService>(CompanyIndexService)
    repo = module.get<Repository<Companies>>(getRepositoryToken(Companies))
    userRepo = module.get<Repository<Users>>(getRepositoryToken(Users))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should be able to show all companies', async () => {
    const req: any = {
      user: 1,
    }

    expect(await service.execute(req)).toEqual([
      {
        id: 1,
        name: 'company',
        cnpj: '000000000000000',
        user_id: 1,
        productConnection: [],
        created_at: '2020-08-11T19:43:23.892Z',
        updated_at: '2020-08-11T19:43:23.892Z',
      },
      {
        id: 1,
        name: 'company',
        cnpj: '000000000000000',
        user_id: 1,
        productConnection: [],
        created_at: '2020-08-11T19:43:23.892Z',
        updated_at: '2020-08-11T19:43:23.892Z',
      },
    ])
  })

  it('throw an error is the user logged isnt an adm', async () => {
    try {
      jest.spyOn(userRepo, 'findOne').mockResolvedValue({
        id: 1,
        name: 'igorcruz',
        email: 'email@gmail.com',
        password_hash: '123456789',
        activation: true,
        administrator: false,
        created_at: new Date(),
        updated_at: new Date(),
      })

      const req: any = {
        user: 1,
      }

      await service.execute(req)
    } catch (e) {
      expect(e.message).toStrictEqual('Http Exception')
    }
  })
})
