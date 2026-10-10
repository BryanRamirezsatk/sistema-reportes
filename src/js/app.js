// Barra superior que muestra al usuario conectado
const usuarioActivo = document.getElementById("usuarioActivo");
/* ==========================================
    REFERENCIAS A LAS INTERFACES
========================================== */

// Inicio de sesión
const login = document.getElementById("login");

// Panel compartido de alumnos y docentes
const panelEstudiante = document.getElementById("panelEstudiante");

// Panel para visualizar reportes
const panelEstudianteReportes =
    document.getElementById("panelEstudianteReportes");

// Panel para generar un nuevo reporte
const panelCrearReporte =
    document.getElementById("panelCrearReporte");
    /* ==========================================
 MENÚ PERSONALIZADO - TIPO DE REPORTE
========================================== */

// Referencias a los elementos HTML
const tipoReporte = document.getElementById("tipoReporte");
const abrirTipoReporte = document.getElementById("abrirTipoReporte");
const textoTipoReporte = document.getElementById("textoTipoReporte");
const opcionesTipoReporte = document.getElementById("opcionesTipoReporte");

// Abrir y cerrar el menú
function cambiarEstadoMenu(abierto) {
    opcionesTipoReporte.hidden = !abierto;

    abrirTipoReporte.setAttribute(
        "aria-expanded",
        String(abierto)
    );
}

// Crear las opciones a partir del select original
Array.from(tipoReporte.options).forEach(function(opcion) {

    if (opcion.value === "") {
        return;
    }

    const boton = document.createElement("button");

    boton.type = "button";
    boton.className = "opcion-tipo-reporte";
    boton.textContent = opcion.textContent;
    boton.dataset.valor = opcion.value;
    boton.setAttribute("role", "option");

    boton.addEventListener("click", function() {

        // Actualizamos el select original
        tipoReporte.value = opcion.value;

        // Actualizamos el texto visible
        textoTipoReporte.textContent = opcion.textContent;

        // Marcamos visualmente la opción seleccionada
        document.querySelectorAll(".opcion-tipo-reporte")
            .forEach(function(elemento) {
                const seleccionada =
                    elemento.dataset.valor === opcion.value;

                elemento.classList.toggle(
                    "seleccionada",
                    seleccionada
                );

                elemento.setAttribute(
                    "aria-selected",
                    String(seleccionada)
                );
            });

        // Avisamos al formulario que cambió el valor
        tipoReporte.dispatchEvent(
            new Event("change", { bubbles: true })
        );

        cambiarEstadoMenu(false);
        abrirTipoReporte.focus();
    });

    opcionesTipoReporte.appendChild(boton);
});

// Mostrar u ocultar al presionar el botón
abrirTipoReporte.addEventListener("click", function() {

    const abrir = opcionesTipoReporte.hidden;

    cambiarEstadoMenu(abrir);

    if (abrir) {
        const seleccionada = opcionesTipoReporte.querySelector(
            ".opcion-tipo-reporte.seleccionada"
        );

        (seleccionada ||
            opcionesTipoReporte.querySelector(".opcion-tipo-reporte")
        )?.focus();
    }
});

// Cerrar al hacer clic fuera del menú
document.addEventListener("click", function(evento) {

    if (!evento.target.closest(".contenedor-tipo-reporte")) {
        cambiarEstadoMenu(false);
    }
});

// Cerrar con la tecla Escape
opcionesTipoReporte.addEventListener("keydown", function(evento) {

    if (evento.key === "Escape") {
        cambiarEstadoMenu(false);
        abrirTipoReporte.focus();
    }
});

// Moverse entre opciones con las flechas del teclado
opcionesTipoReporte.addEventListener("keydown", function(evento) {

    if (evento.key !== "ArrowDown" &&
        evento.key !== "ArrowUp") {
        return;
    }

    evento.preventDefault();

    const botones = Array.from(
        opcionesTipoReporte.querySelectorAll(".opcion-tipo-reporte")
    );

    const indiceActual = botones.indexOf(document.activeElement);

    const siguienteIndice = evento.key === "ArrowDown"
        ? (indiceActual + 1) % botones.length
        : (indiceActual - 1 + botones.length) % botones.length;

    botones[siguienteIndice].focus();
});
/* ==========================================
    VISTA PREVIA DE EVIDENCIA FOTOGRÁFICA
========================================== */

const evidenciaProblemaInput =
    document.getElementById("evidenciaProblema");

const vistaPreviaEvidencia =
    document.getElementById("vistaPreviaEvidencia");

const imagenVistaPrevia =
    document.getElementById("imagenVistaPrevia");

let urlVistaPrevia = null;

evidenciaProblemaInput.addEventListener("change", function () {

    const archivo = evidenciaProblemaInput.files[0];

    if (urlVistaPrevia) {
        URL.revokeObjectURL(urlVistaPrevia);
        urlVistaPrevia = null;
    }

    if (!archivo) {
        imagenVistaPrevia.removeAttribute("src");
        vistaPreviaEvidencia.hidden = true;
        return;
    }

    const tiposPermitidos = [
        "image/png",
        "image/jpeg",
        "image/webp"
    ];

    if (!tiposPermitidos.includes(archivo.type) ||
        archivo.size > 2 * 1024 * 1024) {

        imagenVistaPrevia.removeAttribute("src");
        vistaPreviaEvidencia.hidden = true;
        return;
    }

    urlVistaPrevia = URL.createObjectURL(archivo);

    imagenVistaPrevia.src = urlVistaPrevia;
    vistaPreviaEvidencia.hidden = false;

});
/* ==========================================
    LIMPIEZA DEL FORMULARIO DE REPORTES
========================================== */

function limpiarFormularioReporte() {

    // Limpiar los campos del formulario
    document.getElementById("formularioReporte").reset();

    // Liberar la imagen temporal
    if (urlVistaPrevia) {
        URL.revokeObjectURL(urlVistaPrevia);
        urlVistaPrevia = null;
    }

    // Ocultar la vista previa
    imagenVistaPrevia.removeAttribute("src");
    vistaPreviaEvidencia.hidden = true;

    // Restablecer el texto del menú personalizado
    textoTipoReporte.textContent = "Seleccione una opción";

    // Quitar la selección visual de las opciones
    opcionesTipoReporte
        .querySelectorAll(".opcion-tipo-reporte")
        .forEach(function(opcion) {

            opcion.classList.remove("seleccionada");
            opcion.setAttribute("aria-selected", "false");

        });

    // Cerrar el menú desplegable
    cambiarEstadoMenu(false);
}    

// Interfaces administrativas
const panelAdministrador =
    document.getElementById("panelAdministrador");

const panelAgregarUsuario =
    document.getElementById("panelAgregarUsuario");

const panelAgregarAdministrador =
    document.getElementById("panelAgregarAdministrador");

