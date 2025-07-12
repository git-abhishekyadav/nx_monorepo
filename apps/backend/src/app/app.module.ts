import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { TransfersModule } from './transfers/infrastructure/transfers.module';
import { CoreModule } from './core/core.module';



@Module({
  imports: [
       ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.mongoUri'),
      }),
      inject: [ConfigService],
    }),
    TransfersModule,
    CoreModule
  ],
  controllers: [AppController],
  providers: [AppService,
        { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },

  ],
})
export class AppModule {}
