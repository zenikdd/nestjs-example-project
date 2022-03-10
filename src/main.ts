import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
const cors = require('cors');


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = parseInt(process.env.APP_PORT, 10) || 3000

  app.useGlobalPipes(new ValidationPipe());

  app.use(cors({
    origin: 'http://localhost:3006',
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE', 'PATCH'],
    credentials: true,
  }));

  const options = new DocumentBuilder()
      .setTitle('Test task')
      .setDescription('calculating the cost of car rental\n')
      .setVersion('1.0')
      .addTag('endpoints')
      .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(port);
}
bootstrap();
