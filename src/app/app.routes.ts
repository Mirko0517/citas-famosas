import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "home",
    loadComponent: () => import("./home/home.page").then((m) => m.HomePage),
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "configuracion",
    loadComponent: () =>
      import("./configuracion/configuracion.component").then(
        (m) => m.ConfiguracionComponent,
      ),
  },
  {
    path: "formulario-cita",
    loadComponent: () =>
      import("./formulario-cita/formulario-cita.component").then(
        (m) => m.FormularioCitaComponent,
      ),
  },
  {
    path: "gestion-citas",
    loadComponent: () =>
      import("./gestion-citas/gestion-citas.component").then(
        (m) => m.GestionCitasComponent,
      ),
  },
];
