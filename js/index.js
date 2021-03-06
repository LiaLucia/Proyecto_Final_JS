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

// VARIABLES
const articulos = [articulo1, articulo2, articulo3, articulo4];
const urlDolar = 'https://www.dolarsi.com/api/api.php?type=valoresprincipales';

//FUNCIONES

function nuevoArticulo(nombre, descripcion, precio){
    const articulo = new Articulo(nombre, descripcion, precio);
    return articulo;
}

function agregarArticulo(articulos, elemento){
    let idUltimoElemento = articulos[articulos.length - 1].id;
    elemento = {id: idUltimoElemento + 1, nombre: elemento.nombre, descripción: elemento.descripcion, precio: elemento.precio.toFixed(2)};
    articulos.push(elemento);
}

function guardarLocal (clave, articulos){
    localStorage.setItem(clave, articulos);
}

function enviarFormulario(evento) {
    evento.preventDefault();
    $.getJSON(urlDolar, function (respuesta, estado){
        if (estado === "success"){
            
            let cotizaciones = respuesta;
            cotizacionDolar = cotizaciones[0].casa.venta;
            let nombre = $('#nombre').val(); 
            let descripcion = $('#descripcion').val(); 
            let precio = $('#precio').val(); 

            if (nombre !== "" && precio !== "" && descripcion !== ""){
                const articulo = nuevoArticulo(nombre, descripcion, parseFloat(precio).toFixed(2));
                articulo.sumarIva();

                guardarLocal("articulo", JSON.stringify(articulo));
                agregarArticulo(articulos, articulo)
                mostrarArticulos(articulos, parseFloat(cotizacionDolar));
            }
            else{
                $('#formArticulo').append('<p id = "textoError" style = "display:none"> No se puede ingresar el artículo ya que se deben completar todos los campos</p>')
                $('#textoError').slideDown("slow")
                                .css("color","red");
            }
            
        }
    })
}

function mostrarArticulos(articulos, cotizacion){
    $(".col-md-4").remove();
    $('#textoError').remove();
    $('#formArticulo').append('<button id="eliminar" class="botonEliminar" style = "display:none"> Eliminar todos los artículos insertados</button>')
    $('#eliminar').slideDown("slow")
    for (articulo of articulos){
        let precioDolar = articulo.precio / cotizacion;
        $('#row1').append('<div class="col-md-4" ><div class="nombre" id = "nombre"><p id = "p1" >Producto: ' + articulo.nombre + '<br> Precio con IVA incluido ($): ' + articulo.precio + '<br> Precio con IVA incluido (U$S): ' + precioDolar.toFixed(2) + '</p> <div style="display:none;" >' + articulo.id + '</div></div>')
    }
}

function eliminarArticulos(evento){
    evento.preventDefault();
    articulos.splice(0, articulos.length);
    $(".botonEliminar").remove();
}


// CÓDIGO
$(document).ready(function (){
    $('#enviar').click(enviarFormulario)
});

$(document).ready(function (){
    $('#eliminar').onclick = function () {eliminarArticulos}
});
