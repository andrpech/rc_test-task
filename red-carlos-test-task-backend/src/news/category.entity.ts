import { Column, Entity } from 'typeorm';

@Entity()
export class CategoriesEntity {
  @Column()
  name: string;

  @Column()
  abr: string;
}
