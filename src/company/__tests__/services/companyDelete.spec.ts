import 'jest-extended'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { CompanyDeleteService } from '../../services/companydelete.service'
import { Repository } from 'typeorm'
import { Companies } from '../../../entities/Company.entity'
import { Users } from '../../../entities/User.entity'

describe('Company', () => {
  let service: CompanyDeleteService
  let repo: Repository<Companies>
  let userRepo: Repository<Users>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyDeleteService,
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
            delete: jest.fn().mockReturnValue(true),
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

    service = module.get<CompanyDeleteService>(CompanyDeleteService)
    repo = module.get<Repository<Companies>>(getRepositoryToken(Companies))
    userRepo = module.get<Repository<Users>>(getRepositoryToken(Users))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should be able to delete Company', async () => {
    const req: any = {
      params: {
        id: 1,
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
      }

      await service.execute(req)
    } catch (e) {
      expect(e.message).toStrictEqual('Http Exception')
    }
  })

  it('throw an error if the id company on params doesnt belongs to user logged and if the user logged isnt an adm', async () => {
    try {
      jest.spyOn(userRepo, 'findOne').mockResolvedValue({
        id: 2,
        name: 'igorcruz',
        email: 'email@gmail.com',
        password_hash: '123456789',
        activation: true,
        administrator: false,
        created_at: new Date(),
        updated_at: new Date(),
      })

      jest.spyOn(repo, 'findOne').mockResolvedValue({
        id: 1,
        name: 'company',
        cnpj: '000000000000000',
        user_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      })

      const req: any = {
        user: 2,
        params: { id: 1 },
      }

      await service.execute(req)
    } catch (e) {
      expect(e.message).toStrictEqual('Http Exception')
    }
  })
})
