import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
constructor(private router:Router){}
navInstalaciones(){
  this.router.navigateByUrl("instalaciones")
}
navMain(){
  this.router.navigateByUrl("main")
}
navServicios(){
  this.router.navigateByUrl("servicios")
}
}
