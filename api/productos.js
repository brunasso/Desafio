class Productos {
    constructor() {
        
        this.id = 0; 
        this.productos = []
    }

    // agregar metodos solicitados.

    //Guardo producto recibido.
    guardar(reqProducto) {
        let idIgual = true;
        while(idIgual){
            //Suma 1 al ID para que vaya cambiando 
            this.id+=1;            
            //Controlar que el ID no fue utilizado
            let elProducto = this.productos.filter((product) =>  { return product.id == this.id});
            if(elProducto.length == 0){
            //Creo el objeto "producto" en base a lo que viene de back end
            let producto ={
                nombre: reqProducto.nombre,
                precio: reqProducto.price,
                thumbnail: reqProducto.thumbnail,
                id: this.id
            } 
    
            //Agrego el producto en el array "productos"
            this.productos.push(producto)
            idIgual = false;

            }
        }
    }
        

        

    //Devuelvo lista de productos
    listar(){
        return this.productos;
    }

    listarUno(idProducto){

        let elProducto = this.productos.filter((product) =>  { return product.id == idProducto});
        return elProducto;
    }

    borrar(idProducto){
        let elProducto = this.productos.filter((product) =>  { return product.id == idProducto})
        this.productos.splice(this.productos.indexOf(elProducto), 1)
        this.id -=1
        return elProducto
    }


    actualizar(idProducto){
        let elProducto = this.productos.filter((product) =>  { 
            if (product.id == idProducto) { 
            }
        });
        return elProducto;
    }
}

// exporto una instancia de la clase
module.exports = new Productos();