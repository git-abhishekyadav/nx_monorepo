import { CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { EmailTemplateRepository } from "../../../domain/repository/emailTemplate.repository";
import { MjmlService } from "../../../infrastructure/services/mjml.service";
import { SendgridService } from "../../../infrastructure/services/sendgrid.service";
import { mainTemplate } from "../../../infrastructure/templates/mainTemplate";
import { SendEmailCommand } from "./sendEmail.command";
import Handlebars from "handlebars/dist/handlebars.js"
import { throwError } from "rxjs";
import { environment } from "../../../../../../src/environments/environment";


@CommandHandler(SendEmailCommand)
export class SendEmailHandler implements ICommandHandler<SendEmailCommand> {

  constructor(
    private sendgridService: SendgridService,
    private emailTemplateRepo: EmailTemplateRepository,
    private mjmlService: MjmlService,
    public eventBus: EventBus
  ) {}

  async execute(command: SendEmailCommand): Promise<any> {

    const template = await this.emailTemplateRepo.findOneByType(command.type);

    if (!template) {
      throw Error('Template not found');
    }

    // substitute first the template from the DB with substitutions object
    const finalSubstitutions = {
      content: null,
      footer: null
    };

    let subject = template.getSubject();

    if (template.getContent()) {
      finalSubstitutions.content = Handlebars.compile(template.getContent())(command.substitutions);
    }

    if (template.getFooter()) {
      finalSubstitutions.footer = Handlebars.compile(template.getFooter())(command.substitutions);
    }

    if (template.getSubject()) {
      subject = Handlebars.compile(template.getSubject())(command.substitutions);
    }

    const handlebarsTemplate = Handlebars.compile(mainTemplate);
    const mjmlTemplate = handlebarsTemplate(finalSubstitutions);

    const mjmlCompiled = this.mjmlService.convertMjmlToHtml(mjmlTemplate);

    const mailObject = {
      to: command.email,
      from: {
        email: environment.noReplyAphaMail,
        name: 'APHA'
      },
      subject: subject,
      html: mjmlCompiled.html,
    }

    if(command.sendAttachment && command.emailAttachments) {
      mailObject['attachments'] = [
        {
          content: command.emailAttachments[0],
          filename: `Show Card`,
          type: 'application/pdf',
          disposition: 'attachment',
          content_id: 'mytext',
        },
      ];
    }

    try {
      await this.sendgridService.send(mailObject);
    } catch(error) {
      throwError(error);
    }

    // if (command.cronId) {
    //   this.eventBus.publish(new EmailSentWithCronTaskEvent(command.cronId));
    // }

  }
}