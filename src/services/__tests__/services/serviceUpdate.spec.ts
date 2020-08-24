import 'jest-extended'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Products } from '../../../entities/Product.entity'
import { Companies } from '../../../entities/Company.entity'
import { Services } from '../../../entities/Service.entity'
import { ServiceUpdateService } from '../../services/serviceupdate.service'

describe('Service', () => {
  let service: ServiceUpdateService
  let repo: Repository<Services>
  let productRepo: Repository<Products>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServiceUpdateService,
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
              user: {
                id: 1,
                name: 'igor cruz',
                email: 'email@gmail.com',
                password_hash: '123456789',
                activation: true,
                admistrator: false,
                created_at: new Date(),
                updated_at: new Date(),
              },
            }),
          },
        },
        {
          provide: getRepositoryToken(Services),
          useValue: {
            update: jest.fn().mockReturnValue(true),
          },
        },
      ],
    }).compile()

    service = module.get<ServiceUpdateService>(ServiceUpdateService)
    repo = module.get<Repository<Services>>(getRepositoryToken(Services))
    productRepo = module.get<Repository<Products>>(getRepositoryToken(Products))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it("should be able to update an data's service", async () => {
    const req: any = {
      params: {
        id: 1,
      },
      body: {
        product_id: 1,
        name: 'service',
      },
    }

    expect(await service.execute(req)).toBeTruthy()
  })

  it('throw an error if the product doesnt belongs to service and user isnt an admin', async () => {
    try {
      jest.spyOn(productRepo, 'findOne').mockReturnValue(undefined)

      const req: any = {
        user: 1,
        body: {
          product_id: 1,
          name: 'service',
        },
        params: {
          id: 1,
        },
      }

      await service.execute(req)
    } catch (e) {
      expect(e.message).toStrictEqual('Http Exception')
    }
  })
})
