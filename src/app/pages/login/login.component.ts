import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalServiceService } from 'src/app/servicios/global-service.service';
import { Usuario } from 'src/app/model/Usuario';
import { UsuariosService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public online: any;
  nombre: string = "";
  usuario: Usuario = new Usuario();

  constructor(
    private router: Router,
    private globalService: GlobalServiceService,
    private usuarioService: UsuariosService
  ) {}

  ngOnInit(): void {
    this.globalService.online.subscribe((newData) => {
      this.online = newData;
    });

    const form = document.getElementById('myForm') as HTMLFormElement;

    form.addEventListener('submit', (event) => {
      event.preventDefault(); // Evitar el envío del formulario por defecto
      console.log('Evento de envío del formulario capturado');
      const emailInput = document.getElementById('email') as HTMLInputElement;
      const passwordInput = document.getElementById('contrasena') as HTMLInputElement;
  
      console.log('Correo electrónico:', emailInput.value);
      console.log('Contraseña:', passwordInput.value);
      var email = emailInput.value;
      var contrasena = passwordInput.value;
  
      this.usuarioService.login(email, contrasena).subscribe(
        (usuario: Usuario) => {
          if (usuario.id_usuario > 0) {
            console.log('Login exitoso:', usuario.nombre);
            this.login(usuario);
          } else {
            console.log('El usuario no existe o los datos son incorrectos');
          }
        },
        (error: any) => {
          console.error('Error en el login:', error);
        }
      );
    });
  }

  login(usuario: Usuario) {
    this.globalService.loguear(true);
    this.router.navigateByUrl("main");
    this.globalService.login(usuario);
  }
}
