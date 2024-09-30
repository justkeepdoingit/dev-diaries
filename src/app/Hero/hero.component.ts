import { Component, inject, Input } from "@angular/core";
import { IHero } from "../../Interfaces/hero.interface";
import { Contents } from "../../structures/containers/contents/contents.component";
import { ImageContainer } from "../../structures/containers/image-container/image-container.component";
import { Category } from "../../structures/snippets/category/category.component";
import { Author } from "../../structures/snippets/author/author.component";
import { DateRead } from "../../structures/snippets/dateRead/dateRead.component";
import { staggeredShow } from "../../Animations/StaggeredShow.animation";
import { query, transition, trigger, useAnimation } from "@angular/animations";
import { FadedShow } from "../../Animations/FadedShow.animations";
import { collection, collectionData, Firestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { IBlog } from "../../Interfaces/Blog_Interface/blog.interface";
@Component({
  selector: `hero`,
  standalone: true,
  imports: [Contents, ImageContainer, Category, Author, DateRead],
  animations: [
    trigger("showContents", [
      transition("* => showItems", [
        query('[data-slide-active="true"] [data-animate-type="showItems"]', [useAnimation(staggeredShow)], {
          params: { easing: "300ms ease-in-out" },
        }),
      ]),
    ]),
    trigger("fadeInContent", [
      transition("* => fadeIn", [useAnimation(FadedShow)], { params: { easing: "1s ease-out" } }),
    ]),
  ],
  template: `
    <div class="hero-content-container flex items-end flex-col justify-end">
      <div class="flex w-full">
        @for (contents of heroContent; track contents.title) {
        <div class="w-full" [attr.data-slide-item]="$index" [attr.data-slide-active]="pageIndex == $index">
          <image [source]="contents.hero_image" [imagePosition]="'absolute'" />
          <contents [@showContents]="pageIndex == $index ? 'showItems' : ''" [styleValue]="{ gap: '1em' }">
            <contents [innerContent]="true" [contentClass]="'column justify-end'" [styleValue]="{ gap: '0.7em' }">
              <category [attr.data-animate-type]="animateType" [category_items]="contents.category" />
              <h1 [attr.data-animate-type]="animateType" class="text-white">{{ contents.title }}</h1>
              <p [attr.data-animate-type]="animateType" class="text-white">{{ contents.text }}</p>
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
          @for (items of heroContent; track $index){
          <div class="paginator-item" [attr.page-active]="pageIndex == $index" (click)="setPageActive($index)"></div>
          }
        </div>
      </contents>
    </div>
  `,
  styleUrl: "./hero.component.scss",
})
export class Hero {
  @Input()
  heroContent: IHero[] = [];

  private firestore: Firestore = inject(Firestore);

  animateType: string = "showItems";

  pageIndex: number = 0;

  setPageActive(index: number) {
    this.pageIndex = index;
  }

  //TODO
  getBlogs(): Observable<IBlog[]> {
    const blogCollections = collection(this.firestore, "blogs");
    return collectionData(blogCollections, {});
  }
}
