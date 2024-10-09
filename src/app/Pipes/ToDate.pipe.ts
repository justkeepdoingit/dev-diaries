import { Pipe, PipeTransform } from "@angular/core";
import { Timestamp } from "@angular/fire/firestore";

@Pipe({
  name: "ToDate",
  standalone: true,
})
export class ToDate implements PipeTransform {
  transform(value: any, ...args: any[]) {
    return value.toDate();
  }
}
