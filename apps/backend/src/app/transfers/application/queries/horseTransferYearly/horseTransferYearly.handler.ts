import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { HorseTransferYearlyQuery } from "./horseTransferYearly.query";
import { HttpException, HttpStatus } from "@nestjs/common";
import { HorseTransfersYearlyRepository } from "../../../domain/repository/HorseTransfersYearly.repository";

@QueryHandler(HorseTransferYearlyQuery)
export class HorseTransferYearlyHandler implements IQueryHandler<HorseTransferYearlyQuery> {
    constructor(
        private readonly horseTransferYearlyRepository: HorseTransfersYearlyRepository
    ) {}

    async execute(query: HorseTransferYearlyQuery): Promise<any> {
        try {
            const horseTransferYearlyData = await this.horseTransferYearlyRepository.getYearlyTransfers(query);
            return horseTransferYearlyData;
        } catch (error) {
            return new HttpException(error.meesage, HttpStatus.INTERNAL_SERVER_ERROR);
        } 
    }
}