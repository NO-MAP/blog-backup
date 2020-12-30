import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix("/api/v1")

  const options = new DocumentBuilder()
    .setTitle("BLOG-BACKUP")
    .setDescription("NMLOG 后台管理系统")
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document)

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(8000);
  console.log("http://localhost:8000/doc")
}
bootstrap();
