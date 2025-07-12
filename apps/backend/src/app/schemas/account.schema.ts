import { Prop, Schema } from '@nestjs/mongoose';
// import { Financial } from '@halo/showday-interface';
import { SchemaTypes, Types } from 'mongoose';


@Schema()
export class AccountSchema {
  @Prop({ type: String, required: true, index: true })
  name: string;

  @Prop({ type: Boolean, required: true })
  enabled: boolean;

  @Prop({ type: Date, default: new Date() })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;

  @Prop({ type: String, required: true, index: false })
  type: string;

  @Prop({ type: String, index: true })
  apiToken: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Domain', index: true })
  domain: Types.ObjectId;

  @Prop({ type: Boolean, default: false, index: false })
  domainMaster: boolean;

  @Prop({ type: String })
  image: string;

  @Prop({ type: String })
  icon: string;

  @Prop({ type: String })
  cardImage: string;

  @Prop({ type: String, index: true })
  customerId: string;

  @Prop({ type: String, index: true })
  accountClaimCode: string;

  @Prop({ type: String })
  country: string;

  @Prop({ type: Date })
  billingBegin: Date;

  @Prop({ type: Date })
  billingEnd: Date;

  @Prop({ type: Number })
  purchasedCases: number;

  @Prop({ type: Number })
  purchasedUsers: number;

  @Prop({ type: String })
  billingToken: string;

  @Prop({ type: Object })
  subscription: {
    subscriptionID: { type: String };
    planId: { type: String };
    planName: { type: String };
  };

  @Prop({ type: Object })
  creditCard: {
    last4: { type: String };
    cardType: { type: String };
  };

  @Prop({ type: Date })
  ccUpdatedAt: Date;

  @Prop({ type: String })
  membershipType: string;

  @Prop({ type: Number })
  casePerUserPerYear: number;

  @Prop({ type: Boolean, default: false })
  useStripeSandbox: boolean;

  @Prop({ type: String, required: false, index: true })
  //used to identify a document processing endpoint for an account. such as: 95772F1D-vfd@pdf.dvmrxexpress.com
  documentProcessingPrefix: string;
  //When set, force document uploader into Furk mode. Displayed "Self Service Mode" in UI.
  @Prop({ type: Boolean, default: false })
  documentProcessingFurkOnly: boolean;

  @Prop({ type: String, required: true, index: true })
  email: string;

  @Prop({ type: String })
  phone: string;

  @Prop({ type: String })
  fax: string;

  @Prop({ type: String })
  address: string;

  @Prop({ type: String })
  city: string;

  @Prop({ type: String })
  state: string;

  @Prop({ type: String })
  zipCode: string;

  @Prop({ type: SchemaTypes.ObjectId, index: true })
  parent: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, index: true })
  billingAccount: Types.ObjectId;

  @Prop({ type: Boolean })
  isBillingParent: boolean;

  @Prop({ type: Boolean })
  analytics: boolean;

  @Prop({ type: Boolean })
  hasAssets: boolean;

  // Do they have access to the reporting page?
  @Prop({ type: Boolean })
  hasReporting: boolean;

  // Do they have access to the Dashboard page?
  @Prop({ type: Boolean })
  hasDashboard: boolean;

  // Are we restricting access to the Analytics page?
  @Prop({ type: Boolean })
  hasRoleBasedAnalytics: boolean;

  // Are we restricting access to the Reporting page?
  @Prop({ type: Boolean })
  hasRoleBasedReporting: boolean;

  // Can the account have two Factor?
  @Prop({ type: Boolean })
  hasTwoFactor: boolean;

  // Stuff that comes from Service: // Should type be in here?
  @Prop({ type: [Object] })
  roles: [
    {
      name: { type: String };
      value: { type: Number };
      canAnalytics: Boolean;
      canReporting: Boolean;
    }
  ];

  @Prop({ type: [Object] })
  caseStates: [
    {
      name: { type: String };
      minRole: { type: Number };
      showReport: { type: Boolean };
    }
  ];

  @Prop({ type: String })
  newCaseName: string;

  @Prop({ type: SchemaTypes.ObjectId })
  meta: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId })
  caseFilter: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId })
  caseProjection: Types.ObjectId;
  // End stuff that comes from the service

  // allows overrides of workflow notifications
  @Prop({ type: [SchemaTypes.ObjectId] })
  notifications: [Types.ObjectId];

  @Prop({ type: [Object] })
  labels: [
    {
      guid: string;
      name: string;
      color: string;
    }
  ];

  @Prop({ type: Object })
  labelPermissions: {
    create: number;
    update: number;
  };

  @Prop({ type: [Object] })
  imageGroups: [
    {
      guid: string;
      name: string;
    }
  ];

  @Prop({ type: Object })
  imageGroupsPermissions: {
    create: number;
    update: number;
  };

  @Prop({ type: Object })
  saveButtonEnableMinRole: number;

  @Prop({ type: Object })
  financials: any;
}