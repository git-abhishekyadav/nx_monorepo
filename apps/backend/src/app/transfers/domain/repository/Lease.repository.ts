import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { LeaseSchema } from "../../infrastructure/schemas/lease.schema";
import { LeaseMapper } from "../../infrastructure/mappers/lease.mapper";
import { Lease } from "../model/Lease";


@Injectable()
export class LeaseRepository {

  constructor(
    @InjectModel(LeaseSchema.name) private leaseModel: Model<LeaseSchema>,
    private leaseMapper: LeaseMapper
  ) {}

  async create(lease: Lease) {
    return await this.leaseModel.create(this.leaseMapper.toPersistance(lease));
  }

}