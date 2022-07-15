import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { devConfig } from 'dev-config';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesEntity } from './category.entity';
import { Repository } from 'typeorm';
import { NewsEntity } from './news.entity';

export interface CategoryTypes {
  name: string;
  abr: string;
}

export interface StoryTypes {
  category: string;
  title: string;
  date: Date;
  description: string;
  shortDescription: string;
  likesNumber: number;
  image: string;
}

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(CategoriesEntity)
    private readonly categoriesRepository: Repository<CategoriesEntity>,
    @InjectRepository(NewsEntity)
    private readonly newsRepository: Repository<NewsEntity>,
  ) {}

  private _categoryList: CategoryTypes[] = [];
  private _imageNumber: number = 0;
  private _images: [] = [];

  private async _generateCategoryList() {
    const categoriesList = [];
    devConfig.CATEGORIES.map((item) => {
      const category = {
        name: item,
        abr: item.toLowerCase(),
      };
      categoriesList.push(category);
    });
    this._categoryList = categoriesList;
    const categoriesEntities = this.categoriesRepository.create(categoriesList);
    await this.categoriesRepository.insert(categoriesEntities);
  }

  private async _getImages(): Promise<void> {
    this._images = await axios.get(
      'https://jsonplaceholder.typicode.com/photos',
    );
  }

  private async _setImage(images: any): Promise<string> {
    this._imageNumber++;
    // console.log(images.data[this._imageNumber].url);

    return images.data[this._imageNumber].url;
  }

  private async _generateDate(start: Date, end: Date): Promise<Date> {
    return await new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime()),
    );
  }

  private async _generateTitle(): Promise<string> {
    return await faker.random.word();
  }

  private async _generateDescription(): Promise<string> {
    const description: string = await faker.random.words(
      devConfig.DESTRUCTION_NUMBER_COUNT,
    );
    return description;
  }

  private async _generateStory(categoryName: string): Promise<StoryTypes> {
    const story = {
      category: categoryName,
      title: await this._generateTitle(),
      date: await this._generateDate(new Date(1997, 10, 16), new Date()),
      description: await this._generateDescription(),
      shortDescription: '',
      likesNumber: await Math.floor(Math.random() * devConfig.MAX_LIKES_NUMBER),
      image: await this._setImage(this._images),
    };
    story.shortDescription = story.description
      .split(' ')
      .slice(0, devConfig.SHORT_DESCRIPTION_WORDS_COUNT)
      .join(' ');

    await this.newsRepository.insert(story);
    return story;
  }

  // ----------------------------------------------------------------

  public async getCategoryList() {
    await this._generateCategoryList();
    return this.categoriesRepository.find();
  }

  public async generateNews(): Promise<any> {
    await this._getImages();
    const news: any = {};

    this._categoryList.map(async (category) => {
      const categoryName = category.abr;
      news[categoryName] = await Promise.all(
        new Array(devConfig.STORIES_PER_CATEGORY).fill(0).map(async (x) => {
          const story = await this._generateStory(categoryName);

          return story;
        }),
      );
    });
    setTimeout(() => news, 2000);

    const newsEntities = this.newsRepository.create(news);
    await this.newsRepository.insert(newsEntities);
    return this.newsRepository.find();
  }

  public async generateStory(): Promise<any> {
    await this._generateStory('Random story');
    return this.newsRepository.findOne({ where: { category: 'Random story' } });
  }
}
