import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { Request, Response } from 'express'
import * as Yup from 'yup'

@Injectable()
export class ServiceUpdateMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: Function) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string()
          .min(5)
          .max(50),
      })

      await schema.validate(req.body, { abortEarly: false })

      next()
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: err.message,
        },
        HttpStatus.BAD_REQUEST
      )
    }
  }
}
