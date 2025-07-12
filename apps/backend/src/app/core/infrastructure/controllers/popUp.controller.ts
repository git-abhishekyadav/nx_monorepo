import { Body, Controller, Get, Post } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { GetUserInfoQuery } from "../../application/queries/getUserInfo/getUserInfo.query";

@Controller('popUp')
export class PopUpController {

    constructor(
        private queryBus: QueryBus
    ) { }

    @Post('showCreatorPopUp')
    async getUserInfo(
        @Body() response: any
    ) {
        return this.queryBus.execute(
            new GetUserInfoQuery(response)
        )
    }
}