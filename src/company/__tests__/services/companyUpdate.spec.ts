import 'jest-extended'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { CompanyUpdateService } from '../../services/companyupdate.service'
import { Repository } from 'typeorm'
import { Companies } from '../../../entities/Company.entity'
import { Users } from '../../../entities/User.entity'

describe('Company', () => {
  let service: CompanyUpdateService
  let repo: Repository<Companies>
  let userRepo: Repository<Users>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyUpdateService,
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
            update: jest.fn().mockReturnValue(true),
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
              administrator: false,
              created_at: new Date(),
              updated_at: new Date(),
            }),
          },
        },
      ],
    }).compile()

    service = module.get<CompanyUpdateService>(CompanyUpdateService)
    repo = module.get<Repository<Companies>>(getRepositoryToken(Companies))
    userRepo = module.get<Repository<Users>>(getRepositoryToken(Users))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should be able to update an company data', async () => {
    const req: any = {
      params: {
        id: 1,
      },
      body: {
        name: 'company',
      },
      user: 1,
    }

    expect(await service.execute(req)).toBeTruthy()
  })

  it('throw an error if the id passed through the params is wrong', async () => {
    try {
      jest.spyOn(repo, 'findOne').mockResolvedValue(undefined)

      const req: any = {
        user: 1,
        params: {
          id: 1,
        },
        body: {
          name: 'company',
        },
      }

      await service.execute(req)
    } catch (e) {
      expect(e.message).toStrictEqual('Http Exception')
    }
  })

  it('throw an error if the id company on params doesnt belongs to user logged and if the user logged isnt an adm', async () => {
    try {
      jest.spyOn(repo, 'findOne').mockResolvedValue({
        id: 2,
        name: 'company',
        cnpj: '00000000000000',
        user_id: 2,
        user: {
          id: 2,
          name: 'username',
          email: 'email@gmail.com',
          password_hash: '123456789',
          activation: true,
          administrator: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        created_at: new Date(),
        updated_at: new Date(),
        productConnection: [],
      })

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
        params: { id: 1 },
        body: {
          name: 'igor cruz',
        },
      }

      await service.execute(req)
    } catch (e) {
      expect(e.message).toStrictEqual('Http Exception')
    }
  })

  it('throw an error if the cnpj passed on request has already registered', async () => {
    try {
      const req: any = {
        user: 1,
        params: { id: 1 },
        body: {
          cnpj: '000.000.000/0000-00',
        },
      }

      await service.execute(req)
    } catch (e) {
      expect(e.message).toStrictEqual('Http Exception')
    }
  })
})
