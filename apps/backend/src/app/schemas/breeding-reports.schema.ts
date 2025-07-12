import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BreedingReportsDocuments = BreedingReports & Document;

@Schema()
export class BreedingReports {
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

export const BreedingReportsSchema = SchemaFactory.createForClass(BreedingReports);