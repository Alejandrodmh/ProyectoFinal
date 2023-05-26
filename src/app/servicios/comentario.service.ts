import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comentario } from '../model/Comentario';



@Injectable({
  providedIn: 'root'
})
export class ComentariosService {
private options={
  headers:{
    'Content-Type':'application/json'
  }
}
private baseUrl="https://localhost:44368/api/"
  constructor(private httpClient:HttpClient) { }

  public getComentarios(){
return this.httpClient.get<Comentario[]>(`${this.baseUrl}Gym/GetComentarios`,this.options)
  }
  comentar(id_producto: number, contenido:string,id_usuario:number) {
    const url = `${this.baseUrl}Gym/GetComentarios`;
    const body = { 
      id_producto: id_producto,
      contenido: contenido,
      id_usuario:id_usuario 
    };

    return this.httpClient.put(url, body);
  }
}
