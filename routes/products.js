const express = require('express')
const router = express.Router();
const productos = require('../api/productos');

router.get('/mensajes', (req, res) => {
    res.send(req.query);
})

router.get('/listar', (req, res) => {
    
    //Solicito a la class Productos la totalidad de la lista de productos
    res.json({Productos: productos.listar()});
})

router.get('/listar/:id', (req, res) => {
    // Pido el producto a devolver y lo muestro en pantalla
    let params = req.params.id
    if (productos.listarUno(params).length > 0 ){
        res.json({ProductoAMostrar: productos.listarUno(params)});
    }else{
        res.json({Error: 'Producto no encontrado!'});
    }
})


router.delete('/borrar/:id', (req, res) => {
    
    //Solicito a la class Productos la totalidad de la lista de productos
    res.json({Productos: productos.borrar()});
})

router.put('/actualizar/:id', (req, res) => {
    
    //Solicito a la class Productos la totalidad de la lista de productos
    res.json({Productos: productos.actualizar()});
})


router.post('/guardar', (req, res) => {
    //Llamo al método "guardar" dentro de la clase "productos"
    productos.guardar(req.body);
    console.log({Producto: req.body})
    
    /* let nombre = req.body.nombre;
    let precio = req.body.precio;
    let url = req.body.url; */

    res.redirect('/api/productos/vista');

    //Guardar productos entre archivos 
    // productos.guardar(req.body)    ====>>>>> productos.metodo(datos a enviar).

})


//Renderizo visualización de productos.
router.get('/vista', (req, res) => {
    let productosDevueltos = productos.listar()
    let hayProductos;
    if(productosDevueltos.length > 0) {hayProductos = true}
    res.render('vista', { productos: productosDevueltos, hayProductos: hayProductos})
})

// Renderizo el ingreso de productos.
router.get('/ingresoProductos', (req, res) => {
    res.render('ingresoProductos')
})


module.exports = router;