import { Component, Input } from "@angular/core";
import { IDateRead } from "../../../Interfaces/dateRead.interface";
import { DatePipe } from "@angular/common";
import { ToDate } from "../../../Pipes/ToDate.pipe";
@Component({
  standalone: true,
  selector: "date-read",
  imports: [DatePipe, ToDate],
  template: `
    <p class="text-white mt-2 text-sm">
      {{ dateRead.author_date | ToDate | date : "MMMM d" }} • {{ dateRead.read_time }} mins to read
    </p>
  `,
})
export class DateRead {
  @Input()
  dateRead!: IDateRead;
}
