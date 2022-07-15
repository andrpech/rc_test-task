import { Controller, Get, HttpException, Param, Query } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}
  @Get()
  async getCategoryList() {
    return await this.newsService.getCategoryList();
  }

  @Get('/random')
  async getOneRandomStory() {
    return await this.newsService.generateStory();
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
    let news = await this.newsService.generateNews();

    if (news[category] === undefined) {
      throw new HttpException(
        'There is no such category. Please check typing',
        400,
      );
    }

    return JSON.stringify(news[category].slice(start, end));
  }
}
