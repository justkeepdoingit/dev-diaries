import { Component } from "@angular/core";

@Component({
  selector: `contents`,
  standalone: true,
  template: `<ng-content></ng-content>`,
  styleUrl: "./contents.component.scss",
  host: {
    role: "group",
  },
})
export class Contents {}
