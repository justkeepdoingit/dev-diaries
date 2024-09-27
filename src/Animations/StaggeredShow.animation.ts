import { animate, animation, stagger, style } from "@angular/animations";

export const staggeredShow = animation([
  style({ opacity: 0, translate: "-10px 0px" }),
  stagger(100, [animate("{{easing}}", style({ opacity: 1, translate: "0px 0px" }))]),
]);
