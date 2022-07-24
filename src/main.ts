import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
    , port = 3000

  app.useGlobalPipes(new ValidationPipe())
  await app.listen(port, () => console.log('Server running on port: ' + port));
}
bootstrap();
