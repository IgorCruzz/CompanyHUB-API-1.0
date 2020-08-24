import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Users } from '../../../entities/User.entity'
import { UserUpdateService } from '../../services/userupdate.service'
import { Repository } from 'typeorm'
import * as Bcrypt from 'bcryptjs'

describe('User', () => {
  let service: UserUpdateService
  let repo: Repository<Users>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserUpdateService,
        {
          provide: getRepositoryToken(Users),
          useValue: {
            findOne: jest.fn().mockResolvedValue({
              id: 1,
              name: 'igor',
              email: 'email@gmail.com',
              password_hash: Bcrypt.hashSync('password', 8),
              activation: false,
              administrator: false,
              created_at: new Date(),
              updated_at: new Date(),
            }),
            update: jest.fn().mockReturnValue(true),
            find: jest.fn().mockResolvedValue([
              {
                id: 1,
                name: 'igor',
                email: 'email@gmail.com',
                password_hash: Bcrypt.hashSync('password', 8),
                activation: false,
                administrator: false,
                created_at: new Date(),
                updated_at: new Date(),
              },
            ]),
          },
        },
      ],
    }).compile()

    service = module.get<UserUpdateService>(UserUpdateService)
    repo = module.get<Repository<Users>>(getRepositoryToken(Users))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it("should be able to update an User's data", async () => {
    jest.spyOn(repo, 'find').mockResolvedValue([])

    const req: any = {
      params: { id: 1 },
      body: { name: 'igor cruz' },
      user: 1,
    }

    expect(await service.execute(req)).toBeTruthy()
    expect(repo.findOne).toBeCalledTimes(1)
    expect(repo.update).toBeCalledTimes(1)
  })

  it('throw an error if the password has passed wrong', async () => {
    try {
      jest.spyOn(repo, 'find').mockResolvedValue([])

      const req: any = {
        params: { id: 1 },
        body: {
          oldPassword: 'wrong-password',
          password: 'newpassword',
          confirmPassword: 'newpassword',
        },
        user: 1,
      }

      await service.execute(req)
    } catch (e) {
      expect(e.message).toStrictEqual('Http Exception')
    }
  })

  it("should be able to update the User's password", async () => {
    jest.spyOn(repo, 'find').mockResolvedValue([])

    const req: any = {
      params: { id: 1 },
      body: {
        oldPassword: 'password',
        password: 'newpassword',
        confirmPassword: 'newpassword',
      },
      user: 1,
    }

    expect(await service.execute(req)).toBeTruthy()
    expect(repo.findOne).toBeCalledTimes(1)
    expect(repo.update).toBeCalledTimes(1)
  })

  it('throw an error if doesnt exists an user with the id passed whithin the params', async () => {
    try {
      jest.spyOn(repo, 'findOne').mockResolvedValue(undefined)

      const req: any = {
        params: { id: 1 },
        body: { name: 'igor cruz' },
        user: 1,
      }

      await service.execute(req)
    } catch (e) {
      expect(e.message).toStrictEqual('Http Exception')
    }
  })

  it('throw an error if user isnt a adm and the req.user is different of user.id', async () => {
    try {
      const req: any = {
        params: { id: 1 },
        body: { name: 'igor cruz' },
        user: 2,
      }

      await service.execute(req)
    } catch (e) {
      expect(e.message).toStrictEqual('Http Exception')
    }
  })

  it('throw an error if has already an user with the email passed whithin the request', async () => {
    try {
      const req: any = {
        params: { id: 1 },
        body: { email: 'email@hotmail.com' },
        user: 1,
      }

      await service.execute(req)
    } catch (e) {
      expect(e.message).toStrictEqual('Http Exception')
    }
  })
})
