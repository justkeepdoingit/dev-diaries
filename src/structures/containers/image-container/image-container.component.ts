import { Component, Input } from "@angular/core";
import { IPicture } from "../../../Interfaces/picture.interface";
import { defaultImage } from "../../../Configs/defaultValues";
/**
 * A responsive image container component that dynamically generates `<source>` tags
 * within a `<picture>` element for different media breakpoints.
 *
 * This component accepts an array of images and displays them using the `<picture>` and `<img>` tags.
 * Additionally, it adds an overlay and supports setting the position of the container.
 *
 * @example
 * <image [source]="imageArray" imagePosition="absolute"></image>
 *
 * The `source` input should be an array of images where each image contains the media query and the image link.
 * The `imagePosition` input allows you to define the positioning of the image container, such as `absolute` or `relative`.
 */
@Component({
  standalone: true,
  selector: "image",
  template: `
    <picture>
      @for (image of source; track $index) { @if(image){
      <source [srcset]="image.imageLink" [media]="image.media" />
      } }
      <img [src]="source[0] ? source[0].imageLink : defaultImage[0].imageLink" alt="" loading="lazy" />
      @if(!hideOverlay){
      <div class="overlay"></div>
      }
    </picture>
  `,
  styleUrl: "./image-container.component.scss",
  host: {
    "[attr.data-position]": "imagePosition",
  },
})
export class ImageContainer {
  /**
   * An array of images with media queries and image links to be used in the `<picture>` element.
   *
   * @type {IPicture[]}
   * @required
   *
   * @example
   * [
   *   { imageLink: 'image1.jpg', media: '(min-width: 600px)' },
   *   { imageLink: 'image2.jpg', media: '(min-width: 900px)' }
   * ]
   */
  @Input({ transform: toMedia, required: true })
  source: IPicture[] = [];

  /**
   * Defines the CSS position property of the image container.
   * Default is "relative", but can also be set to "absolute" or other valid positioning values.
   *
   * @type {string}
   * @default "relative"
   *
   * @example
   * imagePosition="absolute"
   */
  @Input()
  imagePosition: "relative" | "absolute" = "relative";
  defaultImage = defaultImage;

  /**
   * Hide or show overlay depending on boolean value
   *
   *
   * @type {boolean}
   * @default "false"
   *
   * @example
   * hideOverlay="false"
   */
  @Input()
  hideOverlay: boolean = false;
}

function toMedia(value: IPicture[] | undefined) {
  return Array.isArray(value)
    ? value.map((image) => ({ imageLink: image.imageLink, media: `(min-width: ${image.media}px)` }))
    : [value];
}
