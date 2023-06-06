import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Producto } from 'src/app/model/Producto';
import { ComprasService } from 'src/app/servicios/compra.service';
import { ProductosService } from 'src/app/servicios/productos.service';
import { forkJoin, Observable } from 'rxjs';
import { ComentariosService } from 'src/app/servicios/comentario.service';
import { GlobalServiceService } from 'src/app/servicios/global-service.service';
import { Usuario } from 'src/app/model/Usuario';
import { Comentario } from 'src/app/model/Comentario';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {
  @ViewChild('dialog') dialog!: ElementRef;
  @ViewChild('commentInput') commentInput!: ElementRef;
  selectedProductId: number | null = null;
  usuario: Usuario = new Usuario();
  precioTotal = 0;
  productos: Producto[] = []
  currentPage = 1;
  totalItems = 0;
  carrito: Producto[] = [];
  productoActual:Producto=new Producto;
  comentarios:Comentario[]=[];
  comentariosVisible: boolean = false;
  openDialog(id_producto: number): void {
    this.selectedProductId = id_producto;
    const dialogElement = this.dialog.nativeElement as HTMLElement;
    dialogElement.style.display = 'block';
  }
  closeDialog(): void {
    const dialogElement = this.dialog.nativeElement as HTMLElement;
    dialogElement.style.display = 'none';
  }
  constructor(
    private productosService: ProductosService,
    private comprasService: ComprasService,
    private comentariosService: ComentariosService,
    private globalService: GlobalServiceService
  ) {}

  ngOnInit(): void {
    this.productosService.getProductos().subscribe((productos: Producto[]) => {
      this.productos = productos;
      this.totalItems = this.productos.length;
    });
    this.globalService.getUsuarioSubject().subscribe((usuario: Usuario | null) => {
      if (usuario) {
        this.usuario = usuario;
        console.log('Usuario cambiado en el global service:', usuario);
      } else {
        console.log('El usuario es null');
      }
    });
  }

  getComentariosPorProducto(producto:Producto): Comentario[] {
    return this.comentarios.filter((comentario) => comentario.id_producto === producto.id_producto);
  }
  verComentarios(producto:Producto){
    this.productoActual=producto;
    this.comentariosVisible=!this.comentariosVisible
    this.comentariosService.getComentarios().subscribe((comentarios:Comentario[])=>{
      this.comentarios=comentarios;
      this.comentariosVisible=true;
    });
  }
  onCommentAdded(comment?: string): void {
    if (this.selectedProductId && comment) {
      console.log('Nuevo comentario:', comment);
      console.log('ID del producto:', this.selectedProductId);
      this.comentariosService.comentar(this.selectedProductId, comment, this.usuario.id_usuario).subscribe(
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
  agregarAlCarrito(producto: Producto): void {
    const productoExistente = this.carrito.find((p) => p.nombre === producto.nombre);

    if (productoExistente) {
      productoExistente.cantidad++;
    } else {
      const productoParaAgregar = { ...producto, cantidad: 1 };
      this.carrito.push(productoParaAgregar);
    }
    this.precioTotal = this.calcularTotal();
  }


  calcularTotal(): number {
    const total = this.carrito.reduce((acumulador, producto) => acumulador + producto.precio * producto.cantidad, 0);
    return total;
  }

  eliminarProducto(producto: Producto): void {
    if (producto.cantidad > 1) {
      producto.cantidad--;
    } else {
      const index = this.carrito.indexOf(producto);
      if (index !== -1) {
        this.carrito.splice(index, 1);
      }
    }
    this.precioTotal = this.calcularTotal();
  }

  sumarProducto(producto:Producto){
    producto.cantidad++
    this.precioTotal = this.calcularTotal();
  }

  async hacerSolicitudes(): Promise<void> {
    try {
      const id_compra = Math.floor(Math.random() * 1000000); // Generar una única id_compra
      for (const producto of this.carrito) {
        await this.hacerSolicitud(producto, id_compra); // Pasar la id_compra como argumento
      }
      this.carrito = []; // Vaciar el carrito una vez que todas las solicitudes se completen
      console.log('Todas las solicitudes se completaron con éxito');
    } catch (error) {
      console.error('Error en una o varias solicitudes', error);
    }
  }
  
  async hacerSolicitud(producto: Producto, id_compra: number): Promise<void> {
    const id_usuario = this.usuario.id_usuario;
    return new Promise<void>((resolve, reject) => {
      this.comprasService.compra(producto.id_producto, producto.cantidad, id_compra, id_usuario)
        .subscribe(
          () => {
            console.log(`Solicitud para el producto ${producto.id_producto} completada`);
            resolve();
          },
          (error) => {
            console.error(`Error en la solicitud para el producto ${producto.id_producto}`, error);
            reject(error);
          }
        );
    });
  }
}
