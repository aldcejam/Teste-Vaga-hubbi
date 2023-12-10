import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; 
import { GetDateToSales } from './utils/GetDateToSales';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3001);

  GetDateToSales('./sales.txt')
  
  

}
bootstrap();
