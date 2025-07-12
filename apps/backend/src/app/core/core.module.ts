import { Module } from "@nestjs/common";
import { PopUpController } from "./infrastructure/controllers/popUp.controller";
import { queryHandlers } from "../core/application/queries/queryHandler";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule, SchemaFactory } from "@nestjs/mongoose";
import { User } from "./infrastructure/schemas/user.schema";
import {eventHandlers} from "./domain/events/eventHandlers"
@Module({
    imports: [
        CqrsModule,
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: SchemaFactory.createForClass(User),
                collection: 'users',
              },
        ])
    ],
    controllers : [
        PopUpController
    ],
    providers: [
        ...queryHandlers,
        ...eventHandlers
    ]
})
export class CoreModule {}
