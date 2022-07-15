import { Column, Entity } from 'typeorm';

@Entity()
export class NewsEntity {
  @Column()
  category: string;

  @Column()
  title: string;

  @Column()
  date: Date;

  @Column()
  description: string;

  @Column()
  shortDescription: string;

  @Column()
  likesNumber: number;

  @Column()
  image: string;
}
