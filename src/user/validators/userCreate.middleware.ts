import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { Request, Response } from 'express'
import * as Yup from 'yup'

@Injectable()
export class UseCreateMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: Function) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string()
          .min(5)
          .required(),
        email: Yup.string()
          .email()
          .required(),
        password: Yup.string()
          .min(6)
          .required(),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), 'O campo de senha não bate'])
          .required(),
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
