import { Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Sections } from "../structures/containers/sections/sections.component";
import { INavItems } from "../Interfaces/navigation.interface";
import { Navigation } from "./Navigation/navigation.component";
import { HeroService } from "../services/HeroService.service";
import { Hero } from "./Hero/hero.component";
import { IHero } from "../Interfaces/hero.interface";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, Sections, Navigation, Hero],
  template: `
    <header>
      <nav>
        <ul data-navigation="nav-list" [navItems]="navigationItems"></ul>
      </nav>
    </header>
    <main>
      <hero [heroContent]="heroContent"></hero>
    </main>
  `,
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  private HeroService = inject(HeroService);

  heroContent: IHero[] = this.HeroService.getHeroContent();
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
