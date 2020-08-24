import Mail from '../lib/mail'

class RegisterMail {
  async handle(data: { email: string; token: string }) {
    Mail.sendMail({
      from: 'igorskt2009@gmail.com',
      to: data.email,
      subject: 'Ative sua conta',
      template: 'register',
      context: {
        token: data.token,
      },
    })
  }
}
export default new RegisterMail()
