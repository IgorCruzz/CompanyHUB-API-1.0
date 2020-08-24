import 'jest-extended'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Users } from '../../../entities/User.entity'
import { Repository } from 'typeorm'
import { ProductDeleteService } from '../../services/productdelete.service'
import { Companies } from '../../../entities/Company.entity'
import { Products } from '../../../entities/Product.entity'

describe('Product', () => {
  let service: ProductDeleteService
  let repo: Repository<Products>
  let companyRepo: Repository<Companies>
  let userRepo: Repository<Users>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductDeleteService,
        {
          provide: getRepositoryToken(Users),
          useValue: {
            findOne: jest.fn().mockResolvedValue({
              id: 1,
              name: 'igor',
              email: 'email@gmail.com',
              password_hash: '12346789',
              activation: true,
              administrator: false,
              created_at: new Date(),
              updated_at: new Date(),
            }),
          },
        },
        {
          provide: getRepositoryToken(Companies),
          useValue: {
            findOne: jest.fn().mockResolvedValue({
              id: 1,
              name: 'company',
              cnpj: '00000000000000',
              user_id: 1,
              created_at: new Date(),
              updated_at: new Date(),
            }),
          },
        },
        {
          provide: getRepositoryToken(Products),
          useValue: {
            findOne: jest.fn().mockResolvedValue({
              id: 1,
              name: 'product',
              company_id: 1,
              created_at: new Date(),
              updated_at: new Date(),
            }),
            delete: jest.fn().mockReturnValue(true),
          },
        },
      ],
    }).compile()

    service = module.get<ProductDeleteService>(ProductDeleteService)
    repo = module.get<Repository<Products>>(getRepositoryToken(Products))
    companyRepo = module.get<Repository<Companies>>(
      getRepositoryToken(Companies)
    )
    userRepo = module.get<Repository<Users>>(getRepositoryToken(Users))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should be able to delete an product', async () => {
    const req: any = {
      params: {
        id: 1,
      },
      body: {
        company_id: 1,
      },
      user: 1,
    }

    expect(await service.execute(req)).toBeTruthy()
  })

  it('throw an error if the company id passed through the request is different of the company id from the user logged', async () => {
    try {
      jest.spyOn(repo, 'findOne').mockResolvedValue({
        id: 2,
        name: 'company',
        company_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      })

      jest.spyOn(userRepo, 'findOne').mockResolvedValue({
        id: 1,
        name: 'igor',
        email: 'email@gmail.com',
        password_hash: '12346789',
        activation: false,
        administrator: false,
        created_at: new Date(),
        updated_at: new Date(),
      })

      const req: any = {
        user: 1,
        body: {
          company_id: 3,
          name: 'product',
        },
        params: {
          id: 2,
        },
      }

      await service.execute(req)
    } catch (e) {
      expect(e.message).toStrictEqual('Http Exception')
    }
  })

  it('throw an error if the ID passed through the params is wrong', async () => {
    try {
      jest.spyOn(repo, 'findOne').mockResolvedValue(undefined)

      const req: any = {
        params: {
          id: 1,
        },
        body: {
          company_id: 1,
        },
        user: 1,
      }

      await service.execute(req)
    } catch (e) {
      expect(e.message).toStrictEqual('Http Exception')
    }
  })
})
