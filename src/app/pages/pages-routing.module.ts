import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainComponent } from '../main/main.component';
import { TiendaComponent } from './tienda/tienda.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { PaginaServiciosComponent } from './pagina-servicios/pagina-servicios.component';
import { PaginaInstalacionesComponent } from './pagina-instalaciones/pagina-instalaciones.component';

const routes: Routes = [
  { path: 'main', component: MainComponent},
    { path: 'tienda', component: TiendaComponent,data:{title:"tienda"} },
    { path: 'login', component: LoginComponent,data:{title:"login"} },
    { path: 'registro', component: RegistroComponent,data:{title:"registro"} },
    { path: 'servicios', component: PaginaServiciosComponent,data:{title:"servicios"} },
    { path: 'instalaciones', component: PaginaInstalacionesComponent,data:{title:"instalaciones"} }
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
