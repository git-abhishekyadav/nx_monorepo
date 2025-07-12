import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import {
//   CaseKind,
//   INeoCasePaymentDetails,
//   NeoCaseStatus,
//   Priority,
// } from '@halo/showday-interface';

@Schema({ discriminatorKey: 'kind' })
export class NeoCaseSchema {
  @Prop({ type: String, required: true})
  kind: any;

  @Prop({ type: String, required: true })
  guid: string;

  @Prop({
    type: String,
  })
  status: string;

  @Prop({
    type: String,
  })
  priority: any;

  @Prop({ type: Boolean, default: false })
  archived: boolean;

  @Prop({ type: Boolean, default: false })
  deleted: boolean;

  @Prop({ type: Date, default: Date.now })
  created: Date;

  @Prop({ type: Date })
  updated: Date;

  @Prop({ type: String })
  userGuid: string;

  @Prop({ type: String })
  userAccount: string;

  @Prop({ type: String })
  creator: string;

  @Prop({ type: String })
  subType: string;

  @Prop({ type: String })
  division: string;

  @Prop({ type: String })
  action: string;

  @Prop({ type: Object })
  paymentDetails: any;
}