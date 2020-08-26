import 'jest-extended'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Users } from '../../../entities/User.entity'
import { UserCreateService } from '../../services/usercreate.service'
import { Repository } from 'typeorm'
import * as Bcrypt from 'bcryptjs'
import { TokenCreateService } from '../../../token/services/tokencreate.service'
import { Tokens } from '../../../entities/Token.entity'
import * as crypto from 'crypto'

const OneUser = {
  id: 1,
  name: 'igor',
  email: 'igorskt2009@gmail.com',
  password_hash: Bcrypt.hashSync('password', 8),
  activation: false,
  administrator: false,
  created_at: new Date(),
  updated_at: new Date(),
}

describe('User', () => {
  let service: UserCreateService
  let repo: Repository<Users>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserCreateService,
        TokenCreateService,
        {
          provide: getRepositoryToken(Users),
          useValue: {
            findOne: jest.fn().mockResolvedValue(OneUser),
            save: jest.fn().mockReturnValue(OneUser),
          },
        },
        {
          provide: getRepositoryToken(Tokens),
          useValue: {
            save: jest.fn().mockReturnValue({
              user_id: 1,
              token: crypto.randomBytes(10).toString('hex'),
            }),
          },
        },
      ],
    }).compile()

    service = module.get<UserCreateService>(UserCreateService)
    repo = module.get<Repository<Users>>(getRepositoryToken(Users))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should be able to create an User', async () => {
    const req: any = {
      body: {
        name: 'igor',
        email: 'igorskt2009@gmail.com',
        password: '123456789',
        confirmPassword: '123456789',
      },
    }

    jest.spyOn(repo, 'findOne').mockResolvedValue(undefined)

    expect(await service.execute(req)).toContainKeys([
      'id',
      'name',
      'email',
      'password_hash',
      'created_at',
      'updated_at',
    ])
    expect(repo.findOne).toBeCalledTimes(1)
    expect(repo.findOne).toBeCalledWith({ email: 'igorskt2009@gmail.com' })
    expect(repo.save).toBeCalledTimes(1)
  })

  it('throw an error if already exists an user with e-mail passed on the Request body', async () => {
    try {
      const req: any = {
        body: {
          name: 'igor',
          email: 'email@gmail.com',
          password: '123456789',
          confirmPassword: '123456789',
        },
      }

      await service.execute(req)
    } catch (e) {
      expect(e.message).toStrictEqual('Http Exception')
      expect(repo.findOne).toBeCalledTimes(1)
      expect(repo.findOne).toBeCalledWith({ email: 'email@gmail.com' })
    }
  })
})
