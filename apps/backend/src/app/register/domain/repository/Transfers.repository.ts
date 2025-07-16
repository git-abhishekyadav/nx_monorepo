import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TransferSchema } from '../../infrastructure/schemas/transfer.schema';
import { Model } from 'mongoose';

export type TransferFilters = {
  horseId?: string;
  fromDate?: Date;
  toDate?: Date;
  limit?: number;
  pageIndex?: number;
};

const months = {
  '01': 'January',
  '02': 'February',
  '03': 'March',
  '04': 'April',
  '05': 'May',
  '06': 'June',
  '07': 'July',
  '08': 'August',
  '09': 'September',
  '10': 'October',
  '11': 'November',
  '12': 'December',
};

@Injectable()
export class TransfersRepository {
  constructor(
    @InjectModel(TransferSchema.name)
    private transfersModel: Model<TransferSchema>
  ) {}

  async findByHorseIdOrDate(filters: TransferFilters) {
   
      const query = await this.buildQuery(filters);
  
      const transfers = await this.transfersModel
        .aggregate([
          {
            $match: query, 
          },
          {
            $sort: { receivedDate: -1 }, 
          },
          {
            $project: {
              horseId: 1,
              transferDate: 1,
              transferDate2: {
                $dateToString: {
                  format: '%m-%d-%Y',
                  date: '$transferDate',
                },
              },
              receivedDate: 1,
              completeDate2: {
                $dateToString: {
                  format: '%m-%d-%Y',
                  date: '$receivedDate',
                },
              }
            },
          },
          {
            $lookup: {
              from: 'assets',
              localField: 'horseId',
              foreignField: 'customerId',
              pipeline: [
                { $match: { deleted: false } }, 
                { $project: { horseName: '$name' } }, 
              ],
              as: 'horseData',
            },
          },
          {
            $unwind: {
              path: '$horseData',
              preserveNullAndEmptyArrays: true,
            },
          },
        ])
        .exec();
  
  
      
      const transfersPerMonthNumber = transfers.reduce((acc: any, transfer: any) => {
        const month = transfer['completeDate2'].split('-')[0];
        acc[month] = (acc[month] || 0) + 1;
        return acc;
      }, {});
  
      
      const transfersPerMonth = Object.keys(transfersPerMonthNumber).reduce((acc: any, item) => {
        acc[String(months[item])] = transfersPerMonthNumber[item];
        return acc;
      }, {});
  
      return { transfers, transfersPerMonth };
  
  }
  
  async buildQuery(filters: TransferFilters) {
    let matchFilter: any = {
      '$expr': {
        $regexMatch: {
          input: '$horseId',
          regex: /^[0-9]+$/ // Matches horseId with only numbers
        }
      }
    };
    const fromDate = new Date(filters.fromDate);
    const toDate = new Date(filters.toDate);
  
    if (filters.horseId) {
      matchFilter.horseId = filters.horseId; 
    }
  
    if (filters.fromDate && filters.toDate) {
      matchFilter.receivedDate = {
        $exists: true,
        $ne: null,
        ...(fromDate && { $gte: fromDate }),
        ...(toDate && { $lte: toDate }),
      };
    } else {
      matchFilter.receivedDate = {
        $exists: true,
        $ne: null
      };
    }

    return matchFilter;
  }
  
}
