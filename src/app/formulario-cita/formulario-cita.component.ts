import {Component, Input, Output, EventEmitter} from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  IonItem,
  IonInput,
  IonLabel,
  IonButton,
  IonCard,
  IonCardContent,
} from "@ionic/angular/standalone";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { CitasService } from "../servicios/citas.service";

@Component({
  selector: "app-formulario-cita",
  templateUrl: "./formulario-cita.component.html",
  styleUrls: ["./formulario-cita.component.scss"],
  standalone: true,
  imports: [
    IonItem,
    IonInput,
    IonLabel,
    IonButton,
    IonCard,
    IonCardContent,
    FormsModule,
    IonicModule,
    CommonModule,
  ],
})
export class FormularioCitaComponent {
  @Input() cita: any = {};
  frase: string = "";
  autor: string = "";
  errorFrase: boolean = false;
  errorAutor: boolean = false;
  @Output() agregarCita = new EventEmitter<unknown>();

  constructor(private citasService: CitasService) {}

  agregarCitas(): void {
    // Validación de la frase
    if (this.frase.trim().length < 5) {
      this.errorFrase = true;
      return; // Detiene la ejecución si hay un error
    } else {
      this.errorFrase = false;
    }

    // Validación del autor
    if (this.autor.trim().length < 2) {
      this.errorAutor = true;
      return; // Detiene la ejecución si hay un error
    } else {
      this.errorAutor = false;
    }
    // Agrega la cita si no hay errores
    this.citasService.agregarCitas({ frase: this.frase, autor: this.autor });
    this.frase = "";
    this.autor = "";
  }
}