const panelReportesAdmin =
    document.getElementById("panelReportesAdmin");

const panelSolucionReporte =
    document.getElementById("panelSolucionReporte");


/* ==========================================
    ESTADO INICIAL DE LAS INTERFACES
========================================== */

// Al abrir la página solamente mostraremos el login

login.hidden = false;
// Al iniciar el sistema no hay ningún usuario conectado
usuarioActivo.hidden = true;
panelEstudiante.hidden = true;
panelEstudianteReportes.hidden = true;
panelCrearReporte.hidden = true;

panelAdministrador.hidden = true;
panelAgregarUsuario.hidden = true;
panelAgregarAdministrador.hidden = true;
panelReportesAdmin.hidden = true;
panelSolucionReporte.hidden = true;


/* ==========================================
    INICIO DE SESIÓN
========================================== */

// Obtenemos el formulario principal
const formulario = document.getElementById("formulario");

// Escuchamos cuando el usuario intenta iniciar sesión
formulario.addEventListener("submit", function(event) {

    // Evitamos que la página se recargue
    event.preventDefault();

    // Obtenemos los valores ingresados
    const usuario = document.getElementById("usuario").value.trim();

    // Este campo recibirá NIP o contraseña
    const contrasena = document.getElementById("contrasena").value;

    // Elemento para mostrar los errores
    const error = document.getElementById("mensajeDeError");

    // Limpiamos cualquier mensaje anterior
    error.textContent = "";

    // Aquí guardaremos el objeto que encontremos
    let encontrado = false;

    // Nos permitirá identificar el tipo de usuario
    let tipoAcceso = "";


    /* ======================================
        VALIDACIÓN DE CAMPOS VACÍOS
    ====================================== */

    if (usuario === "" || contrasena === "") {

        error.textContent = "Error Campos Vacíos";
        return;

    }


    /* ======================================
        BÚSQUEDA DE ALUMNOS
    ====================================== */

    // Si el identificador es numérico, buscamos un alumno

    if (!isNaN(usuario)) {

        for (let i = 0; i < usuarios.length; i++) {

            // Comprobamos que sea estudiante y coincida
            // con el número de control ingresado

            if (
                usuarios[i].tipo === "estudiante" &&
                usuario === usuarios[i].numeroControl
            ) {

                encontrado = usuarios[i];
                tipoAcceso = "estudiante";

                // Detenemos la búsqueda
                break;

            }

        }

    } else {


        /* ======================================
            BÚSQUEDA DE DOCENTES
        ====================================== */

        // Si el identificador contiene letras,
        // primero buscamos entre los docentes

        for (let i = 0; i < usuarios.length; i++) {

            if (
                usuarios[i].tipo === "docente" &&
                usuario === usuarios[i].nombre
            ) {

                encontrado = usuarios[i];
                tipoAcceso = "docente";

                break;

            }

        }
    

        /* ======================================
            BÚSQUEDA DE ADMINISTRADORES
        ====================================== */

        // Si no encontramos un docente,
        // realizamos la búsqueda administrativa

        if (encontrado === false) {

            for (let i = 0; i < administradores.length; i++) {

                if (usuario === administradores[i].nombre) {

                    encontrado = administradores[i];
                    tipoAcceso = "administrador";

                    break;

                }

            }

        }

    }


    /* ======================================
        VALIDACIÓN DEL USUARIO
    ====================================== */

    // Si no encontramos ningún objeto coincidente,
    // mostramos un mensaje y detenemos el evento

    if (encontrado === false) {

        error.textContent = "Usuario No Encontrado";
        return;

    }


    /* ======================================
        VALIDACIÓN DEL NIP O CONTRASEÑA
    ====================================== */

    // Los alumnos utilizan NIP
    if (tipoAcceso === "estudiante") {

        if (encontrado.nip !== contrasena) {

            error.textContent = "NIP Incorrecto";
            return;

        }

    } else {

        // Docentes y administradores utilizan contraseña

        if (encontrado.contrasena !== contrasena) {

            error.textContent = "Contraseña Incorrecta";
            return;

        }

    }
    
/* ==========================================
    MOSTRAR INFORMACIÓN DEL USUARIO ACTIVO
========================================== */

// Hacemos visible nuestra barra superior
usuarioActivo.hidden = false;

// Mostramos el tipo de usuario y su nombre
// Información del usuario conectado

let nombreRol = "";
let iconoRol = "";

if (tipoAcceso === "estudiante") {
    nombreRol = "Estudiante";
    iconoRol = "icon-graduation-cap";

} else if (tipoAcceso === "docente") {
    nombreRol = "Docente";
    iconoRol = "icon-book-open";

} else if (tipoAcceso === "administrador") {
    nombreRol = "Administrador";
    iconoRol = "icon-shield-check";
}

// Construimos la tarjeta de perfil
usuarioActivo.innerHTML = `
    <div class="perfil-usuario">

        <div class="perfil-avatar">
            <i class="icon icon-user-round" aria-hidden="true"></i>
        </div>

        <div class="perfil-informacion">
            <strong>${encontrado.nombre}</strong>

            <span>
                <i class="icon ${iconoRol}" aria-hidden="true"></i>
                ${nombreRol}
            </span>
        </div>

        <div class="perfil-estado">
            <i class="icon icon-shield-check" aria-hidden="true"></i>
        </div>

    </div>
`;



    /* ======================================
        INICIO DE SESIÓN CORRECTO
    ====================================== */

    // Limpiamos los mensajes de error
    error.textContent = "";

    // Ocultamos el formulario de inicio de sesión
    login.hidden = true;

    // Ocultamos inicialmente ambos paneles
    panelEstudiante.hidden = true;
    panelAdministrador.hidden = true;

    /* ======================================
        MOSTRAR PANEL SEGÚN EL TIPO DE USUARIO
     ====================================== */

if (tipoAcceso === "administrador") {

    // Mostramos el panel administrativo
    panelAdministrador.hidden = false;

} else {

    // Alumnos y docentes comparten el mismo panel
    panelEstudiante.hidden = false;

}

// Cerramos correctamente el evento del formulario de login
});

function mostrarEvidencia(reporte, tarjeta) {

    // Evidencia del problema
    if (reporte.evidenciaProblema) {

        const titulo = document.createElement("h4");
        titulo.textContent = "Evidencia del problema:";

        const imagen = document.createElement("img");
        imagen.src = reporte.evidenciaProblema;
        imagen.alt = "Fotografía del problema";

        imagen.style.width = "250px";
        imagen.style.maxWidth = "100%";
        imagen.style.height = "auto";

        tarjeta.appendChild(titulo);
        tarjeta.appendChild(imagen);
    }

    // Evidencia de la solución
    if (reporte.evidenciaSolucion) {

        const titulo = document.createElement("h4");
        titulo.textContent = "Evidencia de la solución:";

        const imagen = document.createElement("img");
        imagen.src = reporte.evidenciaSolucion;
        imagen.alt = "Fotografía de la solución";

        imagen.style.width = "250px";
        imagen.style.maxWidth = "100%";
        imagen.style.height = "auto";

        tarjeta.appendChild(titulo);
        tarjeta.appendChild(imagen);
    }
}
/* =========================================
   NOTIFICACIÓN DE REPORTE GENERADO
========================================= */

