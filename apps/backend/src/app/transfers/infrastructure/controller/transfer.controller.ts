import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { TransfersQuery } from "../../application/queries/transfers.query";
import { HorseTransferYearlyQuery } from "../../application/queries/horseTransferYearly/horseTransferYearly.query";

@Controller('login')
export class TransfersController {
  constructor(
    private queryBus: QueryBus
  ) {}

  @Post('')
  async queryTransfers(
    @Body('horseId') horseId: string,
    @Body('dateFrom') dateFrom: string,
    @Body('dateTo') dateTo: string
  ) {
    let dateF: string;
    let dateT: string;
    if(dateFrom) {
      dateF = new Date(dateFrom).toISOString();
    }
    if(dateTo) {
      dateT = new Date(dateTo).toISOString();
    }
    return this.queryBus.execute(
      new TransfersQuery(horseId, dateF, dateT)
    );
  }

  @Post('transfer-yearly')
  async horseTrasnferYearly(
    @Body('horseId') horseId ?: string,
    @Body('fromDate') fromDate ?: string,
    @Body('toDate') toDate ?: string,
    @Body('index') index ?: number,
    @Body('limit') limit ?: number,
  ) {
    return this.queryBus.execute(
      new HorseTransferYearlyQuery(horseId, fromDate, toDate, index, limit)
    );
  }

}
