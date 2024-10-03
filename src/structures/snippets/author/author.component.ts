import { Component, inject, Input } from "@angular/core";
import { ImageContainer } from "../../containers/image-container/image-container.component";
import { IAuthor } from "../../../Interfaces/author.interface";
import { IPicture } from "../../../Interfaces/picture.interface";
import { defaultImage } from "../../../Configs/defaultValues";

/**
 * Author Snippet
 *
 * Displays an author image and name using the `ImageContainer` component.
 * Falls back to a default image if no author image is provided.
 *
 * @example
 * <author [author]="authorData"></author>
 *
 */
@Component({
  standalone: true,
  selector: `author`,
  imports: [ImageContainer],
  template: `
    <div class="rounded-full h-7 w-7 relative overflow-hidden">
      <image
        [source]="author.author_image.length < 1 ? defaultImage : author.author_image"
        imagePosition="absolute"
        [hideOverlay]="true"
      />
    </div>
    <p class="text-white font-[400] text-lg">{{ author.author_name }}</p>
  `,
  host: {
    class: "flex justify-end items-center gap-2 relative",
  },
})
export class Author {
  /**
   * Default image object used when the author image is not provided.
   * @type {IPicture[]}
   */
  defaultImage: IPicture[] = defaultImage;

  /**
   * Author object containing the author's details such as name and image.
   *
   * @type {IAuthor}
   * @required
   */
  @Input({ required: true })
  author!: IAuthor;
}
