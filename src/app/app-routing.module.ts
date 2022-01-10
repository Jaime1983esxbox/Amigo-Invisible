import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarExcluidosComponent } from './components/agregar-excluidos/agregar-excluidos.component';
import { AgregarParticipantesComponent } from './components/amigo-invisible/agregar-participantes.component';
import { ResultadoSorteoComponent } from './components/resultado-sorteo/resultado-sorteo.component';

const routes: Routes = [
  {path: '', component: AgregarParticipantesComponent},
  {path: 'excluidos', component: AgregarExcluidosComponent},
  {path: 'resultado', component: ResultadoSorteoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
