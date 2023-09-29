let volumen = 0;

//Se comienza el proceso de produccion de la harina de pescado ingresando la materia prima
//que en este caso sería el residuo de pescado, una vez que ingresa, se puede trasnferir
//al cocinador para cocinar el mismo

let btnPileta = document.getElementById('btnPileta')

function primerAlert () {
  alert("Este alert marca el 1er cambio")
}

btnPileta.addEventListener("click", primerAlert);


let btnCocinador = document.getElementById('btnCocinador')

function segundoAlert (){
  alert("Este alert corresponde al 2do cambio")
}

btnCocinador.addEventListener('click', segundoAlert)


// Agust hizo este cambio

//La pileta soporta 350000Kg de materia prima

function textoExito(texto) {
  texto.classList.remove("infoRojo");
  texto.classList.add("infoVerde");
  Toastify({
    text: "Operación Exitosa",
    offset: {
      x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
      y: 10, // vertical axis - can be a number or a string indicating unity. eg: '2em'
    },
    style: {
      background:
        "radial-gradient(circle, rgba(63,91,251,1) 12%, rgba(252,70,107,1) 80%)",
    },
  }).showToast();
}

function textoFracaso(texto) {
  texto.classList.remove("infoVerde");
  texto.classList.add("infoRojo");
}

const pileta = {
  materiaPrima: "Pescado",
  capacidad: 50000,
  volumenActual: 0,
  ingresoPescado: function (volumen) {
    //Se indican las condicones para que ingrese pescado, que el volumen ingresado sea menor a la capacidad que
    //soporta la pileta y que sea menor o igual a la cantidad que sobra entre la capacidad y lo que ya hay en
    //pileta, se aplicaria para un segundo ingreso de materia prima
    if (
      volumen <= this.capacidad &&
      volumen <= this.capacidad - this.volumenActual
    ) {
      this.volumenActual += volumen;
      infoPileta.innerHTML = `Se ingresan ${volumen} kilos de pescado a la pileta`;
      textoExito(infoPileta);
    } else {
      //En cualquiera de los dos casos, se superaria la capacidad y no ingresaria esa cantidad de pescado
      infoPileta.innerHTML = `Se alcanzo la capacidad maxima de pescado en la pileta`;
      textoFracaso(infoPileta);
    }
  },
  transferirPescado: function (volumen) {
    if (
      this.volumenActual > 0 &&
      volumen <= this.volumenActual &&
      volumen <=
        cocinador.capacidad -
          (cocinador.volumenCrudo + cocinador.volumenCocinado)
    ) {
      //Este if transfiere materia prima si se cumplen 3 condiciones: 1ro, que el vol
      this.volumenActual -= volumen;
      cocinador.volumenCrudo += volumen;
      infoPileta.innerHTML = `Se transfirieron ${volumen} kilos de pescado al cocinador`;
      infoCocinador.innerHTML = `Hay ${cocinador.volumenCrudo} kilos de pescado crudo en cocinador`;
      textoExito(infoPileta);
    } else if (this.volumenActual == 0) {
      infoPileta.innerHTML = `No se puede transferir porque no hay pescado en pileta`;
      textoFracaso(infoPileta);
    } else if (volumen > this.volumenActual) {
      //Este if me avisa si quiero transferir mas cantidad de la que hay en la pileta
      infoPileta.innerHTML = `Se quieren trasnferir ${volumen} kilos de pescado, pero solo hay disponibles ${this.volumenActual}`;
      textoFracaso(infoPileta);
    } else {
      infoPileta.innerHTML = `La cantidad de pescado que quiere transferir supera la capacidad maxima del cocinador`;
      textoFracaso(infoPileta);
    }
  },
};

//El cocinador recibe pescado crudo y lo cocina antes de ser trasnferido a la prensa

