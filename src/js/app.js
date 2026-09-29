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
        for(let i = 0 ; i < estudiantes.length;i++){
            if(usuario === estudiantes[i].numeroControl){
                encontrado = estudiantes[i]
            break;
            }
        }
        
    }

    if (encontrado === false) {error.textContent = "Usuario No Encontrado"}
    else if (encontrado.contrasena === contrasena){
        console.log("Bienvenido")
    }else{
        error.textContent = "Contraseña Incorrecta"
    }
});




