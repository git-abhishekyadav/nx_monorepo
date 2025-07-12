import { Module } from "@nestjs/common";
import { MongooseModule, SchemaFactory } from "@nestjs/mongoose";
import { LeaseSchema } from "./schemas/lease.schema";
import { Asset, AssetsSchema } from '../../schemas/asset.schema';
import { AuthModule } from "../../auth/auth.module";
import { CqrsModule } from "@nestjs/cqrs";
import { LeaseRepository } from "../domain/repository/Lease.repository";
import { LeaseMapper } from "./mappers/lease.mapper";
import { LeaseController } from "./controller/lease.controller";
import { commandHandlers } from "../application/commands/commandHandlers";
import { TransferSchema } from "./schemas/transfer.schema";
import { TransfersController } from "./controller/transfer.controller";
// import { AssetRepository } from "../../exhibitor-relationships/infrastructure/repository/assets.repository";
import { QueryHandlers } from "../application/queries/queryHandlers";
import { TransfersRepository } from "../domain/repository/Transfers.repository";
import { HorseTransfersYearlyRepository } from "../domain/repository/HorseTransfersYearly.repository";


@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: Asset.name,
        schema: AssetsSchema,
        collection: 'assets',
      },
      {
        name: LeaseSchema.name,
        schema: SchemaFactory.createForClass(LeaseSchema),
        collection: 'leases'
      },
      {
        name: TransferSchema.name,
        schema: SchemaFactory.createForClass(TransferSchema),
        collection: 'transfers'
      }
    ]),
    AuthModule
  ],
  providers: [
    ...commandHandlers,
    ...QueryHandlers,

    LeaseRepository,
    TransfersRepository,
    LeaseMapper,
    HorseTransfersYearlyRepository
  ],
  controllers: [
    LeaseController,
    TransfersController
  ],
})
export class TransfersModule {}
