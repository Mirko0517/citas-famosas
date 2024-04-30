import { Component } from "@angular/core";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonToggle,
} from "@ionic/angular/standalone";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ConfiguracionService } from "../servicios/configuracion.service";


@Component({
  selector: "app-configuracion",
  templateUrl: "./configuracion.component.html",
  styleUrls: ["./configuracion.component.scss"],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonToggle,
    CommonModule,
    FormsModule,
  ],
})
export class ConfiguracionComponent {
  borrarCitasInicio: boolean = false;

  constructor(private configuracionService: ConfiguracionService) {}
  cambiarOpcionBorrarCitasInicio(): void {
    this.configuracionService.cambiarOpcionBorrarCitasInicio(
      this.borrarCitasInicio,
    ).then(r => console.log(r));
  }
}
