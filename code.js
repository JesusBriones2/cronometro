const spanMinutos = document.querySelector(".minutos");
const spanSegundos = document.querySelector(".segundos");
const spanCentesimas = document.querySelector(".centesimas");
const divCapturas = document.querySelector(".capturas");

const btn_reiniciar = document.querySelector(".btn-reiniciar");
const btn_iniciar = document.querySelector(".btn-iniciar");
const btn_capturar = document.querySelector(".btn-capturar");

btn_iniciar.addEventListener('click',accion);
btn_reiniciar.addEventListener('click',reiniciar);
btn_capturar.addEventListener('click',capturar);


let corriendo = null;
let minutos = 0;
let segundos = 0;
let centesimas = 0;


function dibujarTiempo() {

	spanMinutos.innerHTML = minutos;
	spanSegundos.innerHTML = segundos;
	spanCentesimas.innerHTML = centesimas;
}



function accion() {

	if (corriendo) {
		detener();
		btn_reiniciar.disabled = false;
		btn_capturar.disabled = true;
	}
	else {
		iniciar();
		btn_reiniciar.disabled = true;
		btn_capturar.disabled = false;
	}
}



function iniciar() {


	const sumarMinuto = () => {
		
		if (minutos < 99) minutos++;
	}


	const sumarSegundo = () => {
		
		if (segundos === 59) {
			segundos = 0;
			sumarMinuto();
		}
		else {segundos++;}
	}

	const incrementar = () => {
		
		if (centesimas === 99) {
			centesimas = 0;
			sumarSegundo();
		}
		else {centesimas++;}

		dibujarTiempo();
	}

	corriendo = setInterval(incrementar,10);
	btn_iniciar.innerHTML = "Detener";
}



function detener() {
	clearInterval(corriendo);
	corriendo = null;
	btn_iniciar.innerHTML = "Iniciar";
}



function reiniciar() {

	minutos = 0;
	segundos = 0;
	centesimas = 0;
	divCapturas.innerHTML = "";
	dibujarTiempo();
}



function capturar() {

	const itemCaptura = document.createElement("SPAN");

	itemCaptura.classList.add("capturas__item");
	itemCaptura.innerHTML = `${minutos} : ${segundos} : ${centesimas}`;

	divCapturas.appendChild(itemCaptura);
}



