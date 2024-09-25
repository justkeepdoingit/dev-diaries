import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CommonService {
  addElementAnimation(element: string[], animationType: string, parentElement: Element) {
    element.map((items) =>
      parentElement.querySelector(items)?.setAttributeNS("animation", "data-animate-type", animationType)
    );
  }
}
