import { Component, OnInit } from "@angular/core";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonButtons,
  IonIcon,
  IonCard,
  IonCardContent,
  IonFooter,
} from "@ionic/angular/standalone";
import { CitasService } from "../servicios/citas.service";
import { Router } from "@angular/router";
import { addIcons } from "ionicons";
import { settingsOutline } from "ionicons/icons";
import { addCircleOutline } from "ionicons/icons";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonButtons,
    IonIcon,
    IonCard,
    IonCardContent,
    RouterModule,
    CommonModule,
    IonFooter,
  ],
})
export class HomePage implements OnInit {
  cita: any;

  constructor(
    private citasService: CitasService,
    private router: Router,
  ) {
    addIcons({
      settingsOutline,
      addCircleOutline,
    });
  }

  async ngOnInit(): Promise<void> {
    await this.citasService.init();
    this.cita = await this.citasService.obtenerCitasAleatorias();
  }

  irGestionCitas(): void {
    this.router.navigate(["/gestion-citas"]).then(r => console.log(r));
  }

  irConfiguracion(): void {
    this.router.navigate(["/configuracion"]).then(r => console.log(r));
  }
}