const cocinador = {
  materiaPrima: "Pescado",
  capacidad: 2000,
  volumenCrudo: 0,
  volumenCocinado: 0,
  cocinarPescado: function (volumen) {
    if (volumen > 0 && volumen <= this.volumenCrudo) {
      this.volumenCrudo -= volumen;
      this.volumenCocinado += volumen;
      infoCocinador.innerHTML = `Se cocinaron ${volumen} de pescado crudo`;
      textoExito(infoCocinador);
    } else if (volumen == 0) {
      infoCocinador.innerHTML = `No hay pescado crudo para cocinar`;
      textoFracaso(infoCocinador);
    } else {
      infoCocinador.innerHTML = `Se quieren cocinar ${volumen} kilos de pescado pero solo hay disponible ${this.volumenCrudo}`;
      textoFracaso(infoCocinador);
    }
  },
  transferirPescado: function (volumen) {
    if (
      this.volumenCocinado > 0 &&
      volumen <= this.volumenCocinado &&
      volumen <=
        prensa.capacidad - (prensa.volumenActual + prensa.volumenPrensado)
    ) {
      this.volumenCocinado -= volumen;
      prensa.volumenActual += volumen;
      infoCocinador.innerHTML = `Se transfieren ${volumen} de pescado cocinado a la prensa`;
      infoPrensa.innerHTML = `Hay ${prensa.volumenActual} kilos de pescado cocinado en la prensa`;
      textoExito(infoCocinador);
    } else if (this.volumenCocinado == 0) {
      infoCocinador.innerHTML = `No se puede transferir porque no hay pescado cocinado`;
      textoFracaso(infoPileta);
    } else if (volumen > this.volumenCocinado) {
      infoCocinador.innerHTML = `Usted quiso transferir ${volumen} kilos de pescado pero solo hay disponible ${this.volumenCocinado}`;
      textoFracaso(infoPileta);
    } else {
      infoCocinador.innerHTML = `La cantidad de pescado cocinado que quiere transferir supera la capacidad maxima de la prensa`;
      textoFracaso(infoPileta);
    }
  },
};

//La prensa se encarga de prensar el pescado cocinado para extrarle la mayor cantidad de agua posible
//antes de transferirlo al rotadisco secarlo

const prensa = {
  materiaPrima: "Prensado",
  capacidad: 2000,
  volumenActual: 0,
  volumenPrensado: 0,
  prensarPescado: function (volumen) {
    if (volumen > 0 && volumen <= this.volumenActual) {
      this.volumenActual -= volumen;
      this.volumenPrensado += volumen;
      infoPrensa.innerHTML = `Se prensan ${volumen} de pescado previamente cocinado`;
      textoExito(infoPrensa);
    } else if (volumen == 0) {
      infoPrensa.innerHTML = "No hay pescado para prensar";
      textoFracaso(infoPrensa);
    } else {
      infoPrensa.innerHTML =
        "Se deja de ingresar pescado por equipo sobrecargado";
      textoFracaso(infoPrensa);
    }
  },
  transferirPrensado: function (volumen) {
    if (
      volumen > 0 &&
      volumen <= this.volumenPrensado &&
      volumen <= rtd.capacidad - (rtd.volumenActual + rtd.volumenSecado)
    ) {
      this.volumenPrensado -= volumen;
      rtd.volumenActual += volumen;
      infoPrensa.innerHTML = `Se transfieren ${volumen} kilos de prensado al rotadisco`;
      infoRtd.innerHTML = `Hay ${rtd.volumenActual} kilos de producto cocinado en el rotadisco`;
      textoExito(infoPrensa);
    } else if (volumen == 0) {
      infoPrensa.innerHTML = `No hay pescado prensado`;
      textoFracaso(infoPrensa);
    } else if (volumen > this.volumenPrensado) {
      infoPrensa.innerHTML = `Se quieren transferir ${volumen} kilos de prensado pero solo hay ${this.volumenPrensado} disponibles`;
      textoFracaso(infoPrensa);
    } else {
      infoPrensa.innerHTML = `La cantidad de prensado que quiere transferir supera la capacidad maxima del rotadisco`;
      textoFracaso(infoPrensa);
    }
  },
};

//El rotadisco se encarga de secar la harina para que salga con los parametros requerido
//por los mercados para que pueda ser comercializada, se transfiere al silo

