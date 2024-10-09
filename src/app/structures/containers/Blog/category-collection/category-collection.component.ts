import { Component, Input } from "@angular/core";
import { Category } from "../../../snippets/category/category.component";
import { ICategory } from "../../../../app/Interfaces/category.interface";

@Component({
  standalone: true,
  selector: "category-collection",
  imports: [Category],
  template: ``,
  styleUrl: `./category-collection.component.scss`,
})
export class CategoryCollection {
  @Input()
  allCategories: ICategory[] = [];
}
