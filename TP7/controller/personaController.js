
require("rootpath")();
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var persona_db = require("model/persona.js");




app.get('/', getAll);
app.post('/', crear);
app.put('/:dni', actualizar);
app.delete('/:dni', borrar);
app.get('/:apellido', getByApellido);
app.get("/nickname/:dni", getNick);


function getNick(req, res) {
    persona_db.getNickname(req.params.dni, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    }
    );
}

function getAll(req, res) {
    persona_db.getAll(function (err, resultado) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(resultado);
        }
    });
}



function crear(req, res) {
    let persona = req.body;
    persona_db.crear(persona, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    });
}


function actualizar(req, res) {
    let persona = req.body;
    let id = req.params.dni;
    persona_db.actualizar(persona, id, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    });
}



function borrar(req, res) {
    let id_persona = req.params.dni;
    persona_db.borrar(id_persona, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (resultado.detail.affectedRows == 0) {
                res.status(404).send(resultado.message);
            } else {
                res.send(resultado.message);
            }
        }
    });
}



function getByApellido(req, res) {
    persona_db.getByApellido(req.params.apellido, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    });
}






module.exports = app;

