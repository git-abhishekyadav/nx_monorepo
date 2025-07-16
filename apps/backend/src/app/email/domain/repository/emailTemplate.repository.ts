import { InjectModel } from "@nestjs/mongoose";
import { EmailTemplateMapper } from "../../infrastructure/mappers/emailTemplate.mapper";
import { EmailTemplateSchema } from "../../infrastructure/schemas/emailTemplate.schema";
import { EmailTemplate } from "../model/EmailTemplate";
import { Model } from "mongoose";


export class EmailTemplateRepository {

  constructor(
    private mapper: EmailTemplateMapper,
    @InjectModel(EmailTemplateSchema.name) private emailTemplateModel: Model<EmailTemplateSchema>,
  ) {}

  async findOneByType(type: string): Promise<EmailTemplate> {
    const emailTemplate = await this.emailTemplateModel.findOne({type}).lean().exec();
    return this.mapper.toDomain(emailTemplate);
  }

  async create(emailTemplate: EmailTemplate): Promise<void> {
    await this.emailTemplateModel.create(this.mapper.toPersistance(emailTemplate));
  }

  async update(emailTemplate: EmailTemplate): Promise<void> {
    await this.emailTemplateModel.updateOne({type: emailTemplate.getType()}, this.mapper.toPersistance(emailTemplate));
  }

}