import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type AssetsDocument = Asset & Document;

@Schema()
export class Asset {
  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop({ type: String, required: true, index: true, unique: true })
  guid: string;

  // @Prop({ type: String, required: true, index: true })
  // name: string;

  // @Prop({ type: String, index: true, required: true  })
  // type: string;

  // @Prop({ type: String, index: true, required: true })
  // subtype: string;

  // @Prop({ type: String, required: false, index: true })
  // customerId: string;

  // @Prop({ type: String, required: false, index: true })
  // primaryCustomerId: string;

  // @Prop({ type: String, required: false, index: true })
  // secondaryCustomerId: string;

  // @Prop({ type: String, required: false, index: true })
  // showRefNo: string;

  // @Prop({type: Boolean, required: true, index: true , default : false})
  // deleted: boolean;

  // @Prop({type: Boolean,index: true})
  // archived: boolean;

  // @Prop()
  // dirty: boolean;

  // @Prop({ type: mongoose.Schema.Types.ObjectId })
  // domain: any;

  // @Prop({ type: mongoose.Schema.Types.ObjectId })
  // assetTemplateId: any;

  // @Prop({ type: mongoose.Schema.Types.ObjectId })
  // assetMasterTemplateId: any;

  // @Prop({ type: mongoose.Schema.Types.ObjectId })
  // account: any;

  // @Prop({ type: String, required: true })
  // accountName: string;

  // @Prop({ type: mongoose.Schema.Types.Mixed })
  // history: any;

  // @Prop({ type: mongoose.Schema.Types.Mixed })
  // notes: any;

  // @Prop({ type: mongoose.Schema.Types.Mixed })
  // media: any;

  // @Prop({ type: mongoose.Schema.Types.Mixed })
  // video: any;

  // @Prop({ type: mongoose.Schema.Types.Mixed })
  // documents: any;

  // @Prop({ type: mongoose.Schema.Types.Mixed })
  // data: any;

  // @Prop({ type: mongoose.Schema.Types.Mixed })
  // customerSyncRecords: any;

  // @Prop({ index: true})
  // memberName?: string;

  // @Prop()
  // memberEmail?: string;

    @Prop({ index: true})
    email: string;

    @Prop()
    password: string;

}

export const AssetsSchema = SchemaFactory.createForClass(Asset);
