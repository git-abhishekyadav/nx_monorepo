import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class MembershipHistorySchema {
  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;

  @Prop({ type: Date, index: true })
  beginDate: Date;

  @Prop({ type: Date, index: true })
  expirationDate: Date;

  @Prop({ type: String, index: true })
  memberId: String;

  @Prop({ type: String, index: true })
  memberGuid: String;

  @Prop({ type: String, index: true })
  caseGuid: String;

  @Prop({ type: String, index: true })
  membershipTerm: String;

  @Prop({ type: String, index: true })
  membershipType: String;

  @Prop({ type: String })
  workOrderNumber: String;

  @Prop({ type: String })
  workOrderItemNumber: String;

  @Prop({ type: String })
  baseIncome: String;

  @Prop({ type: String })
  monthlyIncome: String;

  @Prop({ type: String })
  ytdIncome: String;

  @Prop({ type: String })
  toDateIncome: String;

  @Prop({ type: String, index: true })
  status: String;
};