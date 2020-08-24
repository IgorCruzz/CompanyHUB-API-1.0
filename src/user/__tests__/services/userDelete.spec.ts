import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Users } from '../../../entities/User.entity'
import { UserDeleteService } from '../../services/userdelete.service'
import { Repository } from 'typeorm'
import * as Bcrypt from 'bcryptjs'

describe('User', () => {
  let service: UserDeleteService
  let repo: Repository<Users>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserDeleteService,
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
            delete: jest.fn().mockReturnValue(true),
          },
        },
      ],
    }).compile()

    service = module.get<UserDeleteService>(UserDeleteService)
    repo = module.get<Repository<Users>>(getRepositoryToken(Users))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should be able to delete an User', async () => {
    const req: any = {
      params: {
        id: 1,
      },
      user: 1,
    }

    expect(await service.execute(req)).toBeTruthy()
    expect(repo.delete).toBeCalledTimes(1)
    expect(repo.delete).toHaveBeenCalledWith(1)
  })

  it('throw an error if the user logged has a different id of the id passed whithin the params', async () => {
    try {
      const req: any = {
        params: {
          id: 1,
        },
        user: 2,
      }

      await service.execute(req)
    } catch (e) {
      expect(e.message).toStrictEqual('Http Exception')
    }
  })

  it('throw an error if id passed whithin params has wrong', async () => {
    try {
      jest.spyOn(repo, 'findOne').mockResolvedValue(undefined)

      const req: any = {
        params: {
          id: 2,
        },
        user: 1,
      }

      await service.execute(req)
    } catch (e) {
      expect(e.message).toStrictEqual('Http Exception')
      expect(repo.findOne).toBeCalledWith({ id: 2 })
    }
  })
})
