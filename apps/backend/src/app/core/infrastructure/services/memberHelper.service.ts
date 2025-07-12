import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Asset } from "../../../schemas/asset.schema";
import { Model } from 'mongoose';
import { MemberAphaId } from "../../domain/model/memberAphaId";
// import { any } from "@halo/showday-interface";

@Injectable()
export class anyHelperService {

  /*
    Must add this on module to use
    {
      name: Asset.name,
      schema: AssetsSchema,
      collection: 'assets'
    },
  */
  constructor(
    @InjectModel(Asset.name) private assetModel: Model<Asset>,
  ) {}

  async getanyByAccountId(accountId: string): Promise<any> {
    const asset = await this.assetModel.findOne({
      type: 'showday',
      subtype: 'member',
      account: accountId,
      deleted: false
    })
      .lean()
      .exec();

    if (!asset) {
      throw new HttpException(`Member asset not found with accountId: ${accountId}`, HttpStatus.NOT_FOUND);
    }

    return asset as unknown as any;
  }

  async getAssetByAphaId(aphaId: MemberAphaId): Promise<any> {
    const asset = await this.assetModel.findOne({customerId: aphaId.toString(), deleted: false})
      .lean()
      .exec();

    return asset as unknown as any;
  }

  async getAsset(query:any): Promise<any> {
    const asset = await this.assetModel.findOne({...query, deleted: false})
      .lean()
      .exec();

    return asset as unknown as any;
  }

}
