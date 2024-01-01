import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  config()
  app.enableCors()
  console.log(process.env.PORT);
  
  await app.listen(process.env.PORT);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
