import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Amigo } from '../models/amigo';
import { Regalo } from '../models/regalo';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionService {

  mensajeSubjectAmigo = new Subject<Amigo[]>();
  mensajeObservableAmigo = this.mensajeSubjectAmigo.asObservable();
  participantes: Amigo[] = [];

  mensajeSubjectRegalo = new Subject<Regalo[]>();
  mensajeObservableRegalo = this.mensajeSubjectRegalo.asObservable();
  emparejamientos: Regalo[] = [];

  constructor() { }

  crearParticipantes(participantes: Amigo[]){
    localStorage.setItem('participantes', JSON.stringify(participantes));
    this.mensajeSubjectAmigo.next(participantes);
    this.participantes = participantes;
  }

  guardarParticipantes(): Amigo[]{
    let mensajeLocalStorage: any = localStorage.getItem('participantes');
    this.participantes.push(mensajeLocalStorage);
    return this.participantes;
  }

  crearEmparejamientos(emparejamientos: Regalo[]){
    localStorage.setItem('emparejamientos', JSON.stringify(emparejamientos));
    this.mensajeSubjectRegalo.next(emparejamientos);
    this.emparejamientos = emparejamientos;
  }

  guardarEmparejamientos(): Regalo[]{
    let mensajeLocalStorage: any = localStorage.getItem('emparejamientos');
    this.emparejamientos.push(mensajeLocalStorage);
    return this.emparejamientos;
  }

}
