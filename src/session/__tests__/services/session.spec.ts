import 'jest-extended'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Users } from '../../../entities/User.entity'
import { SessionService } from '../../services/session.service'
import { Repository } from 'typeorm'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from '../../../jwt/constants'
import { JwtStrategy } from '../../../jwt/jwt.strategy'
import * as bcrypt from 'bcryptjs'

describe('Session', () => {
  let service: SessionService
  let repo: Repository<Users>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '7d' },
        }),
      ],
      providers: [
        SessionService,
        JwtStrategy,
        {
          provide: getRepositoryToken(Users),
          useValue: {
            findOne: jest.fn().mockResolvedValue({
              id: 1,
              name: 'igor',
              email: 'email@gmail.com',
              password_hash: bcrypt.hashSync('123456789', 8),
              activation: true,
              administrator: false,
              created_at: new Date(),
              updated_at: new Date(),
            }),
          },
        },
      ],
    }).compile()

    service = module.get<SessionService>(SessionService)
    repo = module.get<Repository<Users>>(getRepositoryToken(Users))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should be able to create an User', async () => {
    const req: any = {
      body: {
        email: 'email@gmail.com',
        password: '123456789',
      },
    }

    expect(await service.execute(req)).toContainKeys([
      'id',
      'name',
      'email',
      'token',
    ])
    expect(repo.findOne).toBeCalledTimes(1)
    expect(repo.findOne).toBeCalledWith({ email: 'email@gmail.com' })
  })

  it('throw an error if doesnt exists an user with the email passed on request', async () => {
    try {
      jest.spyOn(repo, 'findOne').mockResolvedValue(undefined)

      const req: any = {
        body: {
          email: 'email@gmail.com',
          password: '123456789',
        },
      }

      await service.execute(req)
    } catch (e) {
      expect(e.message).toStrictEqual('Http Exception')
    }
  })

  it('throw an error if the password is wrong', async () => {
    try {
      const req: any = {
        body: {
          email: 'email@gmail.com',
          password: 'wrong-password',
        },
      }
      await service.execute(req)
    } catch (e) {
      expect(e.message).toStrictEqual('Http Exception')
    }
  })

  it('throw an error if the user has not active your account', async () => {
    try {
      jest.spyOn(repo, 'findOne').mockResolvedValue({
        id: 1,
        name: 'igorcruz',
        email: 'email@gmail.com',
        password_hash: bcrypt.hashSync('123456789', 8),
        activation: false,
        administrator: false,
        created_at: new Date(),
        updated_at: new Date(),
      })

      const req: any = {
        body: {
          email: 'email@gmail.com',
          password: '123456789',
        },
      }

      await service.execute(req)
    } catch (e) {
      expect(e.message).toStrictEqual('Http Exception')
    }
  })
})
