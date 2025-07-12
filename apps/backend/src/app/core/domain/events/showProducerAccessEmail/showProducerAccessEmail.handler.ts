import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { ShowProducerAccessEmailEvent } from "./showProducerAccessEmail.event";


@EventsHandler(ShowProducerAccessEmailEvent)
export class ShowProducerAccessEmailHandler implements IEventHandler<ShowProducerAccessEmailEvent> {
  handle(event: ShowProducerAccessEmailEvent) {
  }
}
