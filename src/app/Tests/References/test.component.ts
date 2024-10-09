import { Component, inject } from "@angular/core";
import { Contents } from "../../Structures/containers/contents/contents.component";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app";

@Component({
  standalone: true,
  imports: [Contents],
  selector: `blog`,
  template: `
    <contents [contentClass]="'flex-col'">
      <ng-content select="[blog-title]"></ng-content>
      <ng-content select="[blog-description]"></ng-content>
      <button (click)="fireLogin()">Testing Google Login</button>
      <button (click)="fireLogout()">Testing Google Logout</button>
    </contents>
  `,
})
export class Blog {
  fireAuth = inject(AngularFireAuth);

  fireLogin() {
    this.fireAuth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((data) => {
        console.log("logged in");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  fireLogout() {
    this.fireAuth.signOut();
  }
}
