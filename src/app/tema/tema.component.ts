import { TemaService } from './../service/tema.service';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Tema } from '../model/Tema';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {


  tema: Tema = new Tema()
  listaTemas: Tema[]        // instanciando objeto tema e lista de temas.

  constructor(
   private router: Router,
   private temaService: TemaService
  ) { } // Injeção de dependências

  ngOnInit() {
    if(environment.token == '') {
      this.router.navigate(['/entrar'])
    }

    this.findAllTemas() //Lista todos os temas

  } //condição para redirecionar o usuario para o login quando o valor do token for nulo.


  findAllTemas() {
    this.temaService.getAllTema().subscribe((resp: Tema[])=> {
      this.listaTemas = resp
    })
  }

  cadastrar(){
    this.temaService.postTema(this.tema).subscribe((resp: Tema)=> {
      this.tema = resp
      alert('Tema cadastrado com sucesso!')
      this.findAllTemas()  //Lista todos os temas
      this.tema = new Tema()  // zerar o campo para a próxima postagem

    })
  }

}
