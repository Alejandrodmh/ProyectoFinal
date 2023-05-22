import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Usuario } from '../model/Usuario';
@Injectable({
  providedIn: 'root'
})
export class GlobalServiceService {
  private dataSubject = new Subject<any>();
  public online=this.dataSubject.asObservable();
  public usuario=this.dataSubject.asObservable();
  user:Usuario=new Usuario;
  
  loguear(online:any){
this.dataSubject.next(online)
  }
}
