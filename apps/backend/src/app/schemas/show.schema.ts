import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type ShowsDocument = Show & Document;

@Schema()
export class Show {
  @Prop()
  creatorEmail: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  guid: String;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  showResultInfo: any;
}

export const ShowsSchema = SchemaFactory.createForClass(Show);
