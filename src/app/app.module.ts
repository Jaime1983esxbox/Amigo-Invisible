import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgregarParticipantesComponent } from './components/amigo-invisible/agregar-participantes.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AgregarExcluidosComponent } from './components/agregar-excluidos/agregar-excluidos.component';
import { ResultadoSorteoComponent } from './components/resultado-sorteo/resultado-sorteo.component';

@NgModule({
  declarations: [
    AppComponent,
    AgregarParticipantesComponent,
    AgregarExcluidosComponent,
    ResultadoSorteoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
