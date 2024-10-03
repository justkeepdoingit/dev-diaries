import { Component, HostBinding, Input, ViewEncapsulation } from "@angular/core";
import { ICategory } from "../../../Interfaces/category.interface";

@Component({
  standalone: true,
  selector: `category`,
  template: `
    @for(categories of category_items; track categories.category_name){ @if (category_type == 'hero') {
    <a
      class="text-white text-sm rounded-full px-4 py-1 w-fit bg-slate-400 bg-opacity-10 backdrop-blur-[1px] -ml-2"
      [href]="categories.category_link"
    >
      {{ categories.category_name }}
    </a>
    } @else if (category_type == 'blog-card') {
    <a
      class="text-white text-sm rounded-md px-4 py-1 w-fit bg-slate-800 bg-opacity-55 backdrop-blur-[2px]"
      [href]="categories.category_link"
    >
      {{ categories.category_name }}
    </a>
    } }
  `,
  host: {
    "[class]": "categoryCheck()",
  },
})
export class Category {
  @Input({ required: true })
  category_items: ICategory[] = [];

  @Input()
  category_type: string = "hero";

  categoryCheck() {
    return `flex gap-3 ${this.category_type == "blog-card" ? "m-3" : ""}`;
  }
}
