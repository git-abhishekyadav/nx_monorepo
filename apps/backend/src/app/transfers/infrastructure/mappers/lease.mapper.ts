import { HorseRegistrationNumber } from "../../../core/domain/model/horseRegistrationNumber";
import { MemberAphaId } from "../../../core/domain/model/memberAphaId";
import { EntitySchemaFactory } from "../../../database/entity-schema.factory";
import { Lease } from "../../domain/model/Lease";
import { LeaseGuid } from "../../domain/model/leaseGuid";
import { LeaseStatus } from "../../domain/model/leaseStatus";
import { LeaseType } from "../../domain/model/leaseType";
import { LeaseSchema } from "../schemas/lease.schema";

export class LeaseMapper implements EntitySchemaFactory<LeaseSchema, Lease> {
  
  toPersistance(entity: Lease): LeaseSchema {
    return {
      guid: entity.getGuid().toString(),
      horseId: entity.getHorseId().toString(),
      horseGuid: entity.getHorseGuid(),

      leaseeGuid: entity.getLeaseeGuid(),
      ownerGuid: entity.getOwnerGuid(),
      leaseStatus: entity.getLeaseStatus()?.toString(),
      leaseType: entity.getLeaseType()?.toString(),
      beginningDate: entity.getBeginningDate(),
	    endingDate: entity.getEndingDate(),
      leaseFromName: entity.getLeaseFromName(),
      leaseFromAphaIdNumber: entity.getLeaseFromAphaIdNumber()?.toString(),
      leaseFromAddress: entity.getLeaseFromAddress(),
      leaseFromCity: entity.getLeaseFromCity(),
      leaseFromState: entity.getLeaseFromState(),
      leaseFromPostalCode: entity.getLeaseFromPostalCode(),
      leaseFromPhoneNumber: entity.getLeaseFromPhoneNumber(),
    	leaseFromEmail: entity.getLeaseFromEmail(),
      leaseToName: entity.getLeaseToName(),
	    leaseToAphaIdNumber: entity.getLeaseToAphaIdNumber()?.toString(),
	    leaseToAddress: entity.getLeaseToAddress(),
	    leaseToCity: entity.getLeaseToCity(),
      leaseToState: entity.getLeaseToState(),
      leaseToPostalCode: entity.getLeaseToPostalCode(),
	    leaseToPhoneNumber: entity.getLeaseToPhoneNumber(),
      leaseToEmail: entity.getLeaseToEmail(),
      leaseAccountId: entity.getLeaseAccountId(),
	    leaseAccountName: entity.getLeaseAccountName(),
      AS400Sync: entity.isAS400Sync(),
      receivedDate: entity.getReceivedDate()
    }
  }
  
  toDomain(entitySchema: LeaseSchema): Lease {
    return Lease.create({
      guid: LeaseGuid.fromString(entitySchema.guid),
      // horseId:"345345",
      horseId: HorseRegistrationNumber.create(entitySchema.horseGuid),
      horseGuid: entitySchema.horseGuid,

	    leaseeGuid: entitySchema.leaseeGuid,
      ownerGuid: entitySchema.ownerGuid,
      leaseStatus: LeaseStatus.fromString(entitySchema.leaseStatus),
      leaseType: LeaseType.fromString(entitySchema.leaseType),
      beginningDate: new Date(entitySchema.beginningDate),
      endingDate: new Date(entitySchema.endingDate),

      leaseFromName: entitySchema.leaseFromName,
      // leaseFromAphaIdNumber: "35345234",
      leaseFromAphaIdNumber: MemberAphaId.create(entitySchema.leaseFromAphaIdNumber),
      leaseFromAddress: entitySchema.leaseFromAddress,
      leaseFromCity: entitySchema.leaseFromCity,
      leaseFromState: entitySchema.leaseFromState,
      leaseFromPostalCode: entitySchema.leaseFromPostalCode,
      leaseFromPhoneNumber: entitySchema.leaseFromPhoneNumber,
      leaseFromEmail: entitySchema.leaseFromEmail,

      leaseToName: entitySchema.leaseToName,
      // leaseToAphaIdNumber: "234234",
      leaseToAphaIdNumber: MemberAphaId.create(entitySchema.leaseToAphaIdNumber),
      leaseToAddress: entitySchema.leaseToAddress,
      leaseToCity: entitySchema.leaseToCity,
      leaseToState: entitySchema.leaseToState,
      leaseToPostalCode: entitySchema.leaseToPostalCode,
      leaseToPhoneNumber: entitySchema.leaseToPhoneNumber,
      leaseToEmail: entitySchema.leaseToEmail,

      leaseAccountId: entitySchema.leaseAccountId,
      leaseAccountName: entitySchema.leaseAccountName,
      AS400Sync: entitySchema.AS400Sync,
      receivedDate: entitySchema.receivedDate
    });
  }
  
}