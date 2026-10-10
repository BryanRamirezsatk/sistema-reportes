const usuarios = [

    {
        nombre: "Bryan Ramirez",
        numeroControl: "26112171",
        nip: "1234",
        tipo: "estudiante"
    },

    {
        nombre: "Ana Villegaz",
        contrasena: "Soltrue",
        tipo: "docente"
    }

];
const administradores = [

    {
        nombre: "Felipe Hernandez",
        contrasena: "1"
    }

];
const reportes = [

    { 
        numeroFolio: "001",
        lugar: "Pasillo Principal",
        tipo: "Seguridad",
        descripcion: "Hay demasiada agua derramada",
        fecha: new Date(),
        fechaLimite: new Date(
            new Date().getTime() + (3 * 24 * 60 * 60 * 1000)
        ),
        estado: "Pendiente",
        solucion: ""
    },

    {
        numeroFolio: "002",
        lugar: "Pasillo Principal",
        tipo: "Seguridad",
        descripcion: "Manguera suelta",
        fecha: new Date(),
        fechaLimite: new Date(
            new Date().getTime() + (3 * 24 * 60 * 60 * 1000)
        ),
        estado: "Pendiente",
        solucion: ""
    }

];
