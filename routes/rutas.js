const request = require('request');
const interprete = require('../Interpreter/LupGrammar.js')
var ssn;
exports.routesConfig = function (app) {
    app.get("/", (req, res) => {
        ssn = req.session;
        if (ssn.datos) {
            res.render('./Modos.ejs');
        } else {
            res.render('./index.ejs');
        }
    });

    app.post("/Login", (req, res) => {
        ssn = req.session;
        usuario = req.body.nombreUsuario;
        pass = req.body.password;
        var loopEnviar = `[+LOGIN][+USER]` + usuario + `[-USER][+PASS]` + pass + `[-PASS][-LOGIN]`;
        data = JSON.stringify(loopEnviar);
        request.post({
            headers: { 'content-type': 'application/json' },
            url: 'https://localhost:44333/api/Login',
            body: data,
            strictSSL: false
        }, function (error, response, body) {
            var result = interprete.parse(JSON.parse(body)) ? true : false;
            if (result) {
                ssn.datos = { "usuario": usuario, "paquetesOut": loopEnviar, "paquetesIn": JSON.parse(body) };
                loopEnviar = `[+STRUC][+USER]` + usuario + `[-USER][-STRUC]`;
                data = JSON.stringify(loopEnviar);
                request.post({
                    headers: { 'content-type': 'application/json' },
                    url: 'https://localhost:44333/api/struc',
                    body: data,
                    strictSSL: false
                }, function (error, response, body) {
                    var result = interprete.parse(JSON.parse(body));
                    if (result) {
                        ssn.datos.paquetesOut += '\n' + loopEnviar;
                        ssn.datos.paquetesIn += '\n' + JSON.parse(body);
                        ssn.datos.struc = result;
                        ssn.datos.mensajes = "";
                        ssn.datos.errores = "";
                    }
                    res.redirect('/Modos');
                });
            } else {
                res.redirect('/');
            }
        });
    });

    app.get("/Login", (req, res) => {
        ssn = req.session;
        if (ssn.datos) {
            res.render('./Modos.ejs');
        } else {
            res.redirect('/');
        }
    });

    app.get("/Modos", (req, res) => {
        ssn = req.session;
        if (ssn.datos) {
            res.render('./Modos.ejs');
        } else {
            res.redirect('/');
        }
    });

    app.get('/logout', function (req, res) {
        ssn = req.session;
        if (ssn.datos) {
            req.session.destroy(function (err) {
                if (err) {
                    console.log(err);
                } else {
                    res.redirect('/');
                }
            });
        } else {
            res.redirect('/');
        }
    });

    app.get('/BeginnerMode', function (req, res) {
        ssn = req.session;
        if (ssn.datos) {
            res.render('./Editor.ejs', {
                paquetesOut: ssn.datos.paquetesOut,
                paquetesIn: ssn.datos.paquetesIn,
                listaMensajes: ssn.datos.mensajes,
                listaErrores: ssn.datos.errores,
                struc: ssn.datos.struc
            });
        } else {
            res.redirect('/');
        }
    });

    app.get('/MiddleMode', function (req, res) {
        ssn = req.session;
        if (ssn.datos) {
            res.render('./Editor.ejs', { paquetesOut: ssn.datos.paquetesOut, paquetesIn: ssn.datos.paquetesIn, struc: ssn.datos.struc });
        } else {
            res.redirect('/');
        }
    });

    app.get('/AdvancedMode', function (req, res) {
        ssn = req.session;
        if (ssn.datos) {
            res.render('./Editor.ejs', { paquetesOut: ssn.datos.paquetesOut, paquetesIn: ssn.datos.paquetesIn, struc: ssn.datos.struc });
        } else {
            res.redirect('/');
        }
    });

    app.post('/Ejecutar', function (req, res) {
        ssn = req.session;
        if (ssn.datos) {
            console.log(req.body.data);
            loopEnviar = `[+QUERY][+USER]` + usuario + `[-USER][+DATA]`+req.body.data+`[-DATA][-QUERY]`;
            data = JSON.stringify(loopEnviar);
            request.post({
                headers: { 'content-type': 'application/json' },
                url: 'https://localhost:44333/api/doQuery',
                body: data,
                strictSSL: false
            }, function (error, response, body) {
                var result = interprete.parse(JSON.parse(body));
                var listaMensajes = "";
                var listaErrores = "";
                console.log(result);
                result.map(m => {
                    if (m.mensaje != undefined && m.mensaje != null) {
                        listaMensajes += m.mensaje+"\n";
                    } else if (m.error != undefined && m.error != null) {
                        var er = m.error.fila + " " + m.error.columna+ " " + m.error.tipo+ " " + m.error.descripcion
                        + " " + m.error.fecha;
                        listaErrores += er+"\n";
                    }
                });
                if (result) {
                    ssn.datos.paquetesOut += '\n' + loopEnviar;
                    ssn.datos.paquetesIn += '\n' + JSON.parse(body);
                    ssn.datos.mensajes = listaMensajes;
                    ssn.datos.errores = listaErrores;
                }
                res.status(202).json({
                    paquetesOut: ssn.datos.paquetesOut,
                    paquetesIn: ssn.datos.paquetesIn,
                    listaMensajes: ssn.datos.mensajes,
                    listaErrores: ssn.datos.errores,
                    struc: ssn.datos.struc
                });
            });
        } else {
            res.redirect('/');
        }
    });

    app.get('/Ejecutar', function (req, res) {
        ssn = req.session;
        if (ssn.datos) {
            res.status(202).json({
                paquetesOut: ssn.datos.paquetesOut,
                paquetesIn: ssn.datos.paquetesIn,
                listaMensajes: ssn.datos.mensajes,
                listaErrores: ssn.datos.errores,
                struc: ssn.datos.struc
            });
        } else {
            res.redirect('/');
        }
    });
}