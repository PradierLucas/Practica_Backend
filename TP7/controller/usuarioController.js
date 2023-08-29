require("rootpath")();
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var usuarioDb = require("model/usuario.js");


app.get('/', getAll);
app.post('/', createUser);
app.put('/:nickname', updateUser);
app.delete('/:nickname', deleteUser);
app.get("/:mail", getByEmail)




function getAll(req, res) {
    usuarioDb.getAll((err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(resultado);
        }
    });
}

function createUser(req, res) {
    let usuario = req.body;
    usuarioDb.crear(usuario, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    });
}


function updateUser(req, res) {
    let datos_usuario = req.body;
    let id_user = req.params.nickname
    usuarioDb.actualizar(datos_usuario, id_user, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado)
        }
    })
}


function deleteUser(req, res) {
    let usuario_eliminar = req.params.nickname;
    usuarioDb.borrar(usuario_eliminar, (err, result_model) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (result_model.detail.affectedRows == 0) {
                res.status(404).send(result_model.message);
            } else {
                res.send(result_model.message);
            }
        }
    });
}


function getByEmail(req, res) {
    usuarioDb.getByEmail(req.params.mail, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    });
}


module.exports = app;



