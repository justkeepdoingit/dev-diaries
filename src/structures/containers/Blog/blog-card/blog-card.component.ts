import { Component, Input, ViewEncapsulation } from "@angular/core";
import { ImageContainer } from "../../image-container/image-container.component";
import { IPicture } from "../../../../Interfaces/picture.interface";
import { ICategory } from "../../../../Interfaces/category.interface";
import { Category } from "../../../snippets/category/category.component";
import { DateRead } from "../../../snippets/dateRead/dateRead.component";
import { IDateRead } from "../../../../Interfaces/dateRead.interface";
import { Author } from "../../../snippets/author/author.component";
import { IAuthor } from "../../../../Interfaces/author.interface";
import { animate, state, style, transition, trigger } from "@angular/animations";
/**
 * A standalone component that represents a blog card layout.
 * It displays the blog image, category, read time, title, teaser, and author information.
 * The component accepts four inputs: `blogImage`, `categories`, `blogDateRead`, and `blogAuthor`.
 *
 * @component
 * @selector blog-card
 * @standalone true
 * @imports [ImageContainer, Category, DateRead, Author]
 *
 * @example
 * <blog-card
 *    [blogImage]="imageData"
 *    [categories]="categoryList"
 *    [blogDateRead]="readTime"
 *    [blogAuthor]="authorData">
 *   <div card-title>Blog Title Here</div>
 *   <div card-teaser>Teaser content goes here...</div>
 * </blog-card>
 *
 * @Input {IPicture[]} blogImage - An array of images to be displayed in the blog card.
 * @Input {ICategory[]} categories - A list of categories associated with the blog.
 * @Input {IDateRead} blogDateRead - The read time or publish date of the blog.
 * @Input {IAuthor} blogAuthor - The author information of the blog.
 */
@Component({
  standalone: true,
  selector: "blog-card",
  imports: [ImageContainer, Category, DateRead, Author],
  animations: [
    trigger("blogEnter", [
      state("in", style({ opacity: 0, transition: "0px 10px" })),
      transition(":enter", [style({ opacity: 1, transition: "0px 0px" }), animate("300ms ease-in-out")]),
    ]),
  ],
  template: `
    <div class="relative h-52 rounded-xl overflow-hidden">
      <image [source]="blogImage" [imagePosition]="'absolute'" />
      <category [category_items]="categories" [category_type]="'blog-card'" />
    </div>
    <date-read [dateReadType]="'blog-card'" [dateRead]="blogDateRead" />
    <ng-content select="[card-title]"></ng-content>
    <ng-content select="[card-teaser]"></ng-content>
    <author [author]="blogAuthor" />
  `,
  styleUrl: "./blog-card.component.scss",
  host: {
    role: "article",
  },
})
export class BlogCard {
  @Input() blogImage!: IPicture[];
  @Input() categories!: ICategory[];
  @Input({ required: true }) blogDateRead!: IDateRead;
  @Input({ required: true }) blogAuthor!: IAuthor;
}
