import { Component, inject, OnInit } from "@angular/core";
import { Contents } from "../Structures/containers/contents/contents.component";
import { combineLatest, map, Observable, switchMap } from "rxjs";
import { IBlog } from "../Interfaces/blog_interface/blog.interface";
import {
  collection,
  collectionData,
  doc,
  Firestore,
  getDoc,
} from "@angular/fire/firestore";
import { AngularFirestore } from "@angular/fire/compat/firestore";

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
  firestore: AngularFirestore = inject(AngularFirestore);

  constructor() {
    const blogCollection = this.firestore.collection("blogs");
    this.blogs$ = blogCollection.valueChanges({ idField: "id" }).pipe(
      //switchMap parameter data came from values from valueChanges
      //pipe is just a way to modify the data coming from it
      switchMap((blogData) => {
        const blogObservables = blogData.map((blogDocuments: any) => {
          const author$ = this.firestore
            .doc(`authors/${blogDocuments.author.id}`)
            .valueChanges();
          const categories$ = combineLatest(
            blogDocuments.categories.map((category: any) =>
              this.firestore.doc(`categories/${category.id}`).valueChanges()
            )
          );

          return combineLatest([author$, categories$]).pipe(
            map(([authorData, categoriesData]) => ({
              ...blogDocuments,
              author: authorData as {},
              categories: categoriesData as [{}],
            }))
          );
        });
        return combineLatest(blogObservables);
      })
    );
  }

  ngOnInit(): void {
    this.blogs$.subscribe((data) => {
      console.log(data);
    });
  }
}
