import { Injectable } from "@angular/core";
import { IHero } from "../Interfaces/hero.interface";

@Injectable({
  providedIn: "root",
})
export class HeroService {
  getHeroContent(): IHero[] {
    return [
      {
        title: "Getting to Baguio",
        text: "Discover ways and places to go to Baguio and my personal experience going to the beautiful place.",
        hero_image: [
          {
            imageLink: "Images/Baguio.webp",
            media: "1024",
          },
          {
            imageLink: "Images/Baguio.webp",
            media: "1440",
          },
        ],
        author: {
          author_image: [],
          author_name: "Jores Amancio",
        },
        date_read: {
          author_date: "10 Sept 2024",
          read_time: "15",
        },
        category: [
          {
            category_name: "Travel",
          },
        ],
      },
      {
        title: "Journey to Learning Angular",
        text: "This website is made with Angular. Know my journey in learning and making this website.",
        hero_image: [
          {
            imageLink: "Images/Baguio.webp",
            media: "1024",
          },
        ],
        author: {
          author_image: [],
          author_name: "Jores Amancio",
        },
        date_read: {
          author_date: "15 May 2024",
          read_time: "8",
        },
        category: [
          {
            category_name: "Development",
          },
        ],
      },
      {
        title: "ADV 160: Best Adventure Motorcycle",
        text: "As my first motorcycle, this has given me a lot of chance to go to different place I always dreamed of! Know what these places are.",
        hero_image: [
          {
            imageLink: "Images/Baguio.webp",
            media: "1024",
          },
        ],
        author: {
          author_image: [],
          author_name: "Jores Amancio",
        },
        date_read: {
          author_date: "28 Jul 2024",
          read_time: "10",
        },
        category: [
          {
            category_name: "Rides",
          },
        ],
      },
    ];
  }
}
