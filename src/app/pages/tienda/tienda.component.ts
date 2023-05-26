import { Component, OnInit,ViewChild,ComponentFactoryResolver,ViewContainerRef,ElementRef } from '@angular/core';
import { Producto } from 'src/app/model/Producto';
import { ComprasService } from 'src/app/servicios/compra.service';
import { ProductosService } from 'src/app/servicios/productos.service';
import { forkJoin ,Observable} from 'rxjs';
import { ComentariosService } from 'src/app/servicios/comentario.service';
import { GlobalServiceService } from 'src/app/servicios/global-service.service';
import { Usuario } from 'src/app/model/Usuario';
@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit{
  @ViewChild('dialog') dialog!: ElementRef;
  @ViewChild('commentInput') commentInput!: ElementRef;
selectedProductId: number | null = null;
usuario: Usuario = new Usuario;
openDialog(id_producto: number): void {
  this.selectedProductId = id_producto;
  const dialogElement = this.dialog.nativeElement as HTMLElement;
  dialogElement.style.display = 'block';
}
  
  
  
onCommentAdded(comment?: string): void {
  if (this.selectedProductId && comment) {
    console.log('Nuevo comentario:', comment);
    console.log('ID del producto:', this.selectedProductId);
    this.comentariosService.comentar(this.selectedProductId, comment,this.usuario.id_usuario).subscribe(
      () => {
        console.log('Comentario agregado correctamente');
      },
      (error) => {
        console.error('Error al agregar el comentario', error);
      }
    );
    this.selectedProductId = null;
  }
  this.commentInput.nativeElement.value = '';

  const dialogElement = this.dialog.nativeElement as HTMLElement;
  dialogElement.style.display = 'none';
}

closeDialog(): void {
  const dialogElement = this.dialog.nativeElement as HTMLElement;
  dialogElement.style.display = 'none';
}

  productos:Producto[]=[]
  currentPage = 1;
  totalItems = 0;
  carrito: Producto[] = [];

  constructor(private productosService:ProductosService,private comprasService:ComprasService
    ,private comentariosService:ComentariosService,private globalService:GlobalServiceService){}
  ngOnInit(): void {
    this.productosService.getProductos().subscribe((productos:Producto[]) => {
      this.productos=productos; 
      this.totalItems = this.productos.length;
    })
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
  agregarAlCarrito(producto: Producto): void {
    const productoExistente = this.carrito.find(p => p.nombre === producto.nombre);
  
    if (productoExistente) {
      // Si el producto ya existe en el carrito, incrementar la cantidad
      productoExistente.cantidad++;
    } else {
      // Si el producto no existe en el carrito, agregarlo con cantidad 1
      const productoParaAgregar = { ...producto, cantidad: 1 }; // Crear una nueva instancia del producto con la propiedad cantidad
      this.carrito.push(productoParaAgregar);
    }
  }
  comprar(): void {
    const id_compra = Math.floor(Math.random() * 1000000);
    const observables: Observable<any>[] = [];
  
    this.carrito.forEach(producto => {
      const id_producto = producto.id_producto;
      const cantidad = producto.cantidad;
      const id_usuario = this.usuario.id_usuario;
      const observable = this.comprasService.compra(id_producto, cantidad, id_compra,id_usuario);
      observables.push(observable);
    });
  
    forkJoin(observables).subscribe(
      () => {
        console.log('Todas las compras se realizaron con éxito');
        this.carrito = []; // Vaciar el carrito después de la compra
      },
      (error) => {
        console.error('Error al realizar una o varias compras', error);
      }
    );
  }
  
  
  
}
