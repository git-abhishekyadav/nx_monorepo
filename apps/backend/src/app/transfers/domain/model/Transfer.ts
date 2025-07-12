import { AggregateRoot } from "@nestjs/cqrs";
import { HorseRegistrationNumber } from "../../../core/domain/model/horseRegistrationNumber";
import { MemberAphaId } from "../../../core/domain/model/memberAphaId";
import { Timestamp } from "../../../core/domain/model/timestamp";
import { TransferOrLeaseType } from "./transferOrLeaseType";
import { TransferGuid } from "./transferGuid";

interface Props {
  horseId: HorseRegistrationNumber,
	buyerId: MemberAphaId,
	type: TransferOrLeaseType,
	transferDate: Date,
  transferTimestamp: Timestamp,
	guid: TransferGuid,
  isOriginalOwner: boolean
}

type TransferType = Omit<Props, 'type'>;


export class Transfer extends AggregateRoot {

  constructor(private props: Props) {
    super();
  }

  public static create(propsToInit: TransferType): Transfer {
    
    const props: Props = {...propsToInit, type: TransferOrLeaseType.Lease};

    if (!props.guid) {
      throw new Error('Cannot create Transfer without guid');
    }

    if (!props.horseId) {
      throw new Error('Cannot create Transfer without horseId');
    }

    return new Transfer(props);
  }

    getHorseId(): HorseRegistrationNumber {
      return this.props.horseId;
    }
    getBuyerId(): MemberAphaId {
      return this.props.buyerId;
    }
    getType(): TransferOrLeaseType {
      return this.props.type;
    }
    getTransferDate(): Date {
      return this.props.transferDate;
    }
    getTransferTimestamp(): Timestamp {
      return this.props.transferTimestamp;
    }
    getGuid(): TransferGuid {
      return this.props.guid;
    }
    isOriginalOwner(): boolean {
      return this.props.isOriginalOwner;
    }

}
