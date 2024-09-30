import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: `contents`,
  standalone: true,
  template: `<ng-content></ng-content>`,
  styleUrl: "./contents.component.scss",
  host: {
    role: "group",
    "[class]": "externalClass",
    "[style]": "styleValue",
  },
})
export class Contents implements OnInit {
  @Input()
  contentClass: string = "";
  @Input()
  innerContent: boolean = false;
  externalClass: string = "";

  ngOnInit(): void {
    this.externalClass = `${this.contentClass} ${this.innerContent ? "innerContent" : ""}`;
  }

  @Input()
  styleValue: {} = {};
}
