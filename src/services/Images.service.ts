import { Injectable } from "@angular/core";
import { IPicture } from "../Interfaces/picture.interface";

@Injectable({
  providedIn: "root",
})
export class DefaultImage {
  getDefault(): IPicture[] {
    return [
      {
        imageLink: "Images/default.webp",
        media: "1440",
      },
    ];
  }
}