let temporizadorNotificacion;

function mostrarNotificacionReporte(folio) {

    const notificacion = document.getElementById("notificacionReporte");

    clearTimeout(temporizadorNotificacion);

    notificacion.replaceChildren();

    const icono = document.createElement("i");
    icono.className = "icon icon-circle-check";
    icono.setAttribute("aria-hidden", "true");

    const contenido = document.createElement("div");

    const titulo = document.createElement("strong");
    titulo.textContent = "¡Reporte registrado!";

    const descripcion = document.createElement("p");
    descripcion.textContent = "Tu reporte se generó correctamente. Folio: " + folio;

    contenido.appendChild(titulo);
    contenido.appendChild(descripcion);

    notificacion.appendChild(icono);
    notificacion.appendChild(contenido);

    notificacion.classList.add("visible");

    temporizadorNotificacion = setTimeout(function() {
        notificacion.classList.remove("visible");
    }, 5000);
}

/* ==========================================
    VISUALIZACIÓN DE REPORTES
    ALUMNOS Y DOCENTES
========================================== */

// Obtenemos el botón para visualizar reportes
const verReportes = document.getElementById("verReportes");

function mostrarReportesEstudiante() {

    // Revisamos si algún reporte ha vencido
    // antes de mostrar la información
    actualizarEstados();

    // Ocultamos el panel principal
    panelEstudiante.hidden = true;

    // Mostramos la interfaz de reportes
    panelEstudianteReportes.hidden = false;

    // Obtenemos la lista HTML
    const lu = document.getElementById("listaReportes");

    // Limpiamos la lista para evitar reportes repetidos
    lu.textContent = "";


    /* ======================================
        RECORRER LOS REPORTES REGISTRADOS
    ====================================== */

   // Obtener el texto del buscador
    const busqueda = document.getElementById("buscarReporte")
    .value.trim().toLowerCase();

    // Filtrar los reportes
    const reportesFiltrados = reportes.filter(function(reporte) {

    return (
        reporte.numeroFolio.toLowerCase().includes(busqueda) ||
        reporte.lugar.toLowerCase().includes(busqueda) ||
        reporte.tipo.toLowerCase().includes(busqueda) ||
        reporte.estado.toLowerCase().includes(busqueda)
    );

    });

       // Recorrer únicamente los reportes encontrados
        reportesFiltrados.forEach(function(reporte) {

        // Creamos un elemento li para cada reporte
        const nuevo = document.createElement("li");

        // Guardamos su folio como identificador
        nuevo.dataset.folio = reporte.numeroFolio;

        // Asignamos nuestra clase de CSS
        nuevo.className = "tarjeta-reporte";


        /* ==================================
            MOSTRAR INFORMACIÓN DEL REPORTE
        ================================== */

        // Creamos un contenedor para los datos
        const informacion = document.createElement("div");

        // Mostramos la información general
        informacion.textContent =
            "Folio: " + reporte.numeroFolio +
            "\nLugar: " + reporte.lugar +
            "\nTipo: " + reporte.tipo +
            "\nDescripción: " + reporte.descripcion +
            "\nFecha de creación: " +
            reporte.fecha.toLocaleDateString() +
            "\nFecha límite: " +
            reporte.fechaLimite.toLocaleDateString() +
            "\nEstado: " + reporte.estado;

        // Conservamos los saltos de línea del texto
        informacion.style.whiteSpace = "pre-line";

        // Insertamos la información en nuestra tarjeta
        nuevo.appendChild(informacion);


        /* ==================================
            MOSTRAR SOLUCIÓN DEL REPORTE
        ================================== */

        // Creamos otro contenedor para la solución
        const informacionSolucion = document.createElement("div");

        // Comprobamos si el administrador ya registró
        // una solución para este reporte

        if (reporte.solucion !== "") {

            // Si existe una solución, la mostramos
            informacionSolucion.textContent =
                "\nSolución registrada: " +
                reporte.solucion +
                "\nFecha de solución: " +
                reporte.fechaSolucion.toLocaleDateString();

        } else {

            // Si todavía no tiene solución,
            // mostramos un mensaje informativo
            informacionSolucion.textContent =
                "\nSolución: Pendiente de atención";

        }

        // Conservamos los saltos de línea
        informacionSolucion.style.whiteSpace = "pre-line";

        // Insertamos la información de la solución
        nuevo.appendChild(informacionSolucion);
        // Mostrar fotografía del problema
        mostrarEvidencia(reporte, nuevo);


        /* ==================================
            INSERTAR REPORTE EN LA LISTA
        ================================== */

        // Agregamos la tarjeta completa a nuestro ul
        lu.appendChild(nuevo);

    });

};

verReportes.addEventListener("click", function() {

document.getElementById("buscarReporte").value = "";

mostrarReportesEstudiante();

});

document.getElementById("buscarReporte")
    .addEventListener("input", function() {

        mostrarReportesEstudiante();

    });


/* ==========================================
    REGRESAR DESDE VER REPORTES
========================================== */

// Obtenemos el botón una sola vez
const regresar = document.getElementById("regresar");

regresar.addEventListener("click", function() {

    // Ocultamos la lista de reportes
    panelEstudianteReportes.hidden = true;

    // Mostramos el panel principal
    panelEstudiante.hidden = false;

});


/* ==========================================
    NAVEGACIÓN DEL ALUMNO Y DOCENTE
========================================== */

// Obtenemos los botones de navegación
const crearReporte = document.getElementById("crearReporte");

const regresarPanel = document.getElementById("regresarPanel");


/* BOTÓN: CREAR NUEVO REPORTE */

crearReporte.addEventListener("click", function() {
    
    // Ocultamos el panel principal
    panelEstudiante.hidden = true;
    
    // Mostramos el formulario para crear reportes
    panelCrearReporte.hidden = false;
    // Limpiamos cualquier mensaje de una operación anterior.
    // Así, cada vez que un alumno o docente ingrese al
    // formulario, encontrará la interfaz sin mensajes antiguos.
    
    document.getElementById("mensajeReporte").textContent = "";

});


/* BOTÓN: REGRESAR AL PANEL PRINCIPAL */

regresarPanel.addEventListener("click", function() {

    // Ocultamos el formulario
    panelCrearReporte.hidden = true;

    // Mostramos nuevamente el panel principal
    panelEstudiante.hidden = false;

});


