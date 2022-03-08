import Handlebars from 'handlebars'
import nodemailer from 'nodemailer'
import path from 'path'
import fs from 'fs'

import { IMailProvider, IMessage } from '../IMailProvider'
import { TypeEmail } from '../mailEnums'

class MailTrapProvider implements IMailProvider {
  readFileHtml(pathAddress: string, data: {}): string {
    const folder = fs.readFileSync(pathAddress, 'utf-8').toString()
    const file = Handlebars.compile(folder)
    const htmlToSend = file(data)
    return htmlToSend
  }

  async sendMail(message: IMessage, type: string): Promise<void> {
    let pageHtml: any
    if (type === TypeEmail.CONFIRM) {
      pageHtml = this.readFileHtml(path.join(path.resolve('./src/providers'), 'templates', 'email-confirmation.html'), {
        link: `$http://url-do-front/email-confirmation/?code=${message.code}`
      })
    } else {
      pageHtml = this.readFileHtml(path.join(path.resolve('./src/providers'), 'templates', 'esqueci-senha.html'), {
        code: message.code,
        link: `${process.env.WEB_SITE}/recoveryCode`,
      })
    }

    if(process.env.NODE_ENV !== 'test') {
      const transport = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: process.env.MAILTRAP_USER,
          pass: process.env.MAILTRAP_PASS,
        },
      })
  
      const msg = {
        from: process.env.MAIL,
        to: message.email,
        subject: message.subject,
        html: pageHtml,
      }
  
      await transport.sendMail(msg).catch((error) => console.log(error))
    }
  }
}

export default new MailTrapProvider()