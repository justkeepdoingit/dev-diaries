import { Component, Input } from "@angular/core";
import { INavItems } from "./navigation.interface";
@Component({
  selector: `[data-navigation="nav-list"]`,
  standalone: true,
  template: `
    @for (basenav of navItems; track basenav.nav_name) {
    <li class="nav-base-item">
      <a [href]="basenav.nav_url">
        {{ basenav.nav_name }}
      </a>
      @if(basenav.sub_nav){
      <ul class="sub-nav-item" data-navigation="nav-list" [navItems]="basenav.sub_nav"></ul>
      }
    </li>
    }
  `,
  styleUrl: "./navigation.component.scss",
})
export class Navigation {
  @Input()
  navItems: INavItems[] = [];
}
