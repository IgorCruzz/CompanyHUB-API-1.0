import 'dotenv/config'
import Mail from '../lib/mail'

class RegisterMail {
  async handle(data: { email: string; token: string }) {
    Mail.sendMail({
      from: 'igorskt2009@hotmail.com',
      to: data.email,
      subject: 'Ative sua conta',
      template: 'register',
      context: {
        token: data.token,
        url: process.env.URL,
      },
    })
  }
}
export default new RegisterMail()
