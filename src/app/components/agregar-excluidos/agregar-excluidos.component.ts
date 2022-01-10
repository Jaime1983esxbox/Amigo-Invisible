import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Amigo } from 'src/app/models/amigo';
import { Regalo } from 'src/app/models/regalo';
import { ComunicacionService } from 'src/app/services/comunicacion.service';

@Component({
  selector: 'app-agregar-excluidos',
  templateUrl: './agregar-excluidos.component.html',
  styleUrls: ['./agregar-excluidos.component.css']
})
export class AgregarExcluidosComponent implements OnInit {

  participantes: Amigo[] = [];
  amigosYaSeleccionados: Amigo[] = [];
  posiblesAmigos: Amigo[] = [];
  emparejamientos: Regalo[] = [];
  nombresParticipantes: string[] = [];
  
  constructor(private router: Router, private comunicacionService: ComunicacionService) { }

  ngOnInit(): void {
    this.participantes = this.comunicacionService.guardarParticipantes();
    // no encuentro el porqué el último elemento del array me sale undefined
    this.participantes.pop();

    this.participantes.forEach(x => {
      this.nombresParticipantes.push(x.nombre);
    });
    
  }

  volver(){
    this.router.navigateByUrl('');
  }

  sorteo(){
    this.router.navigateByUrl('/resultado');
    this.amigosYaSeleccionados = [];
    this.emparejamientos = [];
    this.amigosYaSeleccionados = Object.assign([], this.participantes);
    let amigo1: Amigo;
    let amigo2: Amigo;
    // Poner de condicion que el ultimo elemento que quede en los arrays no sea el mismo amigo.nombre
    while (this.participantes && this.participantes.length > 0 && this.isSorteoNoValido() == false) {
      amigo1 = this.participantes[Math.floor(Math.random() * this.participantes.length)];
      this.posiblesAmigos = this.seleccionarPosibleAmigo(amigo1);
      amigo2 = this.posiblesAmigos[Math.floor(Math.random() * this.posiblesAmigos.length)];
      if(amigo1.nombre != amigo2.nombre){
        let regalo = new Regalo(amigo1, amigo2);
        this.emparejamientos.push(regalo);
        this.comunicacionService.crearParticipantes(this.participantes);
        this.comunicacionService.crearEmparejamientos(this.emparejamientos);
        this.deleteFriend(amigo1);
        this.deleteFriendSelected(amigo2);
      }
    }

    if(this.isSorteoNoValido() == true){
      this.sorteo();
    }
  }  

  isSorteoNoValido(): boolean{
    if(this.participantes.length == 1 && this.amigosYaSeleccionados.length == 1
       && this.participantes[0].nombre == this.amigosYaSeleccionados[0].nombre){
      return true;
    }else{
      return false;
    }
  }

  deleteFriend(amigo: Amigo){
    const index: number = this.participantes.indexOf(amigo);
    if (index !== -1) {
      this.participantes.splice(index, 1);
    }       
  }

  deleteFriendSelected(amigoSeleccionado: Amigo){
    const index: number = this.amigosYaSeleccionados.indexOf(amigoSeleccionado);
    if (index !== -1) {
      this.amigosYaSeleccionados.splice(index, 1);
    }       
  }

  // añadir excluidos a un Amigo hay que pasar el nombre del amigo que queramos excluir
  seleccionarExcluidos(event: any, nombre: any, participante: Amigo){
    if(event.currentTarget.checked){
      if(participante.excluidos == undefined){
        participante.excluidos = [];
      }
      participante.excluidos.push(nombre);
    }else{
      const index: number = participante.excluidos.indexOf(nombre);
      if(index !== -1){
        participante.excluidos.splice(index, 1);
      }
    }
  }
  
  seleccionarPosibleAmigo(amigo1: Amigo){
    let posiblesAmigos: Amigo[] = [];
    posiblesAmigos = this.amigosYaSeleccionados.filter((amigo: any) => {
      return !amigo1.excluidos.includes(amigo.nombre);
    })
    return posiblesAmigos;
  }
}
