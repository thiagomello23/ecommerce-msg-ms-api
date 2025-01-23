import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './email/email.module';

@Module({
  imports: [ConfigModule.forRoot(), EmailModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