const rtd = {
  materiaPrima: "Harina de Pescado",
  capacidad: 2000,
  volumenActual: 0,
  volumenSecado: 0,
  secarPrensado: function (volumen) {
    if (volumen > 0 && volumen <= this.volumenActual) {
      this.volumenActual -= volumen;
      this.volumenSecado += volumen;
      infoRtd.innerHTML = `Se secan ${volumen} kilos pescado previamente cocinado y prensado`;
      textoExito(infoRtd);
    } else if (volumen == 0) {
      infoRtd.innerHTML = "El rotadisco se encuentra vacio";
      textoFracaso(infoRtd);
    } else {
      infoRtd.innerHTML =
        "Se deja de ingresar prensado por equipo sobrecargado";
      textoFracaso(infoRtd);
    }
  },
  trasnferirHarina: function (volumen) {
    if (
      volumen > 0 &&
      volumen <= this.volumenSecado &&
      volumen <= silo.capacidad - silo.volumenActual
    ) {
      this.volumenSecado -= volumen;
      silo.volumenActual += volumen;
      infoRtd.innerHTML = `Se transfieren ${volumen} kilos de harina al silo`;
      infoSilo.innerHTML = `Hay ${silo.volumenActual} kilos de producto terminado en el silo`;
      textoExito(infoRtd);
    } else if (volumen == 0) {
      infoRtd.innerHTML = `El Rotadisco se encuentra vacio`;
      textoFracaso(infoRtd);
    } else if (volumen > this.volumenSecado) {
      infoRtd.innerHTML = `Se quieren transferir ${volumen} kilos de harina pero solo hay ${this.volumenSecado} disponibles`;
      textoFracaso(infoRtd);
    } else {
      infoRtd.innerHTML = `La cantidad de harina que quiere transferir supera la capacidad maxima del silo`;
      textoFracaso(infoRtd);
    }
  },
};

//En el silo se almacena la harina antes de ser embolsada en bolsas de 50Kg, una ves que
//se sabe la cantidad de bolsas necesarias para ser comercializadas, se procede a sacar
//bolsas que seran agregadas a distintos lotes

const silo = {
  producto: "Harina de Pescado",
  capacidad: 2000,
  volumenActual: 0,
  averiguarBolsas: function () {
    let bolsasDisponibles = Math.floor(this.volumenActual / 50);
    infoSilo.innerHTML = `La cantidad de bolsas disponibles es ${bolsasDisponibles}`;
    return bolsasDisponibles;
  },
  sacarBolsas: function (cantidadBolsas) {
    if (cantidadBolsas <= Math.floor(this.volumenActual / 50)) {
      this.volumenActual -= cantidadBolsas * 50;
      organizadorLote.bolsasTotales += cantidadBolsas;
      infoSilo.innerHTML = `Se embolsaron ${cantidadBolsas} bolsas de 50 kilos`;
      textoExito(infoSilo);
    } else {
      infoSilo.innerHTML = `No hay harina para embolsar bolsas`;
      textoFracaso(infoSilo);
    }
  },
};

//Los lotes se organizan con una cantidad limitada de bolsas, cada lote contiene un maximo de 10 bolsas
//Cuando se completa un lote se comienza con otro, para identificarlos se van enumerando "Lote 1 - Lote 2 - etc"

const organizadorLote = {
  bolsasTotales: 0,
  preLotes: 0,
  postLotes: 0,
  crearLote: function () {
    let lotesDisponibles = Math.floor(this.bolsasTotales / 10);
    this.preLotes = Lotes.length;
    if (lotesDisponibles > 0) {
      let pilaLocalStorage = localStorage.getItem("pilas");
      if (pilaLocalStorage == undefined) {
        this.bolsasTotales -= lotesDisponibles * 10;
        for (let i = 1; i <= lotesDisponibles; i++) {
          //Lotes.push(`Lote numero ${Lotes.length + organizadorLote.preLotes + 1}`)
          Lotes.push({ numeroDeLote: Lotes.length + 1 });
        }
        this.postLotes = Lotes.length;
        infoLote.innerHTML = `Se crean ${Lotes.length} Lotes`;
        textoExito(infoLote);
      } else {
        let pilaParseada = JSON.parse(pilaLocalStorage);
        this.bolsasTotales -= lotesDisponibles * 10;
        for (
          let i = pilaParseada.length + 1;
          i <= lotesDisponibles + pilaParseada.length;
          i++
        ) {
          //Lotes.push(`Lote numero ${Lotes.length + organizadorLote.preLotes + 1}`)
          Lotes.push({ numeroDeLote: i });
        }
        this.postLotes = Lotes.length;
        infoLote.innerHTML = `Se crean ${Lotes.length} Lotes`;
        textoExito(infoLote);
      }
    }
  },
};

const Lotes = [];

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// ---------------------------------- DOM y Event Listener de Pileta ---------------------------------- //
//////////////////////////////////////////////////////////////////////////////////////////////////////////

let inputPileta = document.getElementById("input1");
let boton1 = document.getElementById("btn1");
let boton2 = document.getElementById("btn2");
let volumenPileta = document.getElementById("volumenActual");
let infoPileta = document.getElementById("infoPileta");

function insertarPescadoPileta() {
  let numero = parseInt(inputPileta.value);
  if (!isNaN(numero)) {
    pileta.ingresoPescado(numero);
    inputPileta.value = "";
    volumenPileta.innerHTML = `Volumen Actual: <strong>${pileta.volumenActual} Kg</strong>`;
  } else {
    infoPileta.innerHTML = "Por favor, ingrese un número válido.";
    textoFracaso(infoPileta);
  }
}

function transferirPescadoCocinador() {
  let numero = parseInt(inputPileta.value);
  if (!isNaN(numero)) {
    pileta.transferirPescado(numero);
    inputPileta.value = "";
    volumenPileta.innerHTML = `Volumen Actual: <strong>${pileta.volumenActual} Kg</strong>`;
    volumenCrudo.innerHTML = `Volumen Crudo: <strong>${cocinador.volumenCrudo} Kg</strong>`;
  } else {
    infoPileta.innerHTML = "Por favor, ingrese un número válido.";
    textoFracaso(infoPileta);
  }
}

boton1.addEventListener("click", insertarPescadoPileta);
boton2.addEventListener("click", transferirPescadoCocinador);

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// --------------------------------- DOM y Event Listener de Cocinador --------------------------------- //
///////////////////////////////////////////////////////////////////////////////////////////////////////////

let volumenCrudo = document.getElementById("volumenCrudo");
let volumenCocinado = document.getElementById("volumenCocinado");
let btnCocinar = document.getElementById("btnCocinar");
let inputCocinador = document.getElementById("inputCocinador");
let btnTransCocinado = document.getElementById("btnTransCocinado");
let infoCocinador = document.getElementById("infoCocinador");

function cocinarPescadoCrudo() {
  let numero = parseInt(inputCocinador.value);
  if (!isNaN(numero)) {
    cocinador.cocinarPescado(numero);
    inputCocinador.value = "";
    volumenCrudo.innerHTML = `Volumen Crudo: <strong>${cocinador.volumenCrudo} Kg</strong>`;
    volumenCocinado.innerHTML = `Volumen Cocinado: <strong>${cocinador.volumenCocinado} Kg</strong>`;
  } else {
    infoCocinador.innerHTML = "Por favor, ingrese un número válido.";
    textoFracaso(infoCocinador);
  }
}

function transferirPescadoCocinado() {
  let numero = parseInt(inputCocinador.value);
  if (!isNaN(numero)) {
    cocinador.transferirPescado(numero);
    inputCocinador.value = "";
    volumenCocinado.innerHTML = `Volumen Cocinado: <strong>${cocinador.volumenCocinado} Kg</strong>`;
    volumenCocinadoPrensa.innerHTML = `Volumen Cocinado: <strong>${prensa.volumenActual} Kg</strong>`;
  } else {
    infoCocinador.innerHTML = "Por favor, ingrese un número válido.";
    textoFracaso(infoCocinador);
  }
}

btnCocinar.addEventListener("click", cocinarPescadoCrudo);
btnTransCocinado.addEventListener("click", transferirPescadoCocinado);

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// --------------------------------- DOM y Event Listener de la Prensa --------------------------------- //
///////////////////////////////////////////////////////////////////////////////////////////////////////////

let volumenCocinadoPrensa = document.getElementById("volumenCocinadoPrensa");
let volumenPrensado = document.getElementById("volumenPrensado");
let btnCocinado = document.getElementById("btnCocinado");
let inputPrensa = document.getElementById("inputPrensa");
let btnTransPrensado = document.getElementById("btnTransPrensado");
let infoPrensa = document.getElementById("infoPrensa");

function prensarCocinado() {
  let numero = parseInt(inputPrensa.value);
  if (!isNaN(numero)) {
    prensa.prensarPescado(numero);
    inputPrensa.value = "";
    volumenCocinadoPrensa.innerHTML = `Volumen Cocinado: <strong>${prensa.volumenActual} Kg</strong>`;
    volumenPrensado.innerHTML = `Volumen Prensado: <strong>${prensa.volumenPrensado} Kg</strong>`;
  } else {
    infoPrensa.innerHTML = "Por favor, ingrese un número válido.";
    textoFracaso(infoPrensa);
  }
}

function transferirPrensado() {
  let numero = parseInt(inputPrensa.value);
  if (!isNaN(numero)) {
    prensa.transferirPrensado(numero);
    inputPrensa.value = "";
    volumenPrensado.innerHTML = `Volumen Prensado: <strong>${prensa.volumenPrensado} Kg</strong>`;
    volumenPrensadoRtd.innerHTML = `Volumen Rotadisco: <strong>${rtd.volumenActual} Kg</strong>`;
  } else {
    infoPrensa.innerHTML = "Por favor, ingrese un número válido.";
    textoFracaso(infoPrensa);
  }
}

btnCocinado.addEventListener("click", prensarCocinado);
btnTransPrensado.addEventListener("click", transferirPrensado);

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// --------------------------------- DOM y Event Listener de Rotadisco --------------------------------- //
///////////////////////////////////////////////////////////////////////////////////////////////////////////

let volumenPrensadoRtd = document.getElementById("volumenPrensadoRtd");
let volumenHarinaRtd = document.getElementById("volumenHarinaRtd");
let btnSecarHarina = document.getElementById("btnSecarHarina");
let inputRtd = document.getElementById("inputRtd");
let btnTransHarina = document.getElementById("btnTransHarina");
let infoRtd = document.getElementById("infoRtd");

function secarPrensado() {
  let numero = parseInt(inputRtd.value);
  if (!isNaN(numero)) {
    rtd.secarPrensado(numero);
    inputRtd.value = "";
    volumenPrensadoRtd.innerHTML = `Volumen Prensado: <strong>${rtd.volumenActual} Kg</strong>`;
    volumenHarinaRtd.innerHTML = `Volumen Harina: <strong>${rtd.volumenSecado} Kg</strong>`;
  } else {
    infoRtd.innerHTML = "Por favor, ingrese un número válido.";
    textoFracaso(infoRtd);
  }
}

function trasnferirHarinaLote() {
  let numero = parseInt(inputRtd.value);
  if (!isNaN(numero)) {
    rtd.trasnferirHarina(numero);
    inputRtd.value = "";
    volumenHarinaRtd.innerHTML = `Volumen Harina: <strong>${rtd.volumenSecado} Kg</strong>`;
    volumenHarinaSilo.innerHTML = `Volumen Harina: <strong>${silo.volumenActual} Kg</strong>`;
  } else {
    infoRtd.innerHTML = "Por favor, ingrese un número válido.";
    textoFracaso(infoRtd);
  }
}

btnSecarHarina.addEventListener("click", secarPrensado);
btnTransHarina.addEventListener("click", trasnferirHarinaLote);

///////////////////////////////////////////////////////////////////////////////////////////////////////
// --------------------------------- DOM y Event Listener del Silo --------------------------------- //
///////////////////////////////////////////////////////////////////////////////////////////////////////

let volumenHarinaSilo = document.getElementById("volumenHarinaSilo");
let cantidadBolsaSilo = document.getElementById("cantidadBolsaSilo");
let btnBolsaSilo = document.getElementById("btnBolsaSilo");
let inputSilo = document.getElementById("inputSilo");
let btnSacarBolsas = document.getElementById("btnSacarBolsas");
let infoSilo = document.getElementById("infoSilo");

