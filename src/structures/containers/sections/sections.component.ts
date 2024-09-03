import { AfterContentInit, Component, HostBinding, Input, OnInit } from "@angular/core";
import { Contents } from "../contents/contents.component";
@Component({
  selector: `[data-element="section"]`,
  standalone: true,
  imports: [Contents],
  template: `
    <contents>
      <ng-content></ng-content>
    </contents>
  `,
  styleUrl: `./sections.component.scss`,
  host: {
    "[class]": "elementClass",
  },
})
export class Sections implements OnInit {
  @Input()
  sectionClass: string = "";
  elementClass: string = "";

  ngOnInit(): void {
    this.elementClass = `section-container ${this.sectionClass}`;
  }
}
