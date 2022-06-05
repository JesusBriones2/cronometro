const counter_elements = document.querySelectorAll(".chronometer__counter-item");
const buttons = document.getElementById('buttons'); // contenedor de los botones.

let interval = null;
let counter = { m:0, s:0, ms:0 };

// Evento al contenedor de los botones.
buttons.addEventListener( 'click', (e) => {
	if ( e.target.id == 'start' ) action_start(e);
	if ( e.target.id == 'restart' ) restart_chronometer(e);
	if ( e.target.id == 'capture' ) capture_time();
});


// Actualiza el contador en pantalla.
function update_time () {
	counter_elements[0].textContent = counter.m;
	counter_elements[1].textContent = counter.s;
	counter_elements[2].textContent = counter.ms;
}


// inicia o detiene el cronómetro.
function action_start (e) {

	if ( interval == null ) {
		start_chronometer();
		buttons.lastElementChild.disabled = false;
		buttons.firstElementChild.disabled = true;
		e.target.textContent = 'Detener'
	}
	else {
		stop_chronometer();
		buttons.lastElementChild.disabled = true;
		buttons.firstElementChild.disabled = false;
		e.target.textContent = 'Reanudar';
	}
}


// Incrementa el contador del cronómetro.
function start_chronometer () {

	// Incrementa los minutos.
	const increase_minutes = () => { 
		if ( counter.m < 99 ) counter.m++; 
	}

	// Incrementa los segundos.
	const increase_seconds = () => {	
		if ( counter.s == 59 ) {
			counter.s = 0;
			increase_minutes();
		}
		else { counter.s++; }
	}

	// Incrementa los milisegundos.
	const increase_milliseconds = () => {
		if ( counter.ms == 99 ) {
			counter.ms = 0;
			increase_seconds();
		}
		else { counter.ms++; }

		update_time();
	}

	// Ejecuta un timer.
	interval = setInterval( increase_milliseconds , 10 );
}


// Detiene el cronómetro.
function stop_chronometer () {
	clearInterval( interval );
	interval = null;
}


// Reinicia el cronómetro
function restart_chronometer (e) {
	e.target.nextElementSibling.textContent = 'Iniciar';
	counter = { m:0, s:0, ms:0 };
	document.getElementById('captures').innerHTML = '';
	update_time();
}


// Captura el tiempo transcurrido y lo muestra.
function capture_time () {
	document.getElementById('captures').innerHTML += `
	<span class="captures__item">${counter.m} : ${counter.s} : ${counter.ms}</span>`;
}



