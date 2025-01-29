import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './email/email.module';
import { TwilioModule } from './twilio/twilio.module';

@Module({
  imports: [ConfigModule.forRoot(), EmailModule, TwilioModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
