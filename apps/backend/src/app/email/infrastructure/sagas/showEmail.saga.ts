import { Injectable } from "@nestjs/common";
import { ICommand, ofType, Saga } from "@nestjs/cqrs";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { PdfGeneratedEvent } from "../../../pdf/domain/events/pdfGenerated/pdfGenerated.event";
import { SendEmailCommand } from "../../application/commands/sendEmail/sendEmail.command";

@Injectable()
export class ShowEmailSagas {

  constructor(
  ) {}

  @Saga()
  sendShowCardCreatedEmail = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(PdfGeneratedEvent),
      map(event => {
        return new SendEmailCommand(
          event.emailTemplateName,
          event.email,
          {
            cardType: event?.extraData?.showCardType,
            memberName: event?.extraData?.memberName,
            memberId: event?.extraData?.memberId,
          },
          true,
          null,
          [event.string64Data]
        )
      })
    )
  }

}