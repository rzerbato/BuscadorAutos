//Variables
/**********************/

//Campos
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

//Resultado
const resultado = document.querySelector('#resultado');

//Variables generales
const anioMax = new Date().getFullYear();
const anioMin = anioMax - 10;

const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''    
}

//Listeners
/******************************/
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos( autos ); // autos hace referencia al autos definido bd.js
    llenarSelectAnios();
});

marca.addEventListener('change', e =>{
    datosBusqueda.marca = e.target.value;
    filtrarAutos();
});

year.addEventListener('change', e =>{
    datosBusqueda.year = e.target.value;
    filtrarAutos();
});

minimo.addEventListener('change', e =>{
    datosBusqueda.minimo = e.target.value;
    filtrarAutos();
});

maximo.addEventListener('change', e =>{
    datosBusqueda.maximo = e.target.value;
    filtrarAutos();
});

puertas.addEventListener('change', e =>{
    datosBusqueda.puertas = e.target.value;
    filtrarAutos();
});

transmision.addEventListener('change', e =>{
    datosBusqueda.transmision = e.target.value;
    filtrarAutos();
});

color.addEventListener('change', e =>{
    datosBusqueda.color = e.target.value;
    filtrarAutos();
});

//Funciones
/**********************************/

//Muestra los autos
function mostrarAutos( autos ){

    limpiarHTML();

    autos.forEach( auto => { 
        const autoHTML = document.createElement('p');
        const { marca, modelo, year, puertas, transmision, precio, color } = auto;
        autoHTML.textContent = `${marca}, ${modelo} - ${year} - ${puertas} - Transmisión: ${transmision} - Precio: ${precio} - Color: ${color}`;

        resultado.appendChild(autoHTML);
    });
}

//Limpa el HTML
function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}


//Llena select de años
function llenarSelectAnios(){
    for (let i = anioMax; i >= anioMin; i--) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion);
    }
}

//Filtrar resultado en base a la seleccion de los combos
function filtrarAutos(){
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);    

    if( resultado.length ){
        mostrarAutos(resultado);
    }else{
        noResultado();
    }
}

function noResultado(){
    limpiarHTML();
    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultados. Intenta con otros términos de búsqueda';
    resultado.appendChild(noResultado);
}

function filtrarMarca(auto){
    if ( datosBusqueda.marca ){
        return auto.marca === datosBusqueda.marca;
    }
    return auto;
}

function filtrarYear(auto){
    if ( datosBusqueda.year ){
        return auto.year === parseInt(datosBusqueda.year);
    }
    return auto;
}

function filtrarMinimo(auto){
    if ( datosBusqueda.minimo ){
        return auto.precio >= parseInt(datosBusqueda.minimo);
    }
    return auto;
}

function filtrarMaximo(auto){
    if ( datosBusqueda.maximo ){
        return auto.precio <= parseInt(datosBusqueda.maximo);
    }
    return auto;
}

function filtrarPuertas(auto){
    if ( datosBusqueda.puertas ){
        return auto.puertas === parseInt(datosBusqueda.puertas);
    }
    return auto;
}

function filtrarTransmision(auto){
    if ( datosBusqueda.transmision ){
        return auto.transmision === datosBusqueda.transmision;
    }
    return auto;
}

function filtrarColor(auto){
    if ( datosBusqueda.color ){
        return auto.color === datosBusqueda.color;
    }
    return auto;
}

