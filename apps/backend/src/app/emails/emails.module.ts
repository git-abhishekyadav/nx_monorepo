import { SendGridModule } from '@anchan828/nest-sendgrid';
import { Module } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { environment } from '../../environments/environment';

@Module({
  imports: [
    SendGridModule.forRoot({
      apikey: environment.sendgridKey,
    }),
  ],
  providers: [EmailsService],
  exports: [EmailsService],
})
export class EmailsModule {}
