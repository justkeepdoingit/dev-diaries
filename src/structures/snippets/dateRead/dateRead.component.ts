import { Component, Input } from "@angular/core";
import { IDateRead } from "../../../Interfaces/dateRead.interface";
import { DatePipe } from "@angular/common";
import { ToDate } from "../../../Pipes/ToDate.pipe";
@Component({
  standalone: true,
  selector: "date-read",
  imports: [DatePipe, ToDate],
  template: `
    <p [class]="componentType()">
      {{ dateRead.author_date | ToDate | date : "MMMM d" }} • {{ dateRead.read_time }} mins to read
    </p>
  `,
})
export class DateRead {
  @Input()
  dateRead!: IDateRead;
  @Input()
  dateReadType: string = "hero";

  componentType(): string {
    const type = this.dateReadType;
    let defaultClass = "mt-3 mb-1 text-sm ";
    switch (type) {
      case "hero":
        return (defaultClass += "text-white");
      case "blog-card":
        return (defaultClass += "text-gray-500");
      default:
        return (defaultClass += "text-white");
    }
  }
}
