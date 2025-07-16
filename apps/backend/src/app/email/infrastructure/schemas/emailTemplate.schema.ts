import { Prop, Schema } from "@nestjs/mongoose"

@Schema()
export class EmailTemplateSchema {

  @Prop({required: true, index: true, unique: true})
  type: string;

  @Prop({default: ''})
  content: string;

  @Prop({default: ''})
  footer: string;

  @Prop({default: ''})
  subject: string;

}