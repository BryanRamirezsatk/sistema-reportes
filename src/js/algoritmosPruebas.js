// ==================================================
// PRUEBAS AUTOMÁTICAS DEL LOGIN
// ==================================================


// --------------------------------------------------
// 1. CREDENCIALES VÁLIDAS CONOCIDAS
// --------------------------------------------------

const accesosValidos = [

    {
        usuario: "26112171",
        contrasena: "1234"
    }

];


// --------------------------------------------------
// 2. USUARIOS PARA PRUEBAS ALEATORIAS
// --------------------------------------------------

const usuariosPrueba = [

    // Usuario válido
    "26112171",

    // Números de control inexistentes
    "99999999",
    "12345678",
    "87654321",
    "11111111",
    "00000000",
    "123",
    "0",
    "1",
    "0001",

    // Nombres inexistentes
    "Bryan",
    "Administrador",
    "Docente",
    "Juan",
    "Maria",
    "Pedro",
    "admin",
    "usuario",
    "profesor",
    "estudiante",

    // Letras y números
    "Bryan123",
    "admin123",
    "usuario01",
    "ABC123",
    "123ABC",
    "A1",
    "26112171A",

    // Caracteres especiales
    "@admin",
    "#usuario",
    "usuario!",
    "user@test",
    "???",
    "---",

    // Otros strings
    "null",
    "undefined",
    "true",
    "false",
    "NaN",

    // Vacío
    ""
];


// --------------------------------------------------
// 3. CONTRASEÑAS PARA PRUEBAS ALEATORIAS
// --------------------------------------------------

const contrasenasPrueba = [

    // NIP válido conocido
    "1234",

    // NIP incorrectos
    "9999",
    "0000",
    "1111",
    "2222",
    "123456",
    "12345678",
    "1",
    "0",

    // Letras
    "abcd",
    "password",
    "contrasena",
    "admin",
    "Bryan",
    "qwerty",

    // Letras + números
    "abc123",
    "Admin123",
    "Bryan1234",
    "pass2026",
    "A1B2C3",

    // Caracteres especiales
    "1234!",
    "@1234",
    "abc@123",
    "!@#$",
    "????",
    "----",

    // Espacios
    " 1234 ",
    "1234 ",
    " 1234",
    " ",

    // Otros strings
    "null",
    "undefined",
    "true",
    "false",
    "NaN",

    // Vacío
    ""
];


// --------------------------------------------------
// 4. ARRAY DONDE GUARDAREMOS LOS RESULTADOS
// --------------------------------------------------

const resultadosLogin = [];


// --------------------------------------------------
// 5. FUNCIÓN PARA HACER PAUSAS
// --------------------------------------------------

function esperar(ms) {

    return new Promise(resolve => setTimeout(resolve, ms));

}


// --------------------------------------------------
// 6. FUNCIÓN PRINCIPAL
// --------------------------------------------------

async function probarLogin(cantidad = 30) {

    // Limpiar resultados anteriores
    resultadosLogin.length = 0;


    for (let i = 1; i <= cantidad; i++) {


        // ==========================================
        // ELEGIR EL TIPO DE PRUEBA
        // ==========================================

        let usuario;
        let contrasena;
        let origen;


        // 25% de probabilidad de utilizar
        // una credencial válida completa
        const usarValido = Math.random() < 0.25;


        if (usarValido) {

            const acceso =
                accesosValidos[
                    Math.floor(
                        Math.random() * accesosValidos.length
                    )
                ];

            usuario = acceso.usuario;
            contrasena = acceso.contrasena;

            origen = "Credencial válida";

        } else {

            // 75% de las veces mezclamos datos
            usuario =
                usuariosPrueba[
                    Math.floor(
                        Math.random() * usuariosPrueba.length
                    )
                ];

            contrasena =
                contrasenasPrueba[
                    Math.floor(
                        Math.random() * contrasenasPrueba.length
                    )
                ];

            origen = "Datos aleatorios";
        }


        // ==========================================
        // OBTENER ELEMENTOS DEL LOGIN
        // ==========================================

        const inputUsuario =
            document.getElementById("usuario");

        const inputContrasena =
            document.getElementById("contrasena");

        const formulario =
            document.getElementById("formulario");

        const mensaje =
            document.getElementById("mensajeDeError");


        // ==========================================
        // ESCRIBIR LOS DATOS
        // ==========================================

        inputUsuario.value = usuario;
        inputContrasena.value = contrasena;


        // ==========================================
        // EJECUTAR LOGIN
        // ==========================================

        formulario.requestSubmit();

        await esperar(100);


        // ==========================================
        // LEER LO QUE REALMENTE OCURRIÓ
        // ==========================================

        let resultado;

        if (mensaje.textContent !== "") {

            resultado = mensaje.textContent;

        } else {

            resultado = "Acceso permitido";

        }


        // ==========================================
        // CALCULAR LO QUE DEBERÍA OCURRIR
        // ==========================================

        let esperado = "";


        if (usuario.trim() === "" || contrasena === "") {

            esperado = "Error Campos Vacíos";

        } else {

            const usuarioLimpio = usuario.trim();

            let encontrado = false;
            let tipo = "";


            // Buscar estudiante
            if (!isNaN(usuarioLimpio)) {

                encontrado = usuarios.find(u =>
                    u.tipo === "estudiante" &&
                    u.numeroControl === usuarioLimpio
                );

                tipo = "estudiante";

            } else {

                // Buscar docente
                encontrado = usuarios.find(u =>
                    u.tipo === "docente" &&
                    u.nombre === usuarioLimpio
                );


                if (encontrado) {

                    tipo = "docente";

                } else {

                    // Buscar administrador
                    encontrado = administradores.find(a =>
                        a.nombre === usuarioLimpio
                    );

                    tipo = "administrador";
                }
            }


            // ======================================
            // RESPUESTA ESPERADA
            // ======================================

            if (!encontrado) {

                esperado = "Usuario No Encontrado";

            }

            else if (
                tipo === "estudiante" &&
                encontrado.nip !== contrasena
            ) {

                esperado = "NIP Incorrecto";

            }

            else if (
                tipo !== "estudiante" &&
                encontrado.contrasena !== contrasena
            ) {

                esperado = "Contraseña Incorrecta";

            }

            else {

                esperado = "Acceso permitido";

            }
        }


        // ==========================================
        // PASS O FAIL
        // ==========================================

        const estado =
            resultado === esperado
                ? "FUNCIONA"
                : "FALLO";


        // ==========================================
        // GUARDAR RESULTADO
        // ==========================================

        resultadosLogin.push({

            Prueba: i,

            Tipo: origen,

            Usuario: usuario,

            Contrasena: contrasena,

            Esperado: esperado,

            Resultado: resultado,

            Estado: estado

        });


        // ==========================================
        // SI ENTRÓ, CERRAR SESIÓN
        // ==========================================

        if (resultado === "Acceso permitido") {

            if (
                !document
                    .getElementById("panelEstudiante")
                    .hidden
            ) {

                document
                    .getElementById("cerrarSesion")
                    .click();

            }

            else if (
                !document
                    .getElementById("panelAdministrador")
                    .hidden
            ) {

                document
                    .getElementById("cerrarSesionAdmin")
                    .click();

            }
        }


        // Pausa antes de la siguiente prueba
        await esperar(100);

    }


    // ==============================================
    // RESULTADOS FINALES
    // ==============================================

    console.table(resultadosLogin);

    return resultadosLogin;
}