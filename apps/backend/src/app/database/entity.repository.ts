import { NotFoundException } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import {
  FilterQuery,
  Model
} from 'mongoose';

import { EntitySchemaFactory } from './entity-schema.factory';


export abstract class EntityRepository<
  TSchema,
  TEntity extends AggregateRoot,
> {
  constructor(
    protected readonly entityModel: Model<TSchema>,
    protected readonly entitySchemaFactory: EntitySchemaFactory<
      TSchema,
      TEntity
    >,
  ) {}

  async findOne(
    entityFilterQuery?: FilterQuery<TSchema>,
  ): Promise<TEntity> {
    const entityDocument: any = await this.entityModel.findOne(
      entityFilterQuery,
      {},
      { lean: true },
    );

    if (!entityDocument) {
      throw new NotFoundException('Entity was not found.');
    }

    return this.entitySchemaFactory.toDomain(entityDocument);
  }

  async find(
    entityFilterQuery?: FilterQuery<TSchema>,
  ): Promise<TEntity[]> {
    return (
      await this.entityModel.find(entityFilterQuery, {}, { lean: true })
    ).map((entityDocument: any) =>
      this.entitySchemaFactory.toDomain(entityDocument),
    );
  }

  async create(entity: TEntity): Promise<void> {
    await new this.entityModel(this.entitySchemaFactory.toPersistance(entity)).save();
  }

  async findOneAndReplace(
    entityFilterQuery: FilterQuery<TSchema>,
    entity: TEntity,
  ): Promise<void> {
    const updatedEntityDocument = await this.entityModel.findOneAndReplace(
      entityFilterQuery,
      entity
    );

    if (!updatedEntityDocument) {
      throw new NotFoundException('Unable to find the entity to replace.');
    }
  }
}
