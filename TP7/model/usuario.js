require("rootpath")();
const mysql = require("mysql2");
const configuracion = require("config.json");

var connection = mysql.createConnection(configuracion.database);
connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("La base de datos ha sido conectada con exito en Usuario_model");
    }
});

var usuario_db = {};



//crear usuario

usuario_db.crear = function (usuario, retorno) {
    consulta = "INSERT INTO USUARIO (mail, nickname, password) VALUES (?,?,?);";
    parametros = [usuario.mail, usuario.nickname, usuario.password];

    connection.query(consulta, parametros, (err) => {
        if (err) {

            if (err.code == "ER_DUP_ENTRY") {
                retorno({
                    message: "El usuario ya fue registrado",
                    
                });
            } else {
                retorno({
                    message: "Error ",
                    detail: err
                });
            }
        } else {

            retorno(undefined, {
                message: "Se creo el usuario " + usuario.nickname,
              
            });
        }
    });
}

//ver todos los usuarios

usuario_db.getAll = function (retorno) {
    var consulta = "SELECT * FROM USUARIO";
    connection.query(consulta, function (err, rows) {
        if (err) {
            retorno(err);
            return;
        } else {
            retorno(undefined, rows);
        }
    });
}

//actualizar usuario por nickname como referencia

usuario_db.actualizar = function (user, id, retorno) {
    parametros = [user.mail, user.nickname, user.password, id]
    consulta = "UPDATE USUARIO set mail = ?, nickname = ?, password = ? WHERE nickname = ?;";

    connection.query(consulta, parametros, (err) => {
        if (err) {
            retorno({ menssage: err.code, detail: err });
        } else {
            retorno({message: "Se actualizaron los datos del usuario " + user.nickname});
                    
        }

    }
    )
}




//borrar

usuario_db.borrar = function (nickname, retorno) {


    connection.query("DELETE FROM usuario WHERE nickname = ? ", nickname, (err, result) => {
        if (err) {
            retorno({ menssage: err.code, detail: err });
        } else {
            if (result.affectedRows == 0) {
                retorno(undefined,
                    {
                        message: "No se encontro un usuario con el nickname ingresado",
                        detail: result
                    });
            } else {
                retorno(undefined, { message: "Usuario eliminado", detail: result });
            }
        }
    });
}

//encontrar usuario por mail

usuario_db.getByEmail = function (email, retorno) {
    connection.query("select * from usuario  where mail = ? ", email, (err, result) => {
        if (err) {
            retorno(undefined, { message: err.code, detail: err });
        } else {
            retorno(undefined, { message: "Se encontro el usuario", result });

        }

    })

}


module.exports = usuario_db;