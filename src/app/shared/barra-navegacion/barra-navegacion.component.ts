import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalServiceService } from 'src/app/servicios/global-service.service';

@Component({
  selector: 'app-barra-navegacion',
  templateUrl: './barra-navegacion.component.html',
  styleUrls: ['./barra-navegacion.component.css']
})
export class BarraNavegacionComponent implements OnInit{
  public online:any;
  usuario:any
constructor(private router:Router,private globalService:GlobalServiceService){
  this.online=false
}
desloguear(){
  this.globalService.loguear(false)
}
Navins(){
  this.router.navigateByUrl("instalaciones")
}
Navlog(){
  this.router.navigateByUrl("login")
}
Navinicio(){
  this.router.navigateByUrl("main")
}
Navtienda(){
  this.router.navigateByUrl("tienda")
}
Navserv(){
  this.router.navigateByUrl("servicios")
}
ngOnInit(): void {
  this.globalService.online.subscribe((newData)=>{
    this.online=newData
      });
       const usuarioJSON = localStorage.getItem('usuario');
  if (usuarioJSON !== null) {
    let usuario = JSON.parse(usuarioJSON);
    console.log(usuario)
    this.usuario=usuario.nombre
    console.log(this.usuario)
  }
  
}

}
