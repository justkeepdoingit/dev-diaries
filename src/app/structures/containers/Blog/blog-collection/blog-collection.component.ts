import { Component, Input, OnInit } from "@angular/core";

/**
 * Blog Collection
 *
 * Used for containing Blog Cards for organizing
 *
 * @example
 * <blog-collection>
 *   <blog-card></blog-card>
 * </blog-collection>
 *
 *
 * Can accept custom class values
 * @example
 * <blog-collection [customClass]="'p-5 rounded-sm'">...</blog-collection>
 */
@Component({
  standalone: true,
  selector: "blog-collection",
  imports: [],
  template: ` <ng-content></ng-content> `,
  host: {
    "[class]": "classNames",
  },
})
export class BlogCollection implements OnInit {
  @Input()
  customClass: string = "";
  classNames: string = "";

  ngOnInit(): void {
    this.classNames = `grid gap-4 mt-7 ${this.customClass}`;
  }
}
