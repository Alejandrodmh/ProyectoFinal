import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalServiceService } from 'src/app/servicios/global-service.service';
import { Usuario } from 'src/app/model/Usuario';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  public online:any;
  nombre: string="";
  usuario:Usuario=new Usuario;
  constructor(private router:Router,private globalService:GlobalServiceService){
  }
  
login() {
  this.globalService.loguear(true)
  this.router.navigateByUrl("main")
  this.usuario.nombre=this.nombre
  localStorage.setItem("usuario",JSON.stringify(this.usuario));
}
ngOnInit(): void {
  this.globalService.online.subscribe((newData)=>{
    this.online=newData
      });
  
}

}
