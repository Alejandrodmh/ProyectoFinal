export class Producto {
    id_producto:       number;
    nombre:   string;
    descripcion:    string;
    precio:   number;
    cantidad:   number;
    imagen:  string;

    constructor(){
        this.id_producto=0;
        this.nombre="";
        this.descripcion="";
        this.imagen="";
        this.precio=0;
        this.cantidad=0;
        
    }
}