/* ==========================================
    NAVEGACIÓN DEL ADMINISTRADOR
========================================== */

// Botones del panel principal
const agregarUsuario =
    document.getElementById("agregarUsuario");

const agregarAdministrador =
    document.getElementById("agregarAdministrador");

const verReportesAdmin =
    document.getElementById("verReportesAdmin");


// Botones para regresar
const regresarAdminUsuario =
    document.getElementById("regresarAdminUsuario");

const regresarAdminRegistro =
    document.getElementById("regresarAdminRegistro");

const regresarPanelAdmin =
    document.getElementById("regresarPanelAdmin");


/* ==========================================
    BOTÓN: AGREGAR USUARIO
========================================== */

agregarUsuario.addEventListener("click", function() {

    // Ocultamos el panel administrativo
    panelAdministrador.hidden = true;

    // Mostramos el formulario de alumnos y docentes
    panelAgregarUsuario.hidden = false;

});


/* ==========================================
    BOTÓN: AGREGAR ADMINISTRADOR
========================================== */

agregarAdministrador.addEventListener("click", function() {

    // Ocultamos el panel principal
    panelAdministrador.hidden = true;

    // Mostramos el formulario de administradores
    panelAgregarAdministrador.hidden = false;

});

/* ==========================================
    REPORTE SELECCIONADO POR EL ADMINISTRADOR
========================================== */

// Esta variable guardará temporalmente el objeto
// del reporte que el administrador desea solucionar.

let reporteSeleccionado = false;

/* ==========================================
    ACTUALIZACIÓN AUTOMÁTICA DE ESTADOS
========================================== */

// Esta función revisará los reportes registrados
// y actualizará aquellos que hayan vencido
// sin recibir una solución.
// ==========================================
// CALCULAR TIEMPO RESTANTE DEL REPORTE
// ==========================================

function calcularTiempoRestante(reporte) {

    // Si ya está solucionado, no necesita temporizador
    if (
        reporte.estado === "Resuelto" ||
        reporte.estado === "Resuelto fuera de tiempo"
    ) {
        return "Reporte solucionado";
    }

    // Fecha y hora actuales
    const ahora = new Date();

    // Diferencia en milisegundos
    const diferencia = reporte.fechaLimite - ahora;

    // Si el plazo terminó
    if (diferencia <= 0) {
        return "Tiempo agotado";
    }

    // Convertir milisegundos a días, horas, minutos y segundos
    const dias = Math.floor(diferencia / 86400000);

    const horas = Math.floor(
        (diferencia % 86400000) / 3600000
    );

    const minutos = Math.floor(
        (diferencia % 3600000) / 60000
    );

    const segundos = Math.floor(
        (diferencia % 60000) / 1000
    );

    return dias + "d " +
        horas + "h " +
        minutos + "m " +
        segundos + "s";
}
// ==========================================
// MOSTRAR TEMPORIZADOR EN UNA TARJETA
// ==========================================

function mostrarTemporizador(reporte, tarjeta) {

    // Creamos un elemento para mostrar el tiempo
    const temporizador = document.createElement("p");

    // Identificamos el temporizador con su folio
    temporizador.dataset.temporizador = reporte.numeroFolio;

    // Mostramos el tiempo inicial
    temporizador.textContent =
        "Tiempo restante: " + calcularTiempoRestante(reporte);

    // Agregamos el temporizador a la tarjeta
    tarjeta.appendChild(temporizador);
}
function actualizarEstados() {

    // Obtenemos la fecha y hora actual
    const fechaActual = new Date();

    // Recorremos nuestro array de reportes
    for (let i = 0; i < reportes.length; i++) {

        // Comprobamos si el reporte sigue pendiente
        if (reportes[i].estado === "Pendiente") {

            // Comparamos la fecha actual con su fecha límite
            if (fechaActual > reportes[i].fechaLimite) {

                // Si ya venció, cambiamos su estado
                reportes[i].estado = "Fuera de tiempo";

            }

        }

    }

}

/* ==========================================
    BOTÓN: VER REPORTES ADMINISTRATIVOS
========================================== */

function mostrarReportesAdmin() {
    // Actualizamos los estados antes de mostrar los reportes
    actualizarEstados();
    // Ocultamos el panel principal del administrador
    panelAdministrador.hidden = true;

    // Mostramos la interfaz de reportes
    panelReportesAdmin.hidden = false;

    // Obtenemos la lista donde aparecerán los reportes
    const lista = document.getElementById("listaReportesAdmin");

    // Limpiamos la lista para evitar elementos repetidos
    lista.textContent = "";


    /* ======================================
        RECORRER LOS REPORTES
    ====================================== */

    const busqueda = document.getElementById("buscarReporteAdmin")
    .value.trim().toLowerCase();

    const reportesFiltrados = reportes.filter(function(reporte) {

        return (
            reporte.numeroFolio.toLowerCase().includes(busqueda) ||
            reporte.lugar.toLowerCase().includes(busqueda) ||
            reporte.tipo.toLowerCase().includes(busqueda) ||
            reporte.estado.toLowerCase().includes(busqueda)
        );
        });
        reportesFiltrados.forEach(function(reporte) {

        // Creamos un elemento li para cada reporte
        const nuevo = document.createElement("li");

        // Guardamos el folio como identificador
        nuevo.dataset.folio = reporte.numeroFolio;

        // Asignamos una clase para aplicar CSS
        nuevo.className = "tarjeta-reporte";


        /* ==================================
            INFORMACIÓN DEL REPORTE
        ================================== */

        // Creamos un contenedor para mostrar los datos
        const informacion = document.createElement("div");

        // Mostramos los datos del reporte
        informacion.textContent =
            "Folio: " + reporte.numeroFolio +
            " | Lugar: " + reporte.lugar +
            " | Tipo: " + reporte.tipo +
            " | Descripción: " + reporte.descripcion +
            " | Estado: " + reporte.estado +
            " | Fecha límite: " +
            reporte.fechaLimite.toLocaleDateString();


        /* ==================================
            BOTÓN PARA SOLUCIONAR
        ================================== */

        // Creamos un botón para cada reporte
        const botonSolucionar = document.createElement("button");

        // Definimos su texto
        botonSolucionar.textContent = "SOLUCIONAR REPORTE";

        // Indicamos que no debe enviar formularios
        botonSolucionar.type = "button";

        // Guardamos también el folio en el botón
        botonSolucionar.dataset.folio = reporte.numeroFolio;


        /* ==================================
            EVENTO DEL BOTÓN SOLUCIONAR
        ================================== */

        botonSolucionar.addEventListener("click", function() {

            
        // Guardamos el objeto del reporte seleccionado.
        // Así sabremos cuál debemos modificar cuando
        // el administrador presione GUARDAR SOLUCIÓN.

        reporteSeleccionado = reporte;


            // Ocultamos la lista de reportes
            panelReportesAdmin.hidden = true;

            // Mostramos la interfaz para registrar la solución
            panelSolucionReporte.hidden = false;


            /* ==============================
                MOSTRAR DATOS SELECCIONADOS
            ============================== */

            document.getElementById("solucionFolio").textContent =
                reporte.numeroFolio;

            document.getElementById("solucionLugar").textContent =
                reporte.lugar;

            document.getElementById("solucionTipo").textContent =
                reporte.tipo;

            document.getElementById("solucionDescripcion").textContent =
                reporte.descripcion;

            document.getElementById("solucionEstado").textContent =
                reporte.estado;

            document.getElementById("solucionFechaLimite").textContent =
                reporte.fechaLimite.toLocaleDateString();
            const contenedorEvidencia =
            document.getElementById("evidenciaOriginalAdmin");

           // Limpiamos la imagen del reporte anterior
            contenedorEvidencia.textContent = "";

           // Mostramos la fotografía del problema
            mostrarEvidencia(reporte, contenedorEvidencia);    

            // Limpiamos mensajes anteriores
            document.getElementById("mensajeSolucion").textContent = "";

        });


        /* ==================================
            INSERTAR ELEMENTOS EN LA LISTA
        ================================== */
        // Siempre mostramos la información del reporte
        nuevo.appendChild(informacion);
        // Mostrar fotografía del problema
        mostrarEvidencia(reporte, nuevo);
        mostrarTemporizador(reporte, nuevo);
       // Solamente mostramos el botón si el reporte
       // todavía no tiene una solución registrada
        if (
            reporte.estado === "Pendiente" ||
            reporte.estado === "Fuera de tiempo"
        ) {
        nuevo.appendChild(botonSolucionar);
        }

        // Finalmente insertamos la tarjeta en nuestra lista
        lista.appendChild(nuevo);

    });

};
// Abrir la lista administrativa de reportes
verReportesAdmin.addEventListener("click", function() {

    document.getElementById("buscarReporteAdmin").value = "";

    mostrarReportesAdmin();

});


