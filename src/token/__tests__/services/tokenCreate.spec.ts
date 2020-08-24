import 'jest-extended'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Users } from '../../../entities/User.entity'
import { TokenCreateService } from '../../services/tokencreate.service'
import { Repository } from 'typeorm'
import * as Bcrypt from 'bcryptjs'
import { Tokens } from '../../../entities/Token.entity'

const OneUser = {
  id: 1,
  name: 'igor',
  email: 'email@gmail.com',
  password_hash: Bcrypt.hashSync('password', 8),
  activation: false,
  administrator: false,
  created_at: new Date(),
  updated_at: new Date(),
}

describe('Token', () => {
  let service: TokenCreateService
  let repo: Repository<Tokens>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TokenCreateService,
        {
          provide: getRepositoryToken(Users),
          useValue: {
            findOne: jest.fn().mockResolvedValue(OneUser),
            update: jest.fn().mockReturnValue(true),
          },
        },
        {
          provide: getRepositoryToken(Tokens),
          useValue: {
            save: jest.fn().mockReturnValue({
              user_id: 1,
              token: 'TOKEN',
            }),
            findOne: jest.fn().mockResolvedValue({
              user_id: 1,
              token: 'TOKEN',
            }),
          },
        },
      ],
    }).compile()

    service = module.get<TokenCreateService>(TokenCreateService)
    repo = module.get<Repository<Tokens>>(getRepositoryToken(Tokens))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should be able to update activation from user to true', async () => {
    const req: any = {
      params: {
        token: 'TOKEN',
      },
    }

    expect(await service.execute(req)).toBeTruthy()
  })

  it('throw an error if token not exists', async () => {
    try {
      jest.spyOn(repo, 'findOne').mockResolvedValue(undefined)

      const req: any = {
        params: {
          token: 'TOKEN',
        },
      }

      await service.execute(req)
    } catch (e) {
      expect(e.message).toStrictEqual('Http Exception')
    }
  })
})
