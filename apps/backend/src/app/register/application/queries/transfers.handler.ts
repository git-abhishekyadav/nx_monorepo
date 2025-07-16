import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TransferFilters, TransfersRepository } from '../../domain/repository/Transfers.repository';
import { TransfersQuery } from './transfers.query';

@QueryHandler(TransfersQuery)
export class GetTransfersQuery
  implements IQueryHandler<TransfersQuery>
{

  constructor(
    private transfersRepository: TransfersRepository
  ) {}

  async execute(query: TransfersQuery): Promise<any> {
    try {
      let filters: TransferFilters = {};
      for(const key in query) {
        if(query[key]) {
          filters[key] = query[key];
        }
      }

      const horseTransferData = await this.transfersRepository.findByHorseIdOrDate(filters);
      return horseTransferData;
    }
    catch(error) {
      throw new Error(error);
    }
  }


}
