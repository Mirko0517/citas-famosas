import { Plugins } from '@capacitor/core';
import {Injectable} from "@angular/core";

const { Preferences } = Plugins;

@Injectable({
  providedIn: "root",
})
export class ConfiguracionService {
  private borrarCitasInicioKey = "borrarCitasInicio";

  async obtenerOpcionBorrarCitasInicio(): Promise<boolean> {
    const { value } = await Preferences['get']({ key: this.borrarCitasInicioKey });
    return value === "true";
  }

  async cambiarOpcionBorrarCitasInicio(opcion: boolean): Promise<void> {
    await Preferences['set']({ key: this.borrarCitasInicioKey, value: opcion ? "true" : "false" });
  }
}