// Buscar mientras el administrador escribe
document.getElementById("buscarReporteAdmin")
    .addEventListener("input", function() {

        mostrarReportesAdmin();

    });

/* ==========================================
    REGRESAR DESDE AGREGAR USUARIO
========================================== */

regresarAdminUsuario.addEventListener("click", function() {

    // Ocultamos el formulario
    panelAgregarUsuario.hidden = true;

    // Regresamos al panel administrativo
    panelAdministrador.hidden = false;

});


/* ==========================================
    REGRESAR DESDE AGREGAR ADMINISTRADOR
========================================== */

regresarAdminRegistro.addEventListener("click", function() {

    // Ocultamos el formulario
    panelAgregarAdministrador.hidden = true;

    // Regresamos al panel administrativo
    panelAdministrador.hidden = false;

});


/* ==========================================
    REGRESAR DESDE VER REPORTES ADMIN
========================================== */

regresarPanelAdmin.addEventListener("click", function() {

    // Ocultamos la interfaz de reportes
    panelReportesAdmin.hidden = true;

    // Mostramos nuevamente el panel administrativo
    panelAdministrador.hidden = false;

});


/* ==========================================
    REGISTRO DE ALUMNOS Y DOCENTES
========================================== */

// Obtenemos el selector del tipo de usuario
const nuevoTipo = document.getElementById("nuevoTipo");

// Obtenemos los contenedores de los campos
const camposAlumno = document.getElementById("camposAlumno");
const camposDocente = document.getElementById("camposDocente");


/* ==========================================
    MOSTRAR CAMPOS SEGÚN EL TIPO DE USUARIO
========================================== */

// Este evento se ejecuta cuando el administrador
// selecciona Alumno o Docente

nuevoTipo.addEventListener("change", function() {

    // Ocultamos inicialmente ambos contenedores
    camposAlumno.hidden = true;
    camposDocente.hidden = true;

    // Si selecciona estudiante, mostramos sus campos
    if (nuevoTipo.value === "estudiante") {

        camposAlumno.hidden = false;

    }

    // Si selecciona docente, mostramos su campo
    else if (nuevoTipo.value === "docente") {

        camposDocente.hidden = false;

    }

});


/* ==========================================
    FORMULARIO PARA REGISTRAR USUARIOS
========================================== */

// Obtenemos el formulario
const formularioNuevoUsuario =
    document.getElementById("formularioNuevoUsuario");

// Escuchamos el evento submit
formularioNuevoUsuario.addEventListener("submit", function(event) {

    // Evitamos que la página se recargue
    event.preventDefault();

    // Obtenemos los datos generales
    const nombre =
        document.getElementById("nuevoNombre").value.trim();

    const tipo = nuevoTipo.value;

    // Elemento donde mostraremos los mensajes
    const mensaje =
        document.getElementById("mensajeNuevoUsuario");

    // Limpiamos mensajes anteriores
    mensaje.textContent = "";


    /* ======================================
        VALIDACIÓN DE DATOS GENERALES
    ====================================== */

    if (nombre === "" || tipo === "") {

        mensaje.textContent = "Complete todos los campos";
        return;

    }


    /* ======================================
        REGISTRO DE UN ALUMNO
    ====================================== */

    if (tipo === "estudiante") {

        // Obtenemos número de control y NIP
        const numeroControl =
            document.getElementById("nuevoNumeroControl").value.trim();

        const nip =
            document.getElementById("nuevoNip").value;
            
        /* ======================================
            VALIDACIÓN DEL NIP DEL ESTUDIANTE
        ====================================== */
        // Comprobamos que el NIP contenga únicamente dígitos.
        // No permitimos letras, espacios ni símbolos.
        if (!/^[0-9]+$/.test(nip)) {

    mensaje.textContent =
        "El NIP debe contener únicamente números";

    return;

}


        // Comprobamos que los campos no estén vacíos
        if (numeroControl === "" || nip === "") {

            mensaje.textContent = "Ingrese número de control y NIP";
            return;

        }

        // El número de control debe contener solo números
        if (isNaN(numeroControl)) {

            mensaje.textContent = "Número de control inválido";
            return;

        }

        // Variable para identificar números de control repetidos
        let duplicado = false;

        // Recorremos nuestro array de usuarios
        for (let i = 0; i < usuarios.length; i++) {

            if (
                usuarios[i].tipo === "estudiante" &&
                usuarios[i].numeroControl === numeroControl
            ) {

                duplicado = true;
                break;

            }

        }

        // Si ya existe, detenemos el registro
        if (duplicado === true) {

            mensaje.textContent = "El número de control ya existe";
            return;

        }

        // Creamos el objeto del nuevo alumno
        const nuevoAlumno = {

            nombre: nombre,
            numeroControl: numeroControl,
            nip: nip,
            tipo: "estudiante"

        };

        // Insertamos el objeto en nuestro array
        usuarios.push(nuevoAlumno);

        // Mostramos un mensaje de confirmación
        mensaje.textContent = "Alumno registrado correctamente";

    }


    /* ======================================
        REGISTRO DE UN DOCENTE
    ====================================== */

    else if (tipo === "docente") {

        // Obtenemos la contraseña
        const contrasena =
            document.getElementById("nuevaContrasena").value;

        // Validamos que exista una contraseña
        if (contrasena === "") {

            mensaje.textContent = "Ingrese una contraseña";
            return;

        }

        // El nombre no debe ser únicamente numérico,
        // porque el login utiliza los números para buscar alumnos
        if (!isNaN(nombre)) {

            mensaje.textContent = "El nombre del docente no puede ser numérico";
            return;

        }

        // Variable para comprobar nombres repetidos
        let duplicado = false;

        // Buscamos si el nombre ya existe entre los docentes
        for (let i = 0; i < usuarios.length; i++) {

            if (
                usuarios[i].tipo === "docente" &&
                usuarios[i].nombre === nombre
            ) {

                duplicado = true;
                break;

            }

        }

        // También comprobamos que no exista como administrador
        for (let i = 0; i < administradores.length; i++) {

            if (administradores[i].nombre === nombre) {

                duplicado = true;
                break;

            }

        }

        // Evitamos registrar dos cuentas con el mismo nombre de acceso
        if (duplicado === true) {

            mensaje.textContent = "El nombre de usuario ya existe";
            return;

        }

        // Creamos el objeto del nuevo docente
        const nuevoDocente = {

            nombre: nombre,
            contrasena: contrasena,
            tipo: "docente"

        };

        // Insertamos el docente en el array
        usuarios.push(nuevoDocente);

        // Confirmamos el registro
        mensaje.textContent = "Docente registrado correctamente";

    }

    /* ======================================
        LIMPIAR EL FORMULARIO
    ====================================== */

    // Después de un registro correcto,
    // limpiamos los campos del formulario

    formularioNuevoUsuario.reset();

    // Ocultamos nuevamente los campos específicos
    camposAlumno.hidden = true;
    camposDocente.hidden = true;

});

