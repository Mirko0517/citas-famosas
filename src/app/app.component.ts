import {Component, CUSTOM_ELEMENTS_SCHEMA, OnInit} from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import {CitasService} from "./servicios/citas.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent implements OnInit{
  constructor(private citasService: CitasService) {}

  async ngOnInit() {
    await this.citasService.iniciarPlugin();
  }
}
