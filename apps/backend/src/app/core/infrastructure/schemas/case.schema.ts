import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';


@Schema()
export class CaseSchema {

  @Prop({ type: Date, index: false })
  createdAt: Date;

  @Prop({ type: Date, index: false })
  updatedAt: Date;

  @Prop({ type: String, index: false, required: true })
  type: string;

  @Prop({ type: String, index: false, required: true })
  subtype: string;

  @Prop({ type: String, index: false, required: true })
  state: string;

  @Prop({ type: String, required: true, index: true, unique: true })
  guid: string;

  @Prop({ type: Boolean, index: false, default: false })
  deleted: boolean;

  @Prop({ type: Boolean, index: false, default: false })
  archived: boolean;

  @Prop({ type: SchemaTypes.Mixed })
  data: any;

  @Prop({ type: SchemaTypes.Mixed })
  order: any;

  @Prop({ type: String, index: false, required: true })
  paymentStatus :string

  @Prop({ type: String, index: false, required: false })
   orderId:string
}

