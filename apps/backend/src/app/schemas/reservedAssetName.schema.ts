import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
export class ReservedAssetNameSchema {
	@Prop({ type: String, required: true, index: true })
	name: string;

	@Prop({ type: String, index: false, required: true })
	type: string;

	@Prop({ type: String, index: false, required: true })
	subtype: string;

	@Prop({ type: String, required: true, index: true, unique: true })
	customerGuid: string;

	@Prop({ type: String, required: false, index: true })
	customerId: string;

	@Prop({ type: Boolean, index: false, default: false })
	isApproved: boolean;

	@Prop({ type: Boolean, index: false, default: false })
	isDeleted: boolean;

	@Prop({ type: Date, index: false })
	createdAt: Date;

	@Prop({ type: Date, index: false })
	updatedAt: Date;
}