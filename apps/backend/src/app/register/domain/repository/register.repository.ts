import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Asset } from '../../../schemas/asset.schema';

export type RegisterFilter = {
  email: string;
  password: string;
}


@Injectable()
export class RegisterRepository {
  constructor(
    @InjectModel(Asset.name) private assetModel: Model<Asset>,
  ) {}

  async getRegisteredAccount(filters: RegisterFilter) {
    
      const {email, password} = filters;
  
      const account = await this.assetModel
        .aggregate([
          {
            $match: {email, password}, 
          }
        ])
        .exec();
      if (!account || account.length === 0) {
        throw new Error('Account not found');
      }
      return { account };
  
  }

  
}
