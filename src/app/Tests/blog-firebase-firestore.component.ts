import { Component, inject, OnInit } from "@angular/core";
import { Contents } from "../Structures/containers/contents/contents.component";
import { Observable, switchMap } from "rxjs";
import { IBlog } from "../Interfaces/blog_interface/blog.interface";
import {
  collection,
  collectionData,
  doc,
  Firestore,
  getDoc,
} from "@angular/fire/firestore";

//USING FIREBASE FIRESTORE

@Component({
  standalone: true,
  imports: [Contents],
  selector: `blog`,
  template: `
    <ng-content select="[blog-title]"></ng-content>
    <ng-content select="[blog-description]"></ng-content>
  `,
})
export class Blog implements OnInit {
  blogs$!: Observable<IBlog[]>;
  firestore: Firestore = inject(Firestore);

  constructor() {
    const blogCollections = collection(this.firestore, "blogs");
    this.blogs$ = collectionData(blogCollections, { idField: "id" }).pipe(
      switchMap(async (blogData: any) => {
        const blogsWithDetails = await Promise.all(
          blogData.map(async (blog: any) => {
            const authorDocRef = doc(
              this.firestore,
              `authors/${blog.author.id}`
            );
            const authorDoc = await getDoc(authorDocRef);

            const categoriesData = await Promise.all(
              blog.categories.map(async (categoryRef: any) => {
                const categoryDocRef = doc(
                  this.firestore,
                  `categories/${categoryRef.id}`
                );
                const categoryDoc = await getDoc(categoryDocRef);
                return categoryDoc.exists() ? categoryDoc.data() : null;
              })
            );

            return {
              ...blog,
              categories: categoriesData.filter(
                (category) => category !== null
              ),
              author: {
                author_name: authorDoc.exists()
                  ? authorDoc.data()["author_name"]
                  : "Undefined",
                author_image: authorDoc.exists()
                  ? authorDoc.data()["author_image"]
                  : "N/A",
              },
            };
          })
        );
        return blogsWithDetails;
      })
    );
  }

  ngOnInit(): void {
    this.blogs$.subscribe((data) => {
      console.log(data);
    });
  }
}
