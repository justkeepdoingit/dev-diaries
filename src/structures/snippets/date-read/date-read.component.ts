import { Component, Input } from "@angular/core";
import { IDateRead } from "../../../Interfaces/date-read.interface";

@Component({
  standalone: true,
  selector: "date-read",
  template: `
    <p class="text-white mt-2 text-sm">{{ dateRead.author_date }} • {{ dateRead.read_time }} mins to read</p>
  `,
})
export class DateRead {
  @Input()
  dateRead!: IDateRead;
}
