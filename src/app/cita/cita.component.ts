import { Component, Input } from "@angular/core";

@Component({
  selector: "app-cita",
  templateUrl: "./cita.component.html",
  styleUrls: ["./cita.component.scss"],
})
export class CitaComponent {
  @Input() cita: any;
}