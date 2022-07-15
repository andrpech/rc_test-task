import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesEntity } from './news/category.entity';
import { NewsController } from './news/news.controller';
import { NewsEntity } from './news/news.entity';
import { NewsService } from './news/news.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'red-carlos-test-db',
      username: 'root',
      password: 'password',
      synchronize: true,
      entities: [NewsEntity, CategoriesEntity],
      migrations: [__dirname, '**', '*.migration.{ts,js}'],
    }),
    TypeOrmModule.forFeature([NewsEntity, CategoriesEntity]),
  ],
  controllers: [AppController, NewsController],
  providers: [AppService, NewsService],
})
export class AppModule {}
