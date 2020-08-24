import 'jest-extended'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProductCreateService } from '../../services/productcreate.service'
import { Products } from '../../../entities/Product.entity'
import { Companies } from '../../../entities/Company.entity'

describe('Product', () => {
  let service: ProductCreateService
  let repo: Repository<Products>
  let companyRepo: Repository<Companies>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductCreateService,
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
            save: jest.fn().mockResolvedValue({
              id: 1,
              name: 'product',
              company_id: 1,
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
      ],
    }).compile()

    service = module.get<ProductCreateService>(ProductCreateService)
    repo = module.get<Repository<Products>>(getRepositoryToken(Products))
    companyRepo = module.get<Repository<Companies>>(
      getRepositoryToken(Companies)
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should be able to create an product', async () => {
    jest.spyOn(repo, 'findOne').mockResolvedValue(undefined)

    const req: any = {
      body: {
        company_id: 1,
        name: 'product',
      },
      user: 1,
    }

    expect(await service.execute(req)).toContainKeys([
      'id',
      'name',
      'company_id',
      'created_at',
      'updated_at',
    ])
  })

  it('throw an error if the company id passed through the request is different of the company id from the user logged', async () => {
    try {
      jest.spyOn(companyRepo, 'findOne').mockResolvedValue({
        id: 2,
        name: 'company',
        cnpj: '00000000000000',
        user_id: 1,
        user: {
          id: 1,
          name: 'igorcruz',
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

      const req: any = {
        user: 1,
        body: {
          company_id: 3,
          name: 'product',
        },
      }

      await service.execute(req)
    } catch (e) {
      expect(e.message).toStrictEqual('Http Exception')
    }
  })

  it('throw an error if the name passed through the request has already exists', async () => {
    try {
      const req: any = {
        body: {
          company_id: 1,
          name: 'product',
        },
        user: 1,
      }

      await service.execute(req)
    } catch (e) {
      expect(e.message).toStrictEqual('Http Exception')
    }
  })
})
