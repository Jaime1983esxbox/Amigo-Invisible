import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Amigo } from 'src/app/models/amigo';
import { Regalo } from 'src/app/models/regalo';

@Component({
  selector: 'app-amigo-invisible',
  templateUrl: './amigo-invisible.component.html',
  styleUrls: ['./amigo-invisible.component.css']
})
export class AmigoInvisibleComponent implements OnInit {

  formGroup!: FormGroup;
  participantes: Amigo[] = [];
  amigosYaSeleccionados: Amigo[] = [];
  amigosPosibles: Amigo[] = [];
  emparejamientos: Regalo[] = [];
  condiciones: boolean = false;
  sorteo: boolean = false;
  condicionParticipante: boolean = false;
  mostrarBoton: boolean = true;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.crearFormulario();
    this.agregarAmigo();
    
  }

  crearFormulario() {
    this.formGroup = this.formBuilder.group({
      amigos: this.formBuilder.array([])
    });
  }

  get amigos(): FormArray {
    return this.formGroup.get('amigos') as FormArray;
  }

  get amigosExcluidos(): FormArray{
    return this.amigos.value.nombre;
  }

  agregarAmigo() {
    const amigo = this.formBuilder.group({
      nombre: new FormControl(''),
      email: new FormControl('')
    });
    this.amigos.push(amigo);
  }

  borrarAmigo(indice: number) {
    this.amigos.removeAt(indice);
  }

  selectFriend(){
    this.participantes = [];
    this.amigosYaSeleccionados = [];
    this.emparejamientos = [];
    this.sorteo = true;
    this.participantes = Object.assign([], this.formGroup.value.amigos);
    this.amigosYaSeleccionados = Object.assign([], this.participantes);
    let amigo1: Amigo;
    let amigo2: Amigo;
    // Poner de condicion que el ultimo elemento que quede en los arrays no sea el mismo amigo.nombre
    while (this.participantes && this.participantes.length > 0 && this.isSorteoNoValido() == false) {
      amigo1 = this.participantes[Math.floor(Math.random() * this.participantes.length)];
      amigo2 = this.amigosYaSeleccionados[Math.floor(Math.random() * this.amigosYaSeleccionados.length)];
      if(amigo1.nombre != amigo2.nombre){
        let regalo = new Regalo(amigo1, amigo2);
        this.emparejamientos.push(regalo);
        this.deleteFriend(amigo1);
        this.deleteFriendSelected(amigo2);
      }
    }

    if(this.isSorteoNoValido() == true){
      this.selectFriend();
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

  // añadir excluidos a un Amigo hay que pasar el nombre del amigo que queramos excluir
  fieldsChange(amigo: string, amigoExcluido: string, values: any){
    if(values.currentTarget.checked){
      console.log(amigo);
      console.log(amigoExcluido);
      console.log(values);
    }
  }

  // seleccionarPosibleAmigo(amigoSeleccionado: Amigo){
  //   let posiblesAmigos: Amigo[] = [];
  //   posiblesAmigos = this.amigosYaSeleccionados.filter((amigo) => {
  //     return amigo.nombre != amigoSeleccionado.nombre;
  //   })
  //   return posiblesAmigos;
  // }

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

  addConditions(){
    this.condiciones = true;
    this.condicionParticipante = true;
    this.mostrarBoton = false;
    
    
  }

  saveConditions(){
    
  }

}