function averiguarBolsaSilo() {
  let bolsas = silo.averiguarBolsas();
  inputSilo.value = "";
  cantidadBolsaSilo.innerHTML = `Bolsas de 50 Kg: <strong>${bolsas} bolsas</strong> `;
}

function sacarBolsaSilo() {
  let numero = parseInt(inputSilo.value);
  if (!isNaN(numero)) {
    silo.sacarBolsas(numero);
    let bolsas = silo.averiguarBolsas();
    inputSilo.value = "";
    volumenHarinaSilo.innerHTML = `Volumen Harina: <strong>${silo.volumenActual} Kg</strong>`;
    cantidadBolsaSilo.innerHTML = `Bolsas de 50 Kg: <strong>${bolsas}</strong> `;
    bolsasDisponibles.innerHTML = `Bolsas Disponibles: <strong>${organizadorLote.bolsasTotales} bolsas</strong>`;
  } else {
    infoSilo.innerHTML = "Por favor, ingrese un número válido.";
    textoFracaso(infoSilo);
  }
}

btnBolsaSilo.addEventListener("click", averiguarBolsaSilo);
btnBolsaSilo.addEventListener("click", () => {});
btnSacarBolsas.addEventListener("click", sacarBolsaSilo);

///////////////////////////////////////////////////////////////////////////////////////////////////////
// --------------------------------- DOM y Event Listener de Lotes --------------------------------- //
///////////////////////////////////////////////////////////////////////////////////////////////////////

let bolsasDisponibles = document.getElementById("bolsasDisponibles");
let pilasDisponibles = document.getElementById("pilasDisponibles");
let btnCrearLote = document.getElementById("btnCrearLote");
let btnVerLote = document.getElementById("btnVerLote");
let infoLote = document.getElementById("infoLote");
let infoSinAnalizar = document.getElementById("infoSinAnalizar");

function funCrearLote() {
  organizadorLote.crearLote();
  Lotes.forEach((elemento) => {
    infoSinAnalizar.innerHTML += `<div class='loteCreado' id='lote${elemento.numeroDeLote}'>Lote numero ${elemento.numeroDeLote}</div>`;
  });
  let pilaLocalStorage = localStorage.getItem("pilas");
  console.log("Lotes: " + Lotes);
  console.log("pilaLocalStorage" + pilaLocalStorage);
  if (pilaLocalStorage == undefined) {
    let loteString = JSON.stringify(Lotes);
    localStorage.setItem("pilas", loteString);
  } else {
    let pilaParseada = JSON.parse(pilaLocalStorage);
    pilaParseada.concat(Lotes);
    let loteString = JSON.stringify(pilaParseada);
    localStorage.setItem("pilas", loteString);
  }
  bolsasDisponibles.innerHTML = `Bolsas Disponibles: <strong>${organizadorLote.bolsasTotales} bolsas</strong>`;
  pilasDisponibles.innerHTML = `Cantidad de Lotes: <strong>${Lotes.length}</strong>`;
}
let lotesMostrados = false;

function funVerLote() {
  if (!lotesMostrados) {
    //tercero se trae el string del local storage con localStorage.getItem(nombre del objeto string)
    let pilaLocalStorage = localStorage.getItem("pilas");
    //cuarto se convierte el string en un objeto nuevamente con JSON.parse(nombre del string)
    let pilaParseada = JSON.parse(pilaLocalStorage);
    pilaParseada.forEach((elemento) => {
      infoSinAnalizar.innerHTML += `<div class='loteCreado'>Lote numero ${elemento.numeroDeLote}</div>`;
    });
    console.log(pilaParseada);
  }
  lotesMostrados = true;
}

btnCrearLote.addEventListener("click", funCrearLote);
btnVerLote.addEventListener("click", funVerLote);

let infoProduccion = document.getElementById("infoProduccion");

//El ciclo se tiene que ejecutar tantas veces como items haya en el array
//array.length()
