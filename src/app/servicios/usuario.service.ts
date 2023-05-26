import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Usuario } from '../model/Usuario';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
private options={
  headers:{
    'Content-Type':'application/json'
  }
}
private baseUrl="https://localhost:44368/api/"
  constructor(private httpClient:HttpClient) { }

  public getUsuarios(){
return this.httpClient.get<Usuario[]>(`${this.baseUrl}Gym/GetUsuarios`,this.options)
  }
  public getEmail(email: string): Observable<number> {
    const url = `${this.baseUrl}Gym/GetEmail`;
    const body = { 
      email: email,
    };
    const options = { body };
  
    return this.httpClient.post<number>(url, body);
  }
  public login(email:string,contrasena:string){
    const url = `${this.baseUrl}Gym/GetLogin`;
    const body = { 
      email: email,
      contrasena:contrasena
    };
    return this.httpClient.post<Usuario>(url,body)
  }
  
  registro(nombre:string,email:string,contrasena:string) {
    const url = `${this.baseUrl}Gym/GetUsuarios`;
    const body = { 
      nombre: nombre,
      email: email,
      contrasena: contrasena  
    };

    return this.httpClient.put(url, body);
  }
}
