import { EntitySchemaFactory } from "../../../database/entity-schema.factory";
import { EmailTemplate } from "../../domain/model/EmailTemplate";
import { EmailTemplateSchema } from "../schemas/emailTemplate.schema";

export class EmailTemplateMapper implements EntitySchemaFactory<EmailTemplateSchema, EmailTemplate> {
  
  toDomain(entitySchema: EmailTemplateSchema): EmailTemplate {
    return EmailTemplate.create(entitySchema);
  }

  toPersistance(entity: EmailTemplate): EmailTemplateSchema {
    return {
      type: entity.getType(),
      content: entity.getContent(),
      footer: entity.getFooter(),
      subject: entity.getSubject()
    };
  }

}