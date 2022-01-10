import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Amigo } from 'src/app/models/amigo';
import { ComunicacionService } from 'src/app/services/comunicacion.service';

@Component({
  selector: 'app-agregar-participantes',
  templateUrl: './agregar-participantes.component.html',
  styleUrls: ['./agregar-participantes.component.css']
})
export class AgregarParticipantesComponent implements OnInit {

  formGroup!: FormGroup;
  participantes: Amigo[] = [];

  constructor(private formBuilder: FormBuilder, private router: Router,
    private comunicacionService: ComunicacionService) { }

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

  saveParticipants(){
    this.participantes = Object.assign([], this.formGroup.value.amigos);
    this.comunicacionService.crearParticipantes(this.participantes);
    this.router.navigateByUrl('/excluidos');
  }
}
