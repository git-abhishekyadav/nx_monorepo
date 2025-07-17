import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Asset, AssetsSchema } from '../schemas/asset.schema';
import { AuthModule } from "../auth/auth.module";
import { CqrsModule } from "@nestjs/cqrs";
import { commandHandlers } from "./application/commands/commandHandlers";
// import { AssetRepository } from "../../exhibitor-relationships/infrastructure/repository/assets.repository";
import { RegisterController } from "./infrastructure/controller/register.controller";
import { RegisterRepository } from "./domain/repository/register.repository";


@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: Asset.name,
        schema: AssetsSchema,
        collection: 'assets',
      }
    ]),
    AuthModule
  ],
  providers: [
    ...commandHandlers,
    RegisterRepository
  ],
  controllers: [
    RegisterController
  ],
    exports: [RegisterRepository]

})
export class RegisterModule {}
