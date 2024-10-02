import { Component, HostBinding, Input } from "@angular/core";
import { ICategory } from "../../../Interfaces/category.interface";

@Component({
  standalone: true,
  selector: `category`,
  template: `
    @for(categories of category_items; track categories.category_name){
    <a
      class="text-white text-sm rounded-full px-4 py-1 w-fit bg-slate-400 bg-opacity-10 backdrop-blur-[1px] -ml-2"
      [href]="categories.category_link"
    >
      {{ categories.category_name }}
    </a>
    }
  `,
  host: {
    class: "flex gap-4",
  },
})
export class Category {
  @Input({ required: true })
  category_items: ICategory[] = [];
}
