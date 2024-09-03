import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Sections } from "../structures/containers/sections/sections.component";
import { INavItems } from "./Navigation/navigation.interface";
import { Navigation } from "./Navigation/navigation.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, Sections, Navigation],
  template: `
    <header>
      <nav>
        <ul data-navigation="nav-list" [navItems]="navigationItems"></ul>
      </nav>
    </header>
    <main>
      <section data-element="section" [sectionClass]="'body-section'">
        <p>Hello World: {{ title }}</p>
      </section>
      <section data-element="section" [sectionClass]="'body-section'">
        <p>Hello World: {{ title }}</p>
      </section>
    </main>
  `,
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "dev-diaries";

  navigationItems: INavItems[] = [
    {
      nav_name: "Travel",
      nav_url: "#",
    },
    {
      nav_name: "Development",
      nav_url: "#",
    },
    {
      nav_name: "Rides",
      nav_url: "#",
    },
    {
      nav_name: "About Me",
      nav_url: "#",
      sub_nav: [
        {
          nav_name: "What I do",
          nav_url: "#",
        },
        {
          nav_name: "My Experience",
          nav_url: "#",
        },
      ],
    },
  ];
}
