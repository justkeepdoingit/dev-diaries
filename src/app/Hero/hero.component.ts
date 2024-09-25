import { Component, inject, Input } from "@angular/core";
import { IHero } from "../../Interfaces/hero.interface";
import { Contents } from "../../structures/containers/contents/contents.component";
import { ImageContainer } from "../../structures/containers/image-container/image-container.component";
import { Category } from "../../structures/snippets/category/category.component";
import { Author } from "../../structures/snippets/author/author.component";
import { DateRead } from "../../structures/snippets/date-read/date-read.component";
import { staggeredShow } from "../../Animations/StaggeredShow.animation";
import { query, transition, trigger, useAnimation } from "@angular/animations";
import { FadedShow } from "../../Animations/FadedShow.animations";
@Component({
  selector: `hero`,
  standalone: true,
  imports: [Contents, ImageContainer, Category, Author, DateRead],
  animations: [
    trigger("showContents", [
      transition("* => showItems", [
        query('[data-slide-active="true"] [data-animate-type="showItems"]', [useAnimation(staggeredShow)]),
      ]),
    ]),
    trigger("fadeInContent", [
      transition("* => fadeIn", 
        [useAnimation(FadedShow)]
      )
    ]),
  ],
  template: `
    <section class="hero-content-container flex items-end flex-col justify-end">
      <div class="flex w-full">
        @for (contents of heroContent; track contents.title) {
        <div
          [@showContents]="pageIndex == $index ? 'showItems' : ''"
          class="w-full"
          [attr.data-slide-item]="$index"
          [attr.data-slide-active]="pageIndex == $index"
        >
          <image
            [@fadeInContent]="pageIndex == $index ? 'fadeIn' : ''"
            [source]="contents.hero_image"
            [imagePosition]="'absolute'"
          />
          <contents [styleValue]="{ gap: '1em' }">
            <contents
              [contentClass]="'column justify-end'"
              [styleValue]="{ padding: 'unset', maxWidth: 'unset', gap: '0.7em' }"
            >
              <category [attr.data-animate-type]="animateType" [category_items]="contents.category" />
              <h1 [attr.data-animate-type]="animateType" class="text-white">{{ contents.title }}</h1>
              <p [attr.data-animate-type]="animateType" class="text-white">{{ contents.text }}</p>
            </contents>
            <contents
              [contentClass]="'column items-end justify-end'"
              [styleValue]="{ padding: 'unset', maxWidth: 'unset' }"
            >
              <author [attr.data-animate-type]="animateType" [author]="contents.author" />
              <date-read [attr.data-animate-type]="animateType" [dateRead]="contents.date_read" />
            </contents>
          </contents>
        </div>
        }
      </div>

      <contents [styleValue]="'height: auto; margin: 0 auto;'">
        <div class="hero-content-paginator z-10">
          @for (items of heroContent; track $index){
          <div class="paginator-item" [attr.page-active]="pageIndex == $index" (click)="setPageActive($index)"></div>
          }
        </div>
      </contents>
    </section>
  `,
  styleUrl: "./hero.component.scss",
})
export class Hero {
  @Input()
  heroContent: IHero[] = [];

  animateType: string = "showItems";

  pageIndex: number = 0;

  setPageActive(index: number) {
    this.pageIndex = index;
  }
}
