import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {SchemaTypes, Types} from "mongoose";
import { AccountSchema } from "../../../schemas/account.schema";

export type UserDocument = User & Document;


@Schema()
export class User {
  @Prop({required: true, index: true, unique: true})
  userName: string;

  @Prop({required: true})
  password: string;

  @Prop({required: true, index: true})
  activationToken: string;

  @Prop({required: true, index: false})
  enabled: boolean;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  lastSignIn: Date;

  @Prop({required: true})
  firstName: string;

  @Prop({required: true})
  lastName: string;

  @Prop()
  title: string;

  @Prop()
  phone: string;

  @Prop()
  address: string;

  @Prop()
  apt: string;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  zipCode: string;

  @Prop()
  country: string;

  @Prop({required: true, unique: true, index: true})
  email: string;

  @Prop({required: true, default: false})
  superAdmin: boolean;

  @Prop({type: SchemaTypes.ObjectId, ref: AccountSchema.name})
  account: Types.ObjectId;

  @Prop()
  role: number;
  
  @Prop()
  accounts: any[];
  
  @Prop()
  hasCreatorBoxClicked?: boolean;

  @Prop()
  showCreatorBoxAttemptCount?: number;

  @Prop()
  showCreatorBoxDontShow?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