/* ==========================================
    REGISTRO DE NUEVOS ADMINISTRADORES
========================================== */

// Obtenemos el formulario para registrar administradores
const formularioNuevoAdministrador =
    document.getElementById("formularioNuevoAdministrador");

// Escuchamos cuando el administrador envía el formulario
formularioNuevoAdministrador.addEventListener("submit", function(event) {

    // Evitamos que el formulario recargue la página
    event.preventDefault();

    /* ======================================
        OBTENER LOS DATOS INGRESADOS
    ====================================== */

    // Obtenemos el nombre del nuevo administrador
    const nombre =
        document.getElementById("nuevoNombreAdmin").value.trim();

    // Obtenemos su contraseña
    const contrasena =
        document.getElementById("nuevaContrasenaAdmin").value;

    // Obtenemos el elemento donde mostraremos los mensajes
    const mensaje =
        document.getElementById("mensajeNuevoAdministrador");

    // Limpiamos cualquier mensaje anterior
    mensaje.textContent = "";


    /* ======================================
        VALIDACIÓN DE CAMPOS VACÍOS
    ====================================== */

    // Comprobamos que ambos campos tengan información
    if (nombre === "" || contrasena === "") {

        mensaje.textContent = "Error Campos Vacíos";
        return;

    }


    /* ======================================
        VALIDACIÓN DEL NOMBRE
    ====================================== */

    // El nombre no puede ser únicamente numérico,
    // porque nuestro login interpreta los números
    // como números de control de estudiantes

    if (!isNaN(nombre)) {

        mensaje.textContent =
            "El nombre del administrador no puede ser numérico";

        return;

    }


    /* ======================================
        COMPROBAR ADMINISTRADORES DUPLICADOS
    ====================================== */

    // Esta variable nos permitirá saber si el nombre ya existe
    let duplicado = false;

    // Recorremos el array de administradores
    for (let i = 0; i < administradores.length; i++) {

        // Comparamos el nombre ingresado con los registrados
        if (nombre === administradores[i].nombre) {

            duplicado = true;

            // Detenemos la búsqueda al encontrar una coincidencia
            break;

        }

    }


    /* ======================================
        COMPROBAR NOMBRES DE DOCENTES
    ====================================== */

    // También debemos evitar que un administrador
    // tenga el mismo nombre de acceso que un docente

    for (let i = 0; i < usuarios.length; i++) {

        // Solamente revisamos los objetos de tipo docente
        if (
            usuarios[i].tipo === "docente" &&
            nombre === usuarios[i].nombre
        ) {

            duplicado = true;
            break;

        }

    }


    /* ======================================
        VALIDACIÓN FINAL DE DUPLICADOS
    ====================================== */

    // Si encontramos el nombre en alguno de los arrays,
    // detenemos el registro

    if (duplicado === true) {

        mensaje.textContent = "El nombre de usuario ya existe";
        return;

    }


    /* ======================================
        CREACIÓN DEL NUEVO ADMINISTRADOR
    ====================================== */

    // Creamos un objeto con la información validada
    const nuevoAdministrador = {

        nombre: nombre,
        contrasena: contrasena

    };

    // Insertamos el nuevo objeto en el array administradores
    administradores.push(nuevoAdministrador);


    /* ======================================
        CONFIRMACIÓN DEL REGISTRO
    ====================================== */

    // Mostramos un mensaje de confirmación
    mensaje.textContent = "Administrador registrado correctamente";

    // Limpiamos los campos después de registrar
    formularioNuevoAdministrador.reset();

});

function leerImagen(archivo) {

    return new Promise((resolve, reject) => {

        if (!archivo) {
            resolve(null);
            return;
        }

        // Máximo 2 MB
        if (archivo.size > 2 * 1024 * 1024) {
            reject(new Error("La imagen no debe superar 2 MB"));
            return;
        }

        const tiposPermitidos = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];

        if (!tiposPermitidos.includes(archivo.type)) {
            reject(new Error("Formato de imagen no permitido"));
            return;
        }

        const lector = new FileReader();

        lector.onload = () => resolve(lector.result);

        lector.onerror = () =>
            reject(new Error("No se pudo leer la imagen"));

        lector.readAsDataURL(archivo);
    });
}

/* ==========================================
    GENERACIÓN DE NUEVOS REPORTES
========================================== */

// Obtenemos el formulario para generar reportes
const formularioReporte =
    document.getElementById("formularioReporte");

// Establecemos los días disponibles para solucionar
// un reporte. Por ahora utilizaremos 3 días naturales.
const diasParaSolucionar = 3;


/* ==========================================
    EVENTO PARA GENERAR UN REPORTE
========================================== */

