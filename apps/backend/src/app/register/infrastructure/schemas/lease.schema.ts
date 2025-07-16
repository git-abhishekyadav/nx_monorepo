import { Prop, Schema } from "@nestjs/mongoose"

@Schema()
export class LeaseSchema {

  @Prop({required: true, index: true, unique: true})
	guid: string;

  @Prop({required: true, index: true})
  horseId: string;

  @Prop({required: true, index: true})
  horseGuid: string;

  @Prop({required: true, index: true})
  leaseeGuid: string;

	@Prop({type: String})
  ownerGuid: string;

	@Prop({type: String})
  leaseStatus: string;

	@Prop({type: String})
  leaseType: string;

	@Prop({type: Date})
  beginningDate: Date;

	@Prop({type: Date})
	endingDate: Date;

  @Prop({type: String})
  leaseFromName: string;
  
  @Prop({type: String})  
  leaseFromAphaIdNumber: string;

  @Prop({type: String})
  leaseFromAddress: string;

  @Prop({type: String})  
  leaseFromCity: string;

  @Prop({type: String})
  leaseFromState: string;

  @Prop({type: String})
  leaseFromPostalCode: string;

  @Prop({type: String})
  leaseFromPhoneNumber: string;

  @Prop({type: String})
	leaseFromEmail: string;

  @Prop({type: String})
  leaseToName: string;
	
  @Prop({type: String})
  leaseToAphaIdNumber: string;
	
  @Prop({type: String})
  leaseToAddress: string;
	
  @Prop({type: String})
  leaseToCity: string;

  @Prop({type: String})
  leaseToState: string;

  @Prop({type: String})
  leaseToPostalCode: string;
	
  @Prop({type: String})
  leaseToPhoneNumber: string;

  @Prop({type: String})
	leaseToEmail: string;

  @Prop({type: String})
  leaseAccountId: string;

  @Prop({type: String})
	leaseAccountName: string;

  @Prop({type: Boolean, default: false})
	AS400Sync: boolean;

  @Prop({type: Date})
  receivedDate?: Date;

}