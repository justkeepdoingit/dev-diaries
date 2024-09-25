import { animate, animation, style } from "@angular/animations";

export const FadedShow = animation([
    style({ opacity: 0 }), 
    animate("300ms ease-in-out", style({ opacity: 1 }))
]);
