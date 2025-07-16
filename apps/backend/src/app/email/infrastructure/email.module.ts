import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule, SchemaFactory } from "@nestjs/mongoose";
import { commandHandlers } from "../application/commands/commandHandlers";
import { EmailTemplateRepository } from "../domain/repository/emailTemplate.repository";
import { EmailTemplateMapper } from "./mappers/emailTemplate.mapper";
import { ShowEmailSagas } from "./sagas/showEmail.saga";
import { EmailTemplateSchema } from "./schemas/emailTemplate.schema";
import { MjmlService } from "./services/mjml.service";
import { SendgridService } from "./services/sendgrid.service";


@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: EmailTemplateSchema.name,
        schema: SchemaFactory.createForClass(EmailTemplateSchema),
        collection: 'emailTemplates',
      }
    ])
  ],
  providers: [
    ...commandHandlers,

    MjmlService,
    SendgridService,

    EmailTemplateMapper,
    EmailTemplateRepository,

    ShowEmailSagas
  ],
  exports: []
})
export class EmailModule {};