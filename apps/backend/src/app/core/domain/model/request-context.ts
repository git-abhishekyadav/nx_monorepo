// import { UserSession } from '@halo/showday-interface';
import { Injectable } from '@nestjs/common';
import { IRequestContext } from '../../context/request-context.storage';

@Injectable()
export class RequestContext implements IRequestContext {
  correlationId!: string;
  timestamp!: number;
  who: any;

  toJSON(): IRequestContext {
    return {
      correlationId: this.correlationId,
      timestamp: this.timestamp,
      who: JSON.stringify(this.who)
    };
  }
}