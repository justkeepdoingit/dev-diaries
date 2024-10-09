import { Component, Input } from "@angular/core";
import { INavItems } from "../../Interfaces/navigation.interface";
@Component({
  selector: `[data-navigation="nav-list"]`,
  standalone: true,
  template: `
    @for (basenav of navItems; track basenav.nav_name) {
    <li class="nav-base-item">
      <a class="flex items-center justify-between gap-1" [href]="basenav.nav_url">
        <p class="text-white">{{ basenav.nav_name }}</p>
        @if(basenav.sub_nav){
        <svg>
          <use xlink:href="Icons/arrow-down.svg#SVGRepo_iconCarrier"></use>
        </svg>
        }
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
