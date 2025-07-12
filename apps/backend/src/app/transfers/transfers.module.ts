import { Module } from '@nestjs/common';
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule, SchemaFactory } from "@nestjs/mongoose";
import { AuthModule } from "../auth/auth.module";
import { TransferSchema } from './infrastructure/schemas/transfer.schema';

@Module({
  imports: [
    CqrsModule,
    AuthModule,
    MongooseModule.forFeature([
      {
        name: TransferSchema.name,
        schema: SchemaFactory.createForClass(TransferSchema),
        collection: 'transfers'
      }
    ])
  ],
})
export class TransfersModule {};
