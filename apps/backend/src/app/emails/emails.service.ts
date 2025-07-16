import { SendGridService } from '@anchan828/nest-sendgrid';
import { Injectable } from '@nestjs/common';
import * as ejs from 'ejs';
import { readFileSync } from 'fs';
import * as path from 'path';

@Injectable()
export class EmailsService {
  constructor(private readonly sendGrid: SendGridService) {}

  private async renderEmailBody(templateName: string, data: any) {
    const route = path.join(
      __dirname,
      '../../../apps/showday-api/src/app/emails/templates/' +
        templateName +
        '.ejs'
    );
    const file = await readFileSync(route, 'utf8');
    return await ejs
      .render(file, data, { async: true })
      .then(async (renderedHtml) => {
        const template = await this.getEmailTemplate(renderedHtml);
        return template;
      })
      .catch((error) => {
        return error;
      });
  }

  private async getEmailTemplate(body: any) {
    const route = path.join(
      __dirname,
      '../../../apps/showday-api/src/app/emails/templates/' +
        'mainTemplate' +
        '.ejs'
    );
    const dataObj = {
      body,
      hasSignOff: null,
      hasCustomFooter: null,
    };
    const file = await readFileSync(route, 'utf8');
    return await ejs
      .render(file, dataObj, { async: true })
      .then((renderedHtml) => {
        return renderedHtml;
      })
      .catch((error) => {
        return error;
      });
  }

  private async emailSendGrid(
    from: string,
    to: string,
    subject: string,
    text: string,
    template: any
  ) {
    return await this.sendGrid.send({
      from: from ? from : 'noreply@innate.ly',
      to: to,
      subject: subject,
      text: text,
      html: template,
    });
  }

  async sendEmail(
    emailData: {
      from?: string;
      to: string;
      subject: string;
      text?: string;
      templateName: string;
    },
    templateData: any
  ) {
    const renderedEmail = await this.renderEmailBody(
      emailData.templateName,
      templateData
    );

    return await this.emailSendGrid(
      emailData.from,
      emailData.to,
      emailData.subject,
      emailData.text,
      renderedEmail
    )
      .then((success) => {
        return success;
      })
      .catch((error) => {
        return error;
      });
  }
}
