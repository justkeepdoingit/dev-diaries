import { Component, Input } from "@angular/core";

@Component({
  selector: `contents`,
  standalone: true,
  template: `<ng-content></ng-content>`,
  styleUrl: "./contents.component.scss",
  host: {
    role: "group",
    "[class]": "contentClass",
    "[style]": "styleValue",
  },
})
export class Contents {
  @Input()
  contentClass: string = "";

  @Input()
  styleValue: {} = {};
}
