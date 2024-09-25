import { IAuthor } from "./author.interface";
import { ICategory } from "./category.interface";
import { IDateRead } from "./date-read.interface";
import { IPicture } from "./picture.interface";

export interface IHero {
  title: string;
  text: string;
  hero_image: IPicture[];
  author: IAuthor;
  date_read: IDateRead;
  category: ICategory[];
}
