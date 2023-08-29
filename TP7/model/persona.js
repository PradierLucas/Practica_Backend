require("rootpath")();
const mysql = require("mysql2");
const configuracion = require("config.json");


var connection = mysql.createConnection(configuracion.database);
connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("La base de datos ha sido conectada con exito en Persona_model");
    }
});

var persona_db = {};


//mostrar nickname del usuario por dni 

persona_db.getNickname = function (dni, resultado) {
    consulta = "select nickname from usuario INNER JOIN persona on usuario.persona_dni = persona.dni where persona.dni = ?";
    connection.query(consulta, dni, (err, result) => {
        if (err) {
            resultado({
                message: "No se pudo mostrar la persona",
                detail: err
            });
        } else {
            resultado(undefined, result);
        }
    });
}




//crear persona

persona_db.crear = function (datos, resultado) {
    consulta = "INSERT INTO persona (dni, nombre, apellido) VALUES (?,?,?);";
    params = [datos.dni, datos.nombre, datos.apellido];

    connection.query(consulta, params, (err, rows) => {
        if (err) {
            if (err.code == "ER_DUP_ENTRY") {
                resultado({
                    message: "La persona ya fue registrada anteriormente",
                    detail: err
                });
            } else {
                resultado({
                    message: "Error diferente",
                    detail: err
                });
            }
        } else {
            resultado(undefined, {
                message: "Se creo la persona",
                detail: rows
            });
        }
    });
}

// ver personas

persona_db.getAll = function (resultado) {
    var consulta = "SELECT * FROM persona";
    connection.query(consulta, function (err, rows) {
        if (err) {
            resultado({
                message: "No se pudo mostrar las personas",
                detail: err
            });
        } else {
            resultado(undefined, rows);
        }
    });
}


//actualizar persona por id

persona_db.actualizar = function (datos, id, retorno) {
    consulta = "UPDATE persona SET dni = ?, nombre = ?, apellido = ? WHERE dni = ?";
    params = [datos.dni, datos.nombre, datos.apellido, id];

    connection.query(consulta, params, (err, result) => {

        if (err) {

            retorno({
                message: "Error, analizar codigo error",
                detail: err
            });

        } else if (result.affectedRows == 0) {
            retorno({
                message: "No existe persona que coincida con el criterio de busqueda",
                detail: result
            });
        } else {
            retorno(undefined, {
                message: "Se modificó la persona",
                detail: result
            });
        }
    });
}


//borrar persona por id

persona_db.borrar = function (id, resultado) {
    consulta = "DELETE FROM persona WHERE dni = ?";
    connection.query(consulta, id, (err, result) => {
        if (err) {
            resultado({ menssage: err.code, detail: err });
        } else {
            if (result.affectedRows == 0) {
                resultado(undefined,
                    {
                        message: "No se encontro una persona con el dni ingresado",
                        detail: result
                    });
            } else {
                resultado(undefined, { message: "Persona eliminada", detail: result });
            }
        }
    });
}




//buscar persona por apellido

persona_db.getByApellido = function (apellido, resultado) {


    connection.query("select * from persona where apellido = ?", apellido, (err, result) => {
        if (err) {
            resultado({
                menssage: "Error inesperado",
                detail: err
            });
        } else if (result.length == 0) { 
            resultado(undefined, {
                menssage: "No se encontro la persona buscada",
                detail: result
            });
        } else {
            resultado({
                message: "Se ha encontrado la persona solicitada",
                detail: result
            })

        }


    });
}


module.exports = persona_db;