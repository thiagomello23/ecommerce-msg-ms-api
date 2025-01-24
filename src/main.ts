import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { msQueueName } from './constants';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: msQueueName,
        queueOptions: {
          durable: true
        },
        noAck: false,
        persistent: true,
        prefetchCount: 1
      }
    }
  );

  await app.listen();
}
bootstrap();
