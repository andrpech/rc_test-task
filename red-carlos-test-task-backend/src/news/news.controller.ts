import { Controller, Get, HttpException, Param, Query } from '@nestjs/common';
import { NewsService } from './news.service';

const newsService = new NewsService();

@Controller('news')
export class NewsController {
  @Get()
  async getCategoryList() {
    return await newsService.getCategoryList();
  }

  @Get('/random')
  async getOneRandomStory() {
    return await newsService.generateStory();
  }

  @Get(':category')
  async getNewsByCategory(
    @Param('category') category: string,
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 1,
  ): Promise<string> {
    if (page <= 0 || limit <= 0) {
      throw new HttpException(
        'Page and limit parameters cannot be less or equal to 0.',
        400,
      );
    }
    let start: number = Number((page - 1) * limit);
    let end: number = Number(page * limit);

    if (page >= 2) {
      page = 2;
    }
    if (end >= 20) {
      end = 20;
    }
    let news = await newsService.generateNews();

    if (news[category] === undefined) {
      throw new HttpException(
        'There is no such category. Please check typing',
        400,
      );
    }

    return JSON.stringify(news[category].slice(start, end));
  }
}
