const login = document.getElementById("login");
const panelEstudiante = document.getElementById("panelEstudiante")
login.hidden = false
panelEstudiante.hidden = true

const formulario = document.querySelector("#formulario");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();
    const usuario = document.getElementById("usuario").value;
    const contrasena = document.getElementById("contrasena").value;
    const error = document.getElementById("mensajeDeError")
    
    let encontrado = false
    if (usuario == "" || contrasena == ""){
        error.textContent = "Error Campos Vacios"
        return;
    }
    else if (isNaN(usuario)){
        for(let i = 0 ; i < administradores.length ; i++){
            if(usuario === administradores[i].nombre){
                encontrado = administradores[i]
            break;
            }
        }
        
    }else{
        for(let i = 0 ; i < usuarios.length;i++){
            if(usuario === usuarios[i].numeroControl){
                encontrado = usuarios[i]
            break;
            }
        }
        
    }

    if (encontrado === false) {error.textContent = "Usuario No Encontrado"}
    else if (encontrado.contrasena === contrasena){
        login.hidden = true;
        panelEstudiante.hidden = false;
        const nombreUsuario = document.getElementById("nombreUsuario");

        if (encontrado.tipo === "estudiante") {
        nombreUsuario.textContent = "Alumno: " + encontrado.nombre;
        }
        else if (encontrado.tipo === "docente") {
        nombreUsuario.textContent = "Docente: " + encontrado.nombre;
        }
        else {
        nombreUsuario.textContent = "Administrador: " + encontrado.nombre;
        }
        }else{
        error.textContent = "Contraseña Incorrecta"
    }
});

const verReportes = document.getElementById("verReportes");
const panelEstudianteReportes = document.getElementById("panelEstudianteReportes")

panelEstudianteReportes.hidden = true
verReportes.addEventListener("click", () => {
    panelEstudiante.hidden = true
    panelEstudianteReportes.hidden = false
    const lu =document.getElementById("listaReportes")
    lu.textContent = "";

    reportes.forEach( reporte =>{
        const nuevo =  document.createElement("li");
        nuevo.dataset.folio = reporte.numeroFolio;
        nuevo.className = "tarjeta-reporte"
        nuevo.textContent =
            "Folio: " + reporte.numeroFolio +
            " | Lugar: " + reporte.lugar +
            " | Tipo: " + reporte.tipo +
            " | Descripción: " + reporte.descripcion +
            " | Estado: " + reporte.estado;``
        
        lu.appendChild(nuevo)
    })
    const regresar = document.getElementById("regresar");
    
    regresar.addEventListener("click",() => {
        panelEstudiante.hidden = false 
        panelEstudianteReportes.hidden = true
    })


})







