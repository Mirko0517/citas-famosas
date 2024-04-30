import { Component, OnInit } from "@angular/core";
import { CitasService } from "../servicios/citas.service";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonButtons,
  IonBackButton,
  IonListHeader,
  IonCard,
  IonCardContent,
} from "@ionic/angular/standalone";

import { Cita } from "../modelo/cita.model";
import { FormularioCitaComponent } from "../formulario-cita/formulario-cita.component";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-gestion-citas",
  templateUrl: "./gestion-citas.component.html",
  styleUrls: ["./gestion-citas.component.scss"],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonButtons,
    IonBackButton,
    IonListHeader,
    IonCard,
    IonCardContent,
    FormularioCitaComponent,
    CommonModule,
  ],
})
export class GestionCitasComponent implements OnInit {
  cita: any[] | undefined = [];

  constructor(private citasService: CitasService) {}

  async ngOnInit(): Promise<void> {
    this.cita = await this.citasService.obtenerTodasLasCitas();
  }

  async eliminarCita(id: number): Promise<void> {
    await this.citasService.eliminarCita(id);
    this.cita = await this.citasService.obtenerTodasLasCitas();
  }

  async agregarCita(event: any): Promise<void> {
    await this.citasService.agregarCitas(event);
    this.cita = await this.citasService.obtenerTodasLasCitas();
  }
}
