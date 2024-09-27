import { animate, animation, style } from "@angular/animations";

export const FadedShow = animation([style({ opacity: 0.1 }), animate("1s ease-in-out", style({ opacity: 1 }))]);
