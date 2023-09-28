let infoProduccion = document.getElementById('infoProduccion')
let infoAlto = document.getElementById("infoAlto")
let infoBajo = document.getElementById("infoBajo")
let contenedorAlto = document.getElementById("contenedorAlto")
let contenedorBajo = document.getElementById("contenedorBajo")


const lotes = [];
const pilaBajo = [];
const pilaAlto = [];

let data;
async function traerDatos() {
    try {
        let respuesta = await fetch("../assets/data/pilasArmadas.json");
        data = await respuesta.json();
        console.log(data);


    data.forEach((element) => {
        if (element.nbv < 200) {
            pilaBajo.push(element);
        } else {
            pilaAlto.push(element);
        }
    });

    pilaAlto.forEach((elemento)=>{
        contenedorAlto.innerHTML += `<div class="infoLoteAlto">${elemento.id}</div>`
    })

    pilaBajo.forEach((elemento)=>{
        contenedorBajo.innerHTML += `<div class="infoLoteBajo">${elemento.id}</div>`
    })

    console.log(pilaBajo);
    console.log(pilaAlto);
    } catch (error) {
        console.error();
    }
}
traerDatos();












/*class Lote {
    constructor(id, nbv) {
        this.id = id;
        this.nbv = nbv;
    }
}

function crearLote(id, nbv) {
    let nuevoLote = new Lote(id, nbv);
    lotes.push(nuevoLote);

    if (nbv < 200) {
        pilaBajo.push(nuevoLote);
    } else {
        pilaAlto.push(nuevoLote);
    }
}*/
