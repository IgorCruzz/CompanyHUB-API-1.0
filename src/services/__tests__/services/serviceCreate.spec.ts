import 'jest-extended'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Products } from '../../../entities/Product.entity'
import { Companies } from '../../../entities/Company.entity'
import { ServiceCreateService } from '../../services/servicecreate.service'
import { Services } from '../../../entities/Service.entity'

describe('Service', () => {
  let service: ServiceCreateService
  let repo: Repository<Services>
  let productRepo: Repository<Products>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServiceCreateService,
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
            save: jest.fn().mockResolvedValue({
              id: 1,
              name: 'service',
              description: 'description',
              product_id: 1,
              created_at: new Date(),
              updated_at: new Date(),
            }),
          },
        },
      ],
    }).compile()

    service = module.get<ServiceCreateService>(ServiceCreateService)
    repo = module.get<Repository<Services>>(getRepositoryToken(Services))
    productRepo = module.get<Repository<Products>>(getRepositoryToken(Products))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should be able to create an service', async () => {
    const req: any = {
      body: {
        product_id: 1,
        name: 'service',
        description: 'description',
      },
      user: 1,
    }

    expect(await service.execute(req)).toContainKeys([
      'id',
      'name',
      'description',
      'product_id',
      'created_at',
      'updated_at',
    ])
  })

  it('throw an error if the product doesnt belongs to service and user isnt an admin', async () => {
    try {
      jest.spyOn(productRepo, 'findOne').mockReturnValue(undefined)

      const req: any = {
        user: 1,
        body: {
          product_id: 1,
        },
      }

      await service.execute(req)
    } catch (e) {
      expect(e.message).toStrictEqual('Http Exception')
    }
  })
})
