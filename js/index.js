// DATOS (Objeto JSON)
articulo1JSON = '{"id": 1, "nombre": "Baggio de naranja", "descripcion": "Caja de 1L", "precio": 120}'
articulo2JSON = '{"id": 2, "nombre": "Ades multifruta", "descripcion": "Caja de 1L", "precio": 130}'
articulo3JSON = '{"id": 3, "nombre": "Baggio de manzana", "descripcion": "Caja de 1L", "precio": 120}'
articulo4JSON = '{"id": 4, "nombre": "Baggio de multifruta", "descripcion": "Caja de 1L", "precio": 120}'

// Se convierten los datos a objetos JavaScript y se utilizan en un array de objetos
const articulo1 = JSON.parse(articulo1JSON);
const articulo2 = JSON.parse(articulo2JSON);
const articulo3 = JSON.parse(articulo3JSON);
const articulo4 = JSON.parse(articulo4JSON);

const articulos = [articulo1, articulo2, articulo3, articulo4];

// CLASES
class Articulo {
    constructor(nombre, descripcion, precio){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = parseFloat(precio);
    }
    sumarIva(){
        this.precio = this.precio * 1.21;
    }
}

//FUNCIONES

function nuevoArticulo(nombre, descripcion, precio){
    const articulo = new Articulo(nombre, descripcion, precio);
    return articulo;
}

function agregarArticulo(articulos, elemento){
    elemento = {id: articulos.length, nombre: elemento.nombre, descripción: elemento.descripcion, precio: elemento.precio};
    articulos.push(elemento);
}

function guardarLocal (clave, articulos){
    localStorage.setItem(clave, articulos);
}

function mostrarArticulos(articulos){
    $('#producto, p').remove();
    $('#formArticulo').append('<p id = "p1" style = "display:none"> Se ha ingresado el producto ' + articulos.nombre + ' con el precio con IVA incluido: ' + articulos.precio.toFixed(2) + '</p>');
    $('#p1').slideDown("slow")
            .delay(2000)
            .slideUp("slow")
            .css("color","green");
}

function enviarFormulario(evento){
    evento.preventDefault();

    let nombre = $('#nombre').val(); 
    let descripcion = $('#descripcion').val(); 
    let precio = $('#precio').val(); 

    const articulo = nuevoArticulo(nombre, descripcion, precio);
    articulo.sumarIva();

    guardarLocal("articulo", JSON.stringify(articulo));
    
    mostrarArticulos(JSON.parse(localStorage.getItem("articulo")));
    agregarArticulo(articulos, articulo)
    console.log(articulos);
}


// CÓDIGO

//let formularioArticulo = document.getElementById("formArticulo");
//formularioArticulo.addEventListener("submit", enviarFormulario);

$(document).ready(function (){
    $('#enviar').click(enviarFormulario)
});