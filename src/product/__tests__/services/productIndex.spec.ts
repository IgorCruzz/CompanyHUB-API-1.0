import 'jest-extended'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Products } from '../../../entities/Product.entity'
import { Users } from '../../../entities/User.entity'
import { ProductIndexService } from '../../services/productindex.service'

describe('Product', () => {
  let service: ProductIndexService
  let repo: Repository<Products>
  let userRepo: Repository<Users>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductIndexService,
        {
          provide: getRepositoryToken(Products),
          useValue: {
            find: jest.fn().mockResolvedValue([
              {
                id: 1,
                name: 'product',
                company_id: 1,
                serviceConnection: [],
                created_at: '2020-08-11T18:40:05.227Z,',
                updated_at: '2020-08-11T18:40:05.227Z,',
              },
              {
                id: 2,
                name: 'product',
                company_id: 1,
                serviceConnection: [],
                created_at: '2020-08-11T18:40:05.227Z,',
                updated_at: '2020-08-11T18:40:05.227Z,',
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

    service = module.get<ProductIndexService>(ProductIndexService)
    repo = module.get<Repository<Products>>(getRepositoryToken(Products))
    userRepo = module.get<Repository<Users>>(getRepositoryToken(Users))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should be able to show all product', async () => {
    const req: any = {
      user: 1,
    }

    expect(await service.execute(req)).toEqual([
      {
        id: 1,
        name: 'product',
        company_id: 1,
        serviceConnection: [],
        created_at: '2020-08-11T18:40:05.227Z,',
        updated_at: '2020-08-11T18:40:05.227Z,',
      },
      {
        id: 2,
        name: 'product',
        company_id: 1,
        serviceConnection: [],
        created_at: '2020-08-11T18:40:05.227Z,',
        updated_at: '2020-08-11T18:40:05.227Z,',
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
