import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type FoalNominationStatusDocument = FoalNominationStatusReport & Document;

@Schema()
export class FoalNominationStatusReport {
  @Prop()
  stallionId : string;

  @Prop()
  stallionName : string;

  @Prop()
  breedingYear : string;

  @Prop()
  mareId : string;

  @Prop()
  mareName : string;
}

export const FoalNominationStatusSchema = SchemaFactory.createForClass(FoalNominationStatusReport);