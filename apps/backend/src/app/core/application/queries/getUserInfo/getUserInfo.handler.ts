import { EventBus, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetUserInfoQuery } from "./getUserInfo.query";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../../../infrastructure/schemas/user.schema";
import { Model } from 'mongoose';
// import { Role } from "../../../auth/interfaces/roles";
import { ShowProducerAccessEmailEvent } from "../../../domain/events/showProducerAccessEmail/showProducerAccessEmail.event";


@QueryHandler(GetUserInfoQuery)
export class GetUserInfoHandler implements IQueryHandler<GetUserInfoQuery> {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        public eventBus: EventBus
    ) { }
    async execute(query: GetUserInfoQuery): Promise<any> {
        const userId = query.response.user._id;
        const response = query.response.response
        const userData = await this.userModel.findOne({ _id: userId })
        if (response === "Yes") {
            return await this.userModel.updateOne({ _id: userId }, {
                $set: { role: 2, hasCreatorBoxClicked: true }
            }
            );
        }
        else if (response === 'dontShow') {
            return await this.userModel.updateOne({ _id: userId }, {
                $set: { showCreatorBoxDontShow: true }
            })
        }
        else if (!response) {
            const existingCount = userData.showCreatorBoxAttemptCount || 0;
            const count = existingCount + 1;
            const op = await this.userModel.updateOne({ _id: userId }, {
                $set: { showCreatorBoxAttemptCount: count }
            });
            if(userData?.email){
              const sendEmail = this.eventBus.publish(
                new ShowProducerAccessEmailEvent(
                  userData.email,
                  {
                    memberName: userData.firstName || userData.lastName,
                    logInUrl: query.response?.url,
                  },
                  "show-producer-access",
                )
              );
            }

            return op
        }
    }
}
