import { AggregateRoot } from "@nestjs/cqrs";
import { HorseRegistrationNumber } from "../../../core/domain/model/horseRegistrationNumber";
import { MemberAphaId } from "../../../core/domain/model/memberAphaId";
import { LeaseGuid } from "./leaseGuid";
import { LeaseStatus } from "./leaseStatus";
import { LeaseType } from "./leaseType";


interface Props {
  guid: LeaseGuid,

  horseId: HorseRegistrationNumber,
  horseGuid: string,

	leaseeGuid: string,
	ownerGuid: string,
	leaseStatus: LeaseStatus,
	leaseType: LeaseType,
	beginningDate: Date,
	endingDate: Date,

	leaseFromName: string,
	leaseFromAphaIdNumber: MemberAphaId,
	leaseFromAddress: string,
	leaseFromCity: string,
	leaseFromState: string,
	leaseFromPostalCode: string,
	leaseFromPhoneNumber: string,
	leaseFromEmail: string,

	leaseToName: string,
	leaseToAphaIdNumber: MemberAphaId,
	leaseToAddress: string,
	leaseToCity: string,
	leaseToState: string,
	leaseToPostalCode: string,
	leaseToPhoneNumber: string,
	leaseToEmail: string,

	leaseAccountId: string,
	leaseAccountName: string,

  AS400Sync: boolean,
  receivedDate?: Date
}

export class Lease extends AggregateRoot {

  constructor(private props: Props) {
    super();
  }

  public static create(props: Props): Lease {
    
    if (!props.guid) {
      throw new Error('Cannot create Lease without guid');
    }
    if (!props.horseId) {
      throw new Error('Cannot create Lease without horseId');
    }
    if (!props.leaseeGuid) {
      throw new Error('Cannot create Lease without leaseeGuid');
    }
    // if (!props.ownerGuid) {
    //   throw new Error('Cannot create Lease without ownerGuid');
    // }

    return new Lease(props);
  }
  getGuid(): LeaseGuid {
    return this.props.guid;
  }
  getHorseId(): HorseRegistrationNumber {
    return this.props.horseId;
  }
  getHorseGuid(): string {
    return this.props.horseGuid;
  }
	getLeaseeGuid(): string {
    return this.props.leaseeGuid;
  }
	getOwnerGuid(): string {
    return this.props.ownerGuid;
  }
	getLeaseStatus(): LeaseStatus {
    return this.props.leaseStatus;
  }
	getLeaseType(): LeaseType {
    return this.props.leaseType;
  }
	getBeginningDate(): Date {
    return this.props.beginningDate;
  }
	getEndingDate(): Date {
    return this.props.endingDate;
  }
	getLeaseFromName(): string {
    return this.props.leaseFromName;
  }
	getLeaseFromAphaIdNumber(): MemberAphaId {
    return this.props.leaseFromAphaIdNumber;
  }
	getLeaseFromAddress(): string {
    return this.props.leaseFromAddress;
  }
	getLeaseFromCity(): string {
    return this.props.leaseFromCity;
  }
	getLeaseFromState(): string {
    return this.props.leaseFromState;
  }
	getLeaseFromPostalCode(): string {
    return this.props.leaseFromPostalCode;
  }
	getLeaseFromPhoneNumber(): string {
    return this.props.leaseFromPhoneNumber;
  }
	getLeaseFromEmail(): string {
    return this.props.leaseFromEmail;
  }
	getLeaseToName(): string {
    return this.props.leaseToName;
  }
	getLeaseToAphaIdNumber(): MemberAphaId {
    return this.props.leaseToAphaIdNumber;
  }
	getLeaseToAddress(): string {
    return this.props.leaseToAddress;
  }
	getLeaseToCity(): string {
    return this.props.leaseToCity;
  }
	getLeaseToState(): string {
    return this.props.leaseToState;
  }
	getLeaseToPostalCode(): string {
    return this.props.leaseToPostalCode;
  }
	getLeaseToPhoneNumber(): string {
    return this.props.leaseToPhoneNumber;
  }
	getLeaseToEmail(): string {
    return this.props.leaseToEmail;
  }

	getLeaseAccountId(): string {
    return this.props.leaseAccountId;
  }
	getLeaseAccountName(): string {
    return this.props.leaseAccountName;
  }

  isAS400Sync(): boolean {
    return this.props.AS400Sync;
  }

  getReceivedDate(): Date {
    return this.props.receivedDate;
  }

}
