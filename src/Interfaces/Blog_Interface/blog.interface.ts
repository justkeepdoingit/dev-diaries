import { IAuthor } from "../author.interface";
import { ICategory } from "../category.interface";
import { IDateRead } from "../dateRead.interface";
import { IPicture } from "../picture.interface";
import { IBlogContent } from "./blog_content.interface";

export interface IBlog {
  id: string;
  title: string;
  blog_content: IBlogContent;
  category: ICategory[];
  author: IAuthor[];
  date_read: IDateRead;
  blog_image: IPicture[];
}
