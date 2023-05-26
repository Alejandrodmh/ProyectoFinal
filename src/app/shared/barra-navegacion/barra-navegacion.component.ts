import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { GlobalServiceService } from 'src/app/servicios/global-service.service';

@Component({
  selector: 'app-barra-navegacion',
  templateUrl: './barra-navegacion.component.html',
  styleUrls: ['./barra-navegacion.component.css']
})
export class BarraNavegacionComponent implements OnInit{
  public online:any;
  usuario: Usuario = new Usuario;
constructor(private router:Router,private globalService:GlobalServiceService){
  this.online=false
}
desloguear(){
  this.globalService.loguear(false)
  this.globalService.desloguear()
  this.Navinicio()
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
      this.globalService.getUsuarioSubject().subscribe((usuario: Usuario | null) => {
        if (usuario) {
          this.usuario=usuario;
          // Aquí puedes hacer lo que necesites con el objeto 'usuario' retornado
          console.log('Usuario cambiado en el global service:', usuario);
          // ...
        } else {
          // Manejar el caso cuando el usuario sea null
          console.log('El usuario es null');
          // ...
        }
      });
  
}

}
