import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { Server } from 'http';
import { Socket } from 'socket.io';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  config()
  app.enableCors()
  await app.listen(parseInt(process.env.PORT));
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
