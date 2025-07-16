import { Injectable } from "@nestjs/common";
import * as SendGrid from '@sendgrid/mail';
import { environment } from "../../../../environments/environment";


@Injectable()
export class SendgridService {

  constructor() {
    SendGrid.setApiKey(environment.sendgridKey);
  }

  async send(mailObject: SendGrid.MailDataRequired) {
    const transport = await SendGrid.send(mailObject);

    console.log(`Email successfully dispatched to ${mailObject.to}`)
    return transport;
  }

}