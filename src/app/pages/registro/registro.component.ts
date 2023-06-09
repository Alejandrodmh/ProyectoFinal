import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  error: boolean = false;
  correoExistente: boolean = false;
  constructor(private usuariosService:UsuariosService,private router:Router){}

   ngOnInit(): void {
    document.addEventListener('DOMContentLoaded', () => {
      // Tu código aquí para acceder al formulario y manejar el evento de envío
      // Obtener referencia al formulario
const form = document.getElementById('myForm') as HTMLFormElement;

// Manejar el evento de envío del formulario
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Evitar el envío del formulario por defecto
this.error=false
this.correoExistente=false
  // Obtener los valores de los inputs
  const usernameInput = document.getElementById('username') as HTMLInputElement;
  const emailInput = document.getElementById('email') as HTMLInputElement;
  const passwordInput = document.getElementById('password') as HTMLInputElement;

  // Mostrar los valores por consola
  console.log('Nombre de usuario:', usernameInput.value);
  console.log('Correo electrónico:', emailInput.value);
  console.log('Contraseña:', passwordInput.value);
  var nombre=usernameInput.value
  var email=emailInput.value
  var contrasena=passwordInput.value
  this.usuariosService.getEmail(email).subscribe(
    (number:number) => {
      console.log('Numero retornado',number);
      if(nombre && email && contrasena){
      if (number<1){
        console.log("correo no registrado en la bd")
        
          this.usuariosService.registro(nombre,email,contrasena).subscribe(
            () => {
              console.log('Usuario agregado correctamente');
              usernameInput.value = '';
              emailInput.value = '';
              passwordInput.value = '';
              this.router.navigateByUrl("main");
            },
            (error) => {
              console.error('Error al agregar el usuario', error);
            }
          );
        }else{
          this.correoExistente=true;
        }
        }else{
          this.error=true;
        }
        
    },
    (error) => {
      console.error('Error al verificar', error);
    }
  );
  
  
});
    });
    
    

    
   }



}
