import { Component, inject, OnInit } from "@angular/core";
import { Contents } from "../../Structures/containers/contents/contents.component";
import { IBlog } from "../../Interfaces/blog_interface/blog.interface";
import { BlogService } from "../../Services/blogService/BlogServices.service";
import { BlogCollection } from "../../Structures/containers/blog/blog-collection/blog-collection.component";
import { BlogCard } from "../../Structures/containers/blog/blog-card/blog-card.component";
import { query, transition, trigger, useAnimation } from "@angular/animations";
import { staggeredShow } from "../../Animations/StaggeredShow.animation";

@Component({
  standalone: true,
  imports: [Contents, BlogCollection, BlogCard],
  selector: `blog`,
  /**
   * @TODO
   * Add Animation for Blog Cards
   * Already done adding the animation in the blog card
   * Just make it work. Lol
   */
  template: `
    <ng-content select="[blog-title]"></ng-content>
    <ng-content select="[blog-description]"></ng-content>
    <contents [innerContent]="true">
      <blog-collection>
        @for(contents of blogs$; track contents.id){
        <blog-card
          [blogAuthor]="contents.author"
          [blogDateRead]="contents.date_read"
          [blogImage]="contents.blog_image"
          [categories]="contents.categories"
          data-animate-type="showItems"
        >
          <h3 class=" text-xl mb-2" card-title>{{ contents.title }}</h3>
          <p class=" text-sm" card-teaser>{{ contents.blog_content.teaser_content }}</p>
        </blog-card>
        }
      </blog-collection>
    </contents>
  `,
  styleUrl: "./blog.component.scss",
})
export class Blog {
  blogService = inject(BlogService);
  blogs$!: IBlog[];

  constructor() {
    this.blogService.getBlogs().subscribe((blogData) => {
      this.blogs$ = blogData;
    });
  }
}
