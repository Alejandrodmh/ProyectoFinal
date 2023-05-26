import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { MainComponent } from "./main/main.component";
import { TiendaComponent } from "./pages/tienda/tienda.component";
import { LoginComponent } from "./pages/login/login.component";
import { RegistroComponent } from "./pages/registro/registro.component";
import { PaginaServiciosComponent } from "./pages/pagina-servicios/pagina-servicios.component";
import { BarraNavegacionComponent } from "./shared/barra-navegacion/barra-navegacion.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { RouterModule } from "@angular/router";
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { SidebarModule } from 'primeng/sidebar';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { FooterComponent } from './shared/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    MainComponent,
    TiendaComponent,
    LoginComponent,
    RegistroComponent,
    BarraNavegacionComponent,
    PaginaServiciosComponent,
    FooterComponent
    
  ],
  imports: [BrowserModule,AppRoutingModule,RouterModule,ButtonModule,DialogModule,FormsModule,SidebarModule,HttpClientModule,NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