formularioReporte.addEventListener("submit",async function(event) {

    // Evitamos que el formulario recargue la página
    event.preventDefault();


    /* ======================================
        OBTENER LA INFORMACIÓN DEL FORMULARIO
    ====================================== */

    // Lugar donde se presenta el problema
    const lugar =
        document.getElementById("lugarReporte").value.trim();

    // Categoría seleccionada
    const tipo =
        document.getElementById("tipoReporte").value;

    // Descripción escrita por el usuario
    const descripcion =
        document.getElementById("descripcionReporte").value.trim();

    // Elemento para mostrar errores o confirmaciones
    const mensaje =
        document.getElementById("mensajeReporte");

    // Limpiamos cualquier mensaje anterior
    mensaje.textContent = "";


    /* ======================================
        VALIDACIÓN DE CAMPOS VACÍOS
    ====================================== */

    if (lugar === "" || tipo === "" || descripcion === "") {

        mensaje.textContent = "Complete todos los campos";
        return;

    }


    /* ======================================
        VALIDACIÓN DEL LUGAR
    ====================================== */

    // El lugar debe tener entre 5 y 100 caracteres
    if (lugar.length < 5 || lugar.length > 100) {

        mensaje.textContent =
            "El lugar debe contener entre 5 y 100 caracteres";

        return;

    }


    /* ======================================
        VALIDACIÓN DE LA DESCRIPCIÓN
    ====================================== */

    // La descripción debe contener entre 15 y 300 caracteres
    if (descripcion.length < 15 || descripcion.length > 300) {

        mensaje.textContent =
            "La descripción debe contener entre 15 y 300 caracteres";

        return;

    }

    let imagenProblema = null;

    try { 

    const archivo = document.getElementById(
        "evidenciaProblema"
    ).files[0];

    imagenProblema = await leerImagen(archivo);

    } catch (error) {

    mensaje.textContent = error.message;
    return;
    }

    /* ======================================
        GENERACIÓN AUTOMÁTICA DEL FOLIO
    ====================================== */

    // Buscaremos el folio numérico más alto que exista.
    // Esto evita repetir un folio si en algún momento
    // los reportes no están ordenados.

    let ultimoFolio = 0;

    // Recorremos los reportes registrados
    for (let i = 0; i < reportes.length; i++) {

        // Convertimos temporalmente el folio a número
        const folioActual = Number(reportes[i].numeroFolio);

        // Comprobamos si es mayor al último registrado
        if (folioActual > ultimoFolio) {

            ultimoFolio = folioActual;

        }

    }

    // Incrementamos el folio más alto encontrado
    let nuevoFolio = ultimoFolio + 1;

    // Lo convertimos nuevamente a texto
    nuevoFolio = String(nuevoFolio);

    // Agregamos ceros al inicio para conservar
    // el formato de nuestros folios: 001, 002, 003...

    if (nuevoFolio.length === 1) {

        nuevoFolio = "00" + nuevoFolio;

    } else if (nuevoFolio.length === 2) {

        nuevoFolio = "0" + nuevoFolio;

    }


    /* ======================================
        GENERACIÓN DE FECHAS
    ====================================== */

    // Obtenemos la fecha y hora actual
    const fecha = new Date();

    // Creamos una copia para calcular la fecha límite
    const fechaLimite = new Date(fecha);

    // Sumamos los días establecidos al día actual
    fechaLimite.setDate(
        fechaLimite.getDate() + diasParaSolucionar
    );


    /* ======================================
        CREACIÓN DEL OBJETO REPORTE
    ====================================== */

    // Creamos un objeto con todos los datos validados
    const nuevoReporte = {

        numeroFolio: nuevoFolio,

        lugar: lugar,

        tipo: tipo,

        descripcion: descripcion,

        fecha: fecha,

        fechaLimite: fechaLimite,

        estado: "Pendiente",

        solucion: "",
        
        evidenciaProblema: imagenProblema,

        evidenciaSolucion: null,

    };


    /* ======================================
        ALMACENAMIENTO DEL REPORTE
    ====================================== */

    // Insertamos el nuevo objeto en nuestro array
    reportes.push(nuevoReporte);


    /* ======================================
        CONFIRMACIÓN DEL REGISTRO
    ====================================== */
    // Limpiamos el mensaje anterior
    mensaje.textContent = "";
    

    // Limpiamos los campos del formulario
    limpiarFormularioReporte();
    // Mostrar notificación flotante
    mostrarNotificacionReporte(nuevoFolio);

});



/* ==========================================
    CANCELAR SOLUCIÓN DE UN REPORTE
========================================== */

// Obtenemos el botón CANCELAR
const cancelarSolucion =
    document.getElementById("cancelarSolucion");

// Escuchamos cuando el administrador lo presiona
cancelarSolucion.addEventListener("click", function() {

    // Ocultamos el formulario de solución
    panelSolucionReporte.hidden = true;

    // Mostramos nuevamente la lista de reportes
    panelReportesAdmin.hidden = false;

    // Limpiamos el campo de la solución
    document.getElementById("formularioSolucion").reset();

});



/* ==========================================
    CERRAR SESIÓN
    ALUMNOS Y DOCENTES
========================================== */

// Obtenemos el botón CERRAR SESIÓN
const cerrarSesion =
    document.getElementById("cerrarSesion");

// Escuchamos cuando el usuario presiona el botón
cerrarSesion.addEventListener("click", function() {

    // Ocultamos el panel de alumnos y docentes
    panelEstudiante.hidden = true;

    // Ocultamos las demás interfaces del usuario
    panelEstudianteReportes.hidden = true;
    panelCrearReporte.hidden = true;
    // Limpiamos la información del usuario anterior
    usuarioActivo.textContent = "";

    // Ocultamos la barra cuando no hay una sesión activa
    usuarioActivo.hidden = true;
    // Limpiamos los campos del formulario de inicio de sesión
    formulario.reset();

    // Eliminamos cualquier mensaje de error anterior
    document.getElementById("mensajeDeError").textContent = "";

    // Mostramos nuevamente el login
    login.hidden = false;

});


/* ==========================================
    CERRAR SESIÓN
    ADMINISTRADORES
========================================== */

// Obtenemos el botón CERRAR SESIÓN del administrador
const cerrarSesionAdmin =
    document.getElementById("cerrarSesionAdmin");

// Escuchamos cuando el administrador presiona el botón
cerrarSesionAdmin.addEventListener("click", function() {

    // Ocultamos todas las interfaces administrativas
    panelAdministrador.hidden = true;
    panelAgregarUsuario.hidden = true;
    panelAgregarAdministrador.hidden = true;
    panelReportesAdmin.hidden = true;
    panelSolucionReporte.hidden = true;

    usuarioActivo.hidden = true;
    // Limpiamos la información del administrador
    usuarioActivo.textContent = "";

   // Ocultamos la barra superior
    usuarioActivo.hidden = true; 

    // Limpiamos los campos del inicio de sesión
    formulario.reset();

    // Eliminamos los mensajes de error anteriores
    document.getElementById("mensajeDeError").textContent = "";

    // Mostramos nuevamente el login
    login.hidden = false;

});


