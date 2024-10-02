import { inject, Injectable } from "@angular/core";
import { collection, collectionData, doc, docData, Firestore } from "@angular/fire/firestore";
import { forkJoin, Observable, switchMap } from "rxjs";
import { IBlog } from "../../Interfaces/Blog_Interface/blog.interface";
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: "root",
})
export class BlogService {
  firestore: AngularFirestore = inject(AngularFirestore);

  getBlogs(): Observable<IBlog[]> {
    //AngularFirestore collection accepts 1 parameter: Name of the collection you want to connect
    const blogCollection = this.firestore.collection("blogs");

    //valueChanges returns an Observable in which we can use functions like pipe, switchMap, etc...
    //since it returns an Observable, that means that we can subscribe for changes in real-time

    //the pipe function are similar to other Iterators, it helps you modify the data into a more readble format
    //to fit your need before it returns the value.
    return blogCollection.valueChanges({ idField: "id" }).pipe(
      //switchMap is similar to pipe Iterator, but this is Iterating through all of the data of and turn them into observables
      //then switch to a new one after.
      switchMap(async (blogData: any) => {
        //Promise.all waits for all of the promise/async before returning a the value.
        //this helps you manage all if your array of asynchornous data, and wait for all of them to finish
        //before returning the value
        const blogsWithDetails = await Promise.all(
          //This is the map/array of async data which Promse.all needs to wait to finish
          blogData.map(async (blog: any) => {
            const authorDoc = await this.firestore.doc(`authors/${blog.author.id}`).ref.get();

            const categoriesData = await Promise.all(
              blog.categories.map(async (categoryRef: any) => {
                const categoryDoc = await this.firestore.doc(`categories/${categoryRef.id}`).ref.get();
                return categoryDoc.exists ? categoryDoc.data() : null;
              })
            );

            return {
              ...blog,
              categories: categoriesData.filter((category) => category !== null),
              author: authorDoc.exists ? authorDoc.data() : null,
            };
          })
        );
        return blogsWithDetails;
      })
    );
  }
}
