import { Component, inject, OnInit } from "@angular/core";
import { Contents } from "../../structures/containers/contents/contents.component";
import { IBlog } from "../../Interfaces/Blog_Interface/blog.interface";
import { BlogService } from "../../services/BlogService/BlogServices.service";
import { BlogCollection } from "../../structures/containers/Blog/blog-collection/blog-collection.component";
import { BlogCard } from "../../structures/containers/Blog/blog-card/blog-card.component";
import {
  animateChild,
  query,
  stagger,
  transition,
  trigger,
} from "@angular/animations";

@Component({
  standalone: true,
  imports: [Contents, BlogCollection, BlogCard],
  selector: `blog`,
  animations: [
    trigger("showBlogs", [
      transition(":enter", [
        query("@blogEnter", [stagger(100, animateChild())]),
      ]),
    ]),
  ],
  template: `
    <ng-content select="[blog-title]"></ng-content>
    <ng-content select="[blog-description]"></ng-content>
    <contents [innerContent]="true">
      @if (blogs$) {
      <blog-collection
        @showBlogs
        [customClass]="'md:grid-cols-2 lg:grid-cols-3'"
      >
        @for(contents of blogs$; track contents.id){
        <blog-card
          [blogAuthor]="contents.author"
          [blogDateRead]="contents.date_read"
          [blogImage]="contents.blog_image"
          [categories]="contents.categories"
          class="test"
        >
          <h3 class=" text-xl mb-2" card-title>{{ contents.title }}</h3>
          <p class=" text-sm" card-teaser>
            {{ contents.blog_content.teaser_content }}
          </p>
        </blog-card>
        }
      </blog-collection>
      }
    </contents>
  `,
  styleUrl: "./blog.component.scss",
})
export class Blog {
  blogService = inject(BlogService);
  blogs$!: IBlog[];
  loaded: boolean = false;

  constructor() {
    this.blogService.getBlogs().subscribe((blogData) => {
      this.blogs$ = blogData;
      this.loaded = true;
    });
  }
}