/* ==========================================
    REGISTRO DE SOLUCIONES
========================================== */

// Obtenemos el formulario para registrar soluciones
const formularioSolucion =
    document.getElementById("formularioSolucion");

// Escuchamos cuando el administrador lo envía
formularioSolucion.addEventListener("submit", async function(event) {

    // Evitamos que la página se recargue
    event.preventDefault();


    /* ======================================
        OBTENER LA INFORMACIÓN
    ====================================== */

    // Obtenemos el texto escrito por el administrador
    const solucion =
        document.getElementById("textoSolucion").value.trim();

    // Elemento para mostrar mensajes
    const mensaje =
        document.getElementById("mensajeSolucion");

    
    // Ocultamos la barra superior
    usuarioActivo.hidden = true;

    /* ======================================
        VALIDAR REPORTE SELECCIONADO
    ====================================== */

    // Comprobamos que realmente exista un reporte
    // seleccionado antes de guardar la solución

    if (reporteSeleccionado === false) {

        mensaje.textContent = "No se seleccionó ningún reporte";
        return;

    }


    /* ======================================
        VALIDAR LA SOLUCIÓN
    ====================================== */

    // La solución debe contener entre 15 y 300 caracteres

    if (solucion.length < 15 || solucion.length > 300) {

        mensaje.textContent =
            "La solución debe contener entre 15 y 300 caracteres";

        return;

    }


    /* ======================================
        EVITAR SOLUCIONES DUPLICADAS
    ====================================== */

    // No permitimos solucionar nuevamente un reporte
    // que ya fue atendido anteriormente

    if (
        reporteSeleccionado.estado === "Resuelto" ||
        reporteSeleccionado.estado === "Resuelto fuera de tiempo"
    ) {

        mensaje.textContent = "Este reporte ya fue solucionado";
        return;

    }
    // ======================================
    // OBTENER EVIDENCIA DE LA SOLUCIÓN
    // ======================================
    let imagenSolucion = null;

    try {

    const archivo = document.getElementById(
        "evidenciaSolucion"
    ).files[0];

    // Validar que exista una fotografía
    if (!archivo) {
        mensaje.textContent =
            "Debe adjuntar una imagen de la solución";
        return;
    }
        imagenSolucion = await leerImagen(archivo);

    } catch (error) {

        mensaje.textContent = error.message;
        return;
    }


    /* ======================================
        OBTENER LA FECHA DE SOLUCIÓN
    ====================================== */

    // Guardamos la fecha y hora exacta
    // en la que el administrador registra la solución

    const fechaSolucion = new Date();


    /* ======================================
        DETERMINAR EL NUEVO ESTADO
    ====================================== */

    // Comparamos la fecha de solución con la fecha límite

    if (fechaSolucion <= reporteSeleccionado.fechaLimite) {

        // Si todavía estamos dentro del plazo
        reporteSeleccionado.estado = "Resuelto";

    } else {

        // Si el plazo ya venció
        reporteSeleccionado.estado = "Resuelto fuera de tiempo";

    }


    /* ======================================
            GUARDAR LA INFORMACIÓN
    ====================================== */

    // Guardamos la descripción de la solución
    // directamente en el objeto seleccionado

    reporteSeleccionado.solucion = solucion;

    // También almacenamos cuándo fue solucionado
    reporteSeleccionado.fechaSolucion = fechaSolucion;

    // Guardamos la fotografía de la solución
    reporteSeleccionado.evidenciaSolucion = imagenSolucion;


    /* ======================================
        CONFIRMACIÓN
    ====================================== */

    // Mostramos el resultado del procedimiento

    mensaje.textContent =
        "Solución registrada correctamente. Estado: " +
        reporteSeleccionado.estado;

    // Actualizamos el estado mostrado en pantalla
    document.getElementById("solucionEstado").textContent =
        reporteSeleccionado.estado;

    // Limpiamos el formulario
    formularioSolucion.reset();

});

// ==========================================
// ACTUALIZAR TEMPORIZADORES EN TIEMPO REAL
// ==========================================

setInterval(function() {

    // Revisamos los estados de los reportes
    actualizarEstados();

    // Buscamos los temporizadores que están en pantalla
    const temporizadores = document.querySelectorAll(
        "[data-temporizador]"
    );

    // Actualizamos cada uno
    temporizadores.forEach(function(elemento) {

        const folio = elemento.dataset.temporizador;

        // Buscamos el reporte correspondiente
        const reporte = reportes.find(function(r) {
            return r.numeroFolio === folio;
        });

        if (reporte) {

            elemento.textContent =
                "Tiempo restante: " +
                calcularTiempoRestante(reporte);

        }
    });

}, 1000);


//Intereccion del estilo de la pagina
//--------------------------------------------------------------------------------------------
// =====================================
// CARRUSEL DE FOTOGRAFÍAS
// =====================================

const imagenesFondo = [
    "css/Imagen1.jpg",
    "css/imagen2.jpg",
    "css/imagen3.jpg"
];

let indiceFondo = 0;

const fondoDinamico = document.getElementById("fondoDinamico");

setInterval(function() {

    // Ocultar suavemente la imagen actual
    fondoDinamico.style.opacity = "0";

    setTimeout(function() {

        // Pasar a la siguiente imagen
        indiceFondo = (indiceFondo + 1) % imagenesFondo.length;

        // Cambiar la fotografía
        fondoDinamico.style.backgroundImage =
            `url("${imagenesFondo[indiceFondo]}")`;

        // Mostrar la fotografía nueva
        fondoDinamico.style.opacity = "1";

    }, 1000);

}, 6000);
// =====================================
// MOSTRAR Y OCULTAR CONTRASEÑA
// =====================================

const botonOjo = document.getElementById("mostrarContrasena");

const campoContrasena = document.getElementById("contrasena");

botonOjo.addEventListener("click", function() {

    if (campoContrasena.type === "password") {

        // Mostrar contraseña
        campoContrasena.type = "text";

        botonOjo.innerHTML =
            '<i class="icon icon-eye-off" aria-hidden="true"></i>';

        botonOjo.setAttribute("aria-label", "Ocultar contraseña");
        botonOjo.setAttribute("aria-pressed", "true");

    } else {

        // Ocultar contraseña
        campoContrasena.type = "password";

        botonOjo.innerHTML =
            '<i class="icon icon-eye" aria-hidden="true"></i>';

        botonOjo.setAttribute("aria-label", "Mostrar contraseña");
        botonOjo.setAttribute("aria-pressed", "false");

    }

});