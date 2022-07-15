import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { NewsService } from './news/news.service';

// const newsService = new NewsService();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3001);
}
bootstrap();
