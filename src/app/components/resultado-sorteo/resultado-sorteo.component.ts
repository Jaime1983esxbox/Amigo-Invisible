import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Amigo } from 'src/app/models/amigo';
import { Regalo } from 'src/app/models/regalo';
import { ComunicacionService } from 'src/app/services/comunicacion.service';

@Component({
  selector: 'app-resultado-sorteo',
  templateUrl: './resultado-sorteo.component.html',
  styleUrls: ['./resultado-sorteo.component.css']
})
export class ResultadoSorteoComponent implements OnInit {

  emparejamientos: Regalo[] = [];

  constructor(private router: Router, private comunicacionService: ComunicacionService) { }

  ngOnInit(): void {
    this.emparejamientos = this.comunicacionService.guardarEmparejamientos();
  }

  volver(){
    this.router.navigateByUrl('');
  }

}
