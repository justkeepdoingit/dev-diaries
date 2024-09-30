import { Component, inject } from "@angular/core";
import { Contents } from "../../structures/containers/contents/contents.component";

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
export class Blog {}
