import { Prop, Schema } from "@nestjs/mongoose"

@Schema()
export class TransferSchema {

  @Prop({required: true, index: true, unique: true, type: String})
	guid: string;

  @Prop({required: true, index: true, type: String})
  horseId: string;

  @Prop({required: true, index: true, type: String})
  buyerId: string;

  @Prop({required: true, type: String})
  transferOrLease: string;

  @Prop({required: true, type: Date})
  transferDate: Date;

  @Prop({type: Date})
  leaseEndDate: Date;

  @Prop({type: Boolean, default: false})
  isOriginalOwner: boolean;

  @Prop({type: Boolean})
  isRead: boolean;

  @Prop({type: Boolean})
  isAddedThroughUtility: boolean;
}
