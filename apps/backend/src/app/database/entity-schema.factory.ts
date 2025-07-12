import { AggregateRoot } from '@nestjs/cqrs';

export interface EntitySchemaFactory<
  TSchema,
  TEntity extends AggregateRoot
> {
  toPersistance(entity: TEntity): TSchema;
  toDomain(entitySchema: TSchema): TEntity;
}
