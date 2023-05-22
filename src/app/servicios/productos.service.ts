import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../model/Producto';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {
private options={
  headers:{
    'Content-Type':'application/json'
  }
}
private baseUrl="https://localhost:44368/api/"
  constructor(private httpClient:HttpClient) { }

  public getProductos(){
return this.httpClient.get<Producto[]>(`${this.baseUrl}Gym/GetProductos`,this.options)
  }
}
