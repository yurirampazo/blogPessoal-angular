import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/User';
import { UserLogin } from '../model/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    private http: HttpClient
  ) { }
  
  entrar(userLogin:UserLogin): Observable<UserLogin> {
    return this.http.post<UserLogin>(`${environment.server}/usuarios/logar`, userLogin)
  }

  cadastrar(user: User) : Observable<User>{
    return  this.http.post<User>(`${environment.server}/usuarios/cadastrar`, user)
  }

  getByIdUser(id: number): Observable<User>{
    return this.http.get<User>(`${environment.server}/usuarios/${id}`)
  }
  logado() {
    let ok: boolean = false

    if ( environment.token != '') {
    ok = true
  }
    return ok
  }
}
