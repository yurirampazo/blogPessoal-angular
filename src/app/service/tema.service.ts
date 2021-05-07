import { Tema } from './../model/Tema';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  constructor(private http: HttpClient) {   } //  objeto token recebe um header, o mesmo que foi usado no postman e ele recebe o tipo HttpHeaders

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  } //Retornar no objeto http um método get para as listas do objeto tipo Tema
  //Será inserido no Authorization, o nome DEVE ser exatamente igual ao mostrado na passagem de parâmetro.

  getAllTema(): Observable<Tema[]>{ //Inserir tipo Observable no método para monitorar se o tipo estará de acordo como requisitado pelo backend. Inserindo em seguida seu tipo.
    //É necessário indicar que essa lista é uma array com []
    //Em seguida colocar o valor que estará na variável de ambiente environment.

    return this.http.get<Tema[]>('http://localhost:8080/tema', this.token) // mesmo endpoint inserido na aplicação backend
    //indicar o token para essa requisição
  }

  getByIdTema(id: number): Observable<Tema>{
    return this.http.get<Tema>(`http://localhost:8080${id}`, this.token)
  }

  postTema(tema: Tema): Observable<Tema>{
    return this.http.post<Tema>('http://localhost:8080/tema/', tema, this.token)
  }

  putTema(tema: Tema): Observable<Tema>{
    return this.http.put<Tema>('http://localhost:8080/tema', tema, this.token)
  }

  deleteTema(id: number) {
    return this.http.delete(`http://localhost:8080/tema/${id}`,this.token)
  }
}
