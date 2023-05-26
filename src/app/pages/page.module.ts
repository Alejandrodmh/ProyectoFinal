import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiendaComponent } from './tienda/tienda.component';
import { AppRoutingModule } from '../app-routing.module';
import { PagesRoutingModule } from './pages-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { PaginaServiciosComponent } from './pagina-servicios/pagina-servicios.component';
import { PaginaInstalacionesComponent } from './pagina-instalaciones/pagina-instalaciones.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [ PaginaInstalacionesComponent
  ],
  imports: [
    CommonModule,PagesRoutingModule,AppRoutingModule
  ],
  exports:[
  ]
})
export class PageModule { }
