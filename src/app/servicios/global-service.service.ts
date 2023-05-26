import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class GlobalServiceService {
  private dataSubject = new Subject<any>();
  public online = this.dataSubject.asObservable();
  
  private usuario: Usuario | null = null;
  private usuarioSubject: BehaviorSubject<Usuario | null> = new BehaviorSubject<Usuario | null>(null);
  usuarioObservable = this.usuarioSubject.asObservable();

  public getUsuarioSubject(): BehaviorSubject<Usuario | null> {
    return this.usuarioSubject;
  }
  
  loguear(online: any): void {
    this.dataSubject.next(online);
  }
  
  public desloguear(): void {
    this.usuario = null;
    this.usuarioSubject.next(null);
  }
  
  login(usuario: Usuario): void {
    this.usuarioSubject.next(usuario);
  }

  getUsuario(): Usuario | null {
    return this.usuario;
  }
}
