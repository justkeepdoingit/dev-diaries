import { Component, inject, OnInit } from "@angular/core";
import { Contents } from "../../structures/containers/contents/contents.component";
import { Observable } from "rxjs";
import { IBlog } from "../../Interfaces/Blog_Interface/blog.interface";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { BlogService } from "../../services/BlogService/BlogServices.service";

@Component({
  standalone: true,
  imports: [Contents],
  selector: `blog`,
  template: `
    <ng-content select="[blog-title]"></ng-content>
    <ng-content select="[blog-description]"></ng-content>
  `,
  styleUrl: "./blog.component.scss",
})
export class Blog implements OnInit {
  blogs$!: Observable<IBlog[]>;
  blogService = inject(BlogService);

  constructor() {
    this.blogs$ = this.blogService.getBlogs();
  }

  ngOnInit(): void {
    this.blogs$.subscribe((data) => {
      console.log(data);
    });
  }
}
