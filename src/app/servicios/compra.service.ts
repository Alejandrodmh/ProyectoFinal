import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Compra } from '../model/Compra';



@Injectable({
  providedIn: 'root'
})
export class ComprasService {
private options={
  headers:{
    'Content-Type':'application/json'
  }
}
private baseUrl="https://localhost:44368/api/"
  constructor(private httpClient:HttpClient) { }

  public getCompras(){
return this.httpClient.get<Compra[]>(`${this.baseUrl}Gym/GetCompras`,this.options)
  }
  compra(id_producto: number, cantidad: number,id_compra: number) {
    const url = `${this.baseUrl}Gym/GetCompras`;
    const body = { 
      id_producto: id_producto,
      cantidad: cantidad ,
      id_compra: id_compra,
    };

    return this.httpClient.put(url, body);
  }
}
