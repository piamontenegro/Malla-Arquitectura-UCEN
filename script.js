// Lista de ramos con sus requisitos
const requisitos = {
    ramo1: [],
    ramo2: [],
    ramo3: [],
    ramo4: [],
    ramo5: [],
    ramo6: ['ramo4'],
    ramo7: [],
    ramo8: [],
    ramo9: [],
    ramo10: [],
    ramo11: ['ramo6'],
    ramo12: [],
    ramo13: [],
    ramo14: [],
    ramo15: []
};

// Cargar estado de los ramos desde el almacenamiento local
function cargarEstadoRamos() {
    const aprobados = JSON.parse(localStorage.getItem('ramosAprobados')) || [];
    const ramos = document.querySelectorAll('.ramo');

    ramos.forEach(ramo => {
        const ramoId = ramo.id;
        if (aprobados.includes(ramoId)) {
            ramo.classList.add('aprobado');
        }
    });
}

// Guardar estado de los ramos en el almacenamiento local
function guardarEstadoRamos() {
    const aprobados = [];
    const ramos = document.querySelectorAll('.ramo.aprobado');

    ramos.forEach(ramo => {
        aprobados.push(ramo.id);
    });

    localStorage.setItem('ramosAprobados', JSON.stringify(aprobados));
}

// Función para marcar un ramo como aprobado
function marcarRamo(event) {
    const ramo = event.target;
    const ramoId = ramo.id;
    const requisitosRamo = requisitos[ramoId];

    // Verificar si el ramo está bloqueado
    const requisitosCumplidos = requisitosRamo.every(requisito => {
        return document.getElementById(requisito)?.classList.contains('aprobado');
    });

    if (requisitosCumplidos) {
        if (ramo.classList.contains('aprobado')) {
            ramo.classList.remove('aprobado');
        } else {
            ramo.classList.add('aprobado');
        }

        // Guardar el nuevo estado de los ramos
        guardarEstadoRamos();
    } else {
        // Si el ramo está bloqueado, mostrar un mensaje
        alert('Este ramo tiene requisitos pendientes. ¡Primero aprueba los ramos bloqueados!');
    }
}

// Agregar evento de clic a todos los ramos
function agregarEventos() {
    const ramos = document.querySelectorAll('.ramo');

    ramos.forEach(ramo => {
        ramo.addEventListener('click', marcarRamo);
    });
}

// Inicializar la aplicación
function iniciar() {
    cargarEstadoRamos();
    agregarEventos();
}

// Ejecutar la inicialización al cargar la página
document.addEventListener('DOMContentLoaded', iniciar);

