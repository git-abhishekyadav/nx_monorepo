import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { TransferSchema } from "../../infrastructure/schemas/transfer.schema";
import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";

export type TransferFilters = {
		horseId?: string;
		fromDate?: string;
		toDate?: string;
		index?: number;
		limit?: number;
};

@Injectable()
export class HorseTransfersYearlyRepository {
	constructor(
		@InjectModel(TransferSchema.name) private transfersModel: Model<TransferSchema>
	) {}

	async getYearlyTransfers(payload: TransferFilters) {
		try {
			const query = await this.buildQuery(payload);
			const getHorseTransferData = await this.transfersModel.aggregate([
				{
					$match: query
				},
				{
					$group: {
						_id: {
							year: { $year: "$receivedDate" },
							month: { $month: "$receivedDate" },
						},
						count: { $sum: 1 },
					},
				},
				{
					$project: {
						_id: 0,
						year: "$_id.year",
						month: "$_id.month",
						count: 1,
					},
				},
				{
					$group: {
						_id: "$year",
						months: {
							$push: {
							k: {
								$switch: {
								branches: [
									{
									case: {
										$eq: ["$month", 1],
									},
									then: "Jan",
									},
									{
									case: {
										$eq: ["$month", 2],
									},
									then: "Feb",
									},
									{
									case: {
										$eq: ["$month", 3],
									},
									then: "Mar",
									},
									{
									case: {
										$eq: ["$month", 4],
									},
									then: "Apr",
									},
									{
									case: {
										$eq: ["$month", 5],
									},
									then: "May",
									},
									{
									case: {
										$eq: ["$month", 6],
									},
									then: "Jun",
									},
									{
									case: {
										$eq: ["$month", 7],
									},
									then: "Jul",
									},
									{
									case: {
										$eq: ["$month", 8],
									},
									then: "Aug",
									},
									{
									case: {
										$eq: ["$month", 9],
									},
									then: "Sep",
									},
									{
									case: {
										$eq: ["$month", 10],
									},
									then: "Oct",
									},
									{
									case: {
										$eq: ["$month", 11],
									},
									then: "Nov",
									},
									{
									case: {
										$eq: ["$month", 12],
									},
									then: "Dec",
									},
								],
								default: "Unknown",
								},
							},
							v: "$count",
							},
						},
					},
				},
				{
					$sort: {
						_id: -1,
					},
				},
				{
					$limit: 4
				}
			], {allowDiskUse: true}).exec();
			
			const formatData = await this.formatHorseData(getHorseTransferData);

			return {horseData: formatData};
		} catch(error) {
			return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async buildQuery(filters:TransferFilters) {
		let matchFilter: any = {};
		const timeZone = 'America/Los_Angeles';
		let formattedFromDate: Date;
		let formattedToDate: Date;
		if (filters.horseId && filters.horseId !== '') {
			matchFilter.horseId = filters.horseId;
		}

		if ((filters?.fromDate && filters?.fromDate !== undefined) && (filters?.toDate && filters?.toDate !== undefined)) {
			const fromDate = new Date(filters.fromDate);
			const toDate = new Date(filters.toDate);
			
			formattedFromDate = fromDate;
			formattedToDate = toDate;
		} else {
			const currentYear = new Date();
			const dateFrom = new Date(currentYear);
			dateFrom.setFullYear(currentYear.getFullYear() - 4);
			dateFrom.setMonth(0);
			dateFrom.setDate(1);

			formattedFromDate = dateFrom;
			formattedToDate = currentYear;
		}

		matchFilter.receivedDate = {
			$exists: true,
			$ne: null,
			...(formattedFromDate && { $gte: new Date(formattedFromDate) }),
			...(formattedToDate && { $lte: new Date(formattedToDate) }),
		};
		return matchFilter;
	}

	async formatHorseData(horseData: any) {
		const monthsArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		const newData = [];
		for (const data of horseData) {
			const newDataEntry = {
			year: 0,
			totalRegistrations: 0,
			months: []
			};
			newDataEntry.year = data._id;
	
			for (const monthOfYear of monthsArray) {
			let found = false;
			for (var i = 0; i < data.months.length; i++) {
				const horseMonth = data.months[i].k;
				if (horseMonth === monthOfYear) {
				newDataEntry.months.push({
					[`${monthOfYear}`]: data.months[i].v
				});
				newDataEntry.totalRegistrations += data.months[i].v;
				found = true;
				break;
				}
			}
		
			if (!found) {
				newDataEntry.months.push({
				[`${monthOfYear}`]: 0
				});
			}
			}
			newData.push(newDataEntry);
		}

		const currentYear = new Date();
		const fromYear = new Date(currentYear);
		fromYear.setFullYear(currentYear.getFullYear() - 3);
		const formattedData = [];
		for (let i = fromYear.getFullYear(); i <= currentYear.getFullYear(); i++) {
			let status = false;
			for (const data of newData) {
				if (i === data.year) {
					formattedData.push(data);
					status = true;
					break;
				}
			}
			
			if (!status) {
				const dataTemp = {
				year: i,
				totalRegistrations: 0,
				months: Array.from({ length: 12 }, (_, index) => ({ [this.getMonthName(index)]: 0 })),
				};
				formattedData.push(dataTemp);
			}
		}
		formattedData.sort((a, b) => b.year - a.year);

		return formattedData;
	}

	private getMonthName(index: number): string {
		const months = [
			'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
		];
		return months[index];
	}
	
}