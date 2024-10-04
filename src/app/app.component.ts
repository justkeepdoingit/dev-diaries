import { Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Sections } from "../Structures/containers/sections/sections.component";
import { INavItems } from "../Interfaces/navigation.interface";
import { Navigation } from "./Navigation/navigation.component";
import { Hero } from "./Hero/hero.component";
import { Blog } from "./Blog/blog.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, Sections, Navigation, Hero, Blog],
  template: `
    <header>
      <nav>
        <ul data-navigation="nav-list" [navItems]="navigationItems"></ul>
      </nav>
    </header>
    <main>
      <section>
        <hero></hero>
      </section>
      <section [sectionClass]="'body-section'" data-element="section">
        <blog>
          <h1 blog-title>Blog</h1>
          <p class=" mt-2" blog-description>
            Here, we share trips, destination guides, and stories that will
            inspire you in your next adventure
          </p>
        </blog>
      </section>
    </main>
  `,
  styleUrl: "./app.component.scss",
})
export class AppComponent {
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
