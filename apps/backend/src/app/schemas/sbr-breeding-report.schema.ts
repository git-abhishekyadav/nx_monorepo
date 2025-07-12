import { Prop, Schema } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type SBRBreedingReportDocument = SBRBreedingReportSchema & Document;

@Schema()
export class SBRBreedingReportSchema {
  @Prop()
  year: number;

  @Prop({
    type: [String],
    enum: ['paint', 'bStock', 'quarter', 'thoroughbred'],
  })
  stallionBreedTypes: string[];

  @Prop()
  totalMaresBreeded: any[];

  @Prop()
  maresBredPerSBRColumn: string[];

  @Prop()
  maresBredPerSBR: any[];

  @Prop()
  totals: any[];

  @Prop()
  numberOfMares: any[];
}
