import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CaseSchema } from "../schemas/case.schema";

@Injectable()
export class CasesRepository {

  constructor(
    @InjectModel(CaseSchema.name) private caseSchema: Model<CaseSchema>,
  ) { }

  async findFromAggregate(aggregate: any): Promise<any[]> {
    const results = await this.caseSchema.aggregate(aggregate).exec();
    return results;
  }

}