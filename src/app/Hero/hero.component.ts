import { Component, inject, Input } from "@angular/core";
import { Contents } from "../../Structures/containers/contents/contents.component";
import { ImageContainer } from "../../Structures/containers/image-container/image-container.component";
import { Category } from "../../Structures/snippets/category/category.component";
import { Author } from "../../Structures/snippets/author/author.component";
import { DateRead } from "../../Structures/snippets/dateRead/dateRead.component";
import { staggeredShow } from "../../Animations/StaggeredShow.animation";
import { query, transition, trigger, useAnimation } from "@angular/animations";
import { AsyncPipe } from "@angular/common";
import { Blog } from "../Blog/blog.component";
@Component({
  selector: `hero`,
  standalone: true,
  imports: [Contents, ImageContainer, Category, Author, DateRead, AsyncPipe],
  animations: [
    trigger("showContents", [
      transition("* => showItems", [
        query('[data-slide-active="true"] [data-animate-type="showItems"]', [useAnimation(staggeredShow)], {
          params: { easing: "300ms ease-in-out" },
        }),
      ]),
    ]),
  ],
  template: `
    <div class="hero-content-container flex items-end flex-col justify-end">
      <div class="flex w-full">
        @for (contents of blogs$; track $index) {
        <div class="w-full" [attr.data-slide-item]="$index" [attr.data-slide-active]="pageIndex == $index">
          <image [source]="contents.blog_image" [imagePosition]="'absolute'" />
          <contents [@showContents]="pageIndex == $index ? 'showItems' : ''" [styleValue]="{ gap: '1em' }">
            <contents [innerContent]="true" [contentClass]="'column justify-end'" [styleValue]="{ gap: '0.7em' }">
              <category [attr.data-animate-type]="animateType" [category_items]="contents.categories" />
              <h1 [attr.data-animate-type]="animateType" class="text-white">{{ contents.title }}</h1>
              <p [attr.data-animate-type]="animateType" class="text-white">
                {{ contents.blog_content.teaser_content }}
              </p>
            </contents>
            <contents [innerContent]="true" [contentClass]="'column items-end justify-end'">
              <author [attr.data-animate-type]="animateType" [author]="contents.author" />
              <date-read [attr.data-animate-type]="animateType" [dateRead]="contents.date_read" />
            </contents>
          </contents>
        </div>
        }
      </div>

      <contents>
        <div class="hero-content-paginator z-10">
          @for (items of blogs$; track $index){
          <div class="paginator-item" [attr.page-active]="pageIndex == $index" (click)="setPageActive($index)"></div>
          }
        </div>
      </contents>
    </div>
  `,
  styleUrl: "./hero.component.scss",
})
export class Hero extends Blog {
  animateType: string = "showItems";
  pageIndex: number = 0;

  setPageActive(index: number) {
    this.pageIndex = index;
  }
}
