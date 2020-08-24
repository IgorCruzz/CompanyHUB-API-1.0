import { Test, TestingModule } from '@nestjs/testing'
import { JwtStrategy } from './jwt.strategy'

describe('AutenticacaoService', () => {
  let service: JwtStrategy

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [JwtStrategy],
    }).compile()

    service = module.get<JwtStrategy>(JwtStrategy)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('jwt has been registered', async () => {
    const payload = {
      sub: '123456789',
    }
    expect(await service.validate(payload)).toEqual(payload.sub)
  })
})
