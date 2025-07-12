import { Prop, Schema } from '@nestjs/mongoose';
import {  SchemaTypes, Types } from 'mongoose';

@Schema()
export class AssetReservedSchema {
  @Prop({ type: String, required: true, index: true })
  name: string;

  @Prop({ type: Date, index: false })
  createdAt: Date;

  @Prop({ type: Date, index: false })
  updatedAt: Date;

  @Prop({ type: String, index: false, required: true })
  type: string;

  @Prop({ type: String, index: false, required: true })
  subtype: string;

  @Prop({ type: String, required: true, index: true, unique: true })
  guid: string;

  @Prop({ type: String, required: false, index: true })
  customerId: string;

  @Prop({ type: String, required: false, index: true })
  primaryCustomerId: string;

  @Prop({ type: String, required: false, index: true })
  secondaryCustomerId: string;

  @Prop({ type: String, required: false, index: true })
  showRefNo: string;

  @Prop({ type: Boolean, index: false, default: false })
  deleted: boolean;

  @Prop({ type: Boolean, index: false, default: false })
  archived: boolean;

  @Prop({ type: Boolean, index: false, default: false })
  dirty: boolean;

  @Prop({ type: SchemaTypes.ObjectId, required: true, index: false })
  domain: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, required: false, ref: 'AssetTemplate' })
  assetTemplateId: Types.ObjectId;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: false,
    ref: 'AssetMasterTemplate',
  })
  assetMasterTemplateId: Types.ObjectId;

  @Prop({ type: String, required: true })
  accountName: string;

  @Prop({ type: SchemaTypes.ObjectId })
  account: Types.ObjectId;

  @Prop({ type: [Object], required: true })
  history: [
    {
      user: string;
      time: Date;
      activity: string;
      event: string;
    }
  ];

  @Prop({ type: [Object], required: true })
  notes: [
    {
      date: string;
      activity: string;
      user: string;
      content: string;
      userRole: number;
    }
  ];

  @Prop({ type: [Object], required: true })
  media: [
    {
      date: string;
      activity: string;
      user: string;
      URL: string;
      thumbURL: string;
      primary: boolean;
      mediaType: string;
      isProfile: boolean;
      isCertificate: boolean;
    }
  ];

  @Prop({ type: [Object], required: true })
  video: [
    {
      date: string;
      activity: string;
      user: string;
      URL: string;
      mediaType: string;
      source: [{ type: Types.ObjectId }];
    }
  ];

  @Prop({ type: [Object], required: true })
  documents: [
    {
      date: string;
      activity: string;
      user: string;
      URL: string;
      fileName: string;
    }
  ];

  @Prop({ type: SchemaTypes.Mixed, index: true })
  data: Types.ObjectId;

  @Prop({ type: [Object], required: true })
  customerSyncRecords: [
    {
      completed: boolean;
      date: Date;
      syncId: string;
    }
  ];
}