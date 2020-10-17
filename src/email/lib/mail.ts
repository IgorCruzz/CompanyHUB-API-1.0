import 'dotenv/config'
import { createTransport } from 'nodemailer'
import { resolve } from 'path'
import nodemailerhbs from 'nodemailer-express-handlebars'
import { create } from 'express-handlebars'

class Mail {
  transporter: any
  constructor() {
    this.transporter = createTransport({
      service: 'SendinBlue',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    })

    this.configureTemplates()
  }

  configureTemplates() {
    const viewPath = resolve('src', 'email', 'views', 'emails')

    this.transporter.use(
      'compile',
      nodemailerhbs({
        viewEngine: create({
          layoutsDir: resolve(viewPath, 'layouts'),
          partialsDir: resolve(viewPath, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs',
        }),
        viewPath,
        extName: '.hbs',
      })
    )
  }

  sendMail(message: any) {
    return this.transporter.sendMail(message)
  }
}

export default new Mail()
