import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { Asset } from '../../../../schemas/asset.schema';
import { LeaseRepository } from "../../../domain/repository/Lease.repository";
import { HorseRegistrationNumber } from "../../../../core/domain/model/horseRegistrationNumber";
import { Lease } from "../../../domain/model/Lease";
import { LeaseGuid } from "../../../domain/model/leaseGuid";
import { LeaseStatus } from "../../../domain/model/leaseStatus";
import { LeaseType } from "../../../domain/model/leaseType";
import { MemberAphaId } from "../../../../core/domain/model/memberAphaId";
import { ImportShowLeasesFromHorsesCommand } from "./importShowLeasesFromHorses.command";


@CommandHandler(ImportShowLeasesFromHorsesCommand)
export class ImportShowLeasesFromHorsesHandler implements ICommandHandler<ImportShowLeasesFromHorsesCommand> {
  
  constructor(
    @InjectModel(Asset.name) private assetModel: Model<Asset>,
    private leaseRepository: LeaseRepository
  ) {}
  
  async execute(command: ImportShowLeasesFromHorsesCommand): Promise<any> {

    const cursor:any = this.assetModel.find({subtype: 'horse', deleted: false, archived: false, 'data.lessees': {$exists: true, $ne: []}}).cursor();

    let i = 0;
    for await (const horse of cursor){
      // console.log(horse.guid);
      // console.log(horse.data.lessees);

      console.log(i);

      i+=horse.data.lessees.length;

      const horseGuid = horse.guid;
      const horseId = HorseRegistrationNumber.create(horse.customerId);

      try {

        const leases = [];
        
        for(let each of horse.data.lessees) {

          let owner = null;

          if (!each.leaseFromAphaIdNumber && each.ownerGuid) {
            owner = await this.assetModel.findOne({guid: each.ownerGuid}).lean().exec();
            
          }

          leases.push(
            Lease.create({
              ...each,
              horseId,
              horseGuid,
              guid: !each.guid || each.guid === '' ? LeaseGuid.generate() : each.guid,
              leaseStatus: LeaseStatus.fromString(each.leaseStatus),
              leaseType: LeaseType.fromString(each.leaseType),
              beginningDate: new Date(each.beginningDate),
              endingDate: each.endingDate ? new Date(each.endingDate) : null,
              leaseFromAphaIdNumber: each.leaseFromAphaIdNumber ? MemberAphaId.create(each.leaseFromAphaIdNumber): owner?.customerId ? MemberAphaId.create(owner.customerId) : null,
              leaseToAphaIdNumber: MemberAphaId.create(each.leaseToAphaIdNumber)
            })
          );
        }

        const promises = leases.map((eachLease: Lease) => this.leaseRepository.create(eachLease));

        await Promise.all(promises);

      } catch(err) {
        console.log(err)
      }

    }

    console.log('-------DONE-----');

  }

}