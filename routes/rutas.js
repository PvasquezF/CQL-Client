const request = require('request');
const interprete = require('../Interpreter/LupGrammar.js');
var formidable = require('formidable');
var fs = require('fs');
var ssn;
var urlIISServidor = 'http://localhost/';
//var urlIISServidor = 'https://localhost:44333/';
exports.routesConfig = function (app) {
    app.post("/AdvancedMode", (req, res) => {
        ssn = req.session;
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            var oldpath = files.archivo.path;
            var newpath = './public/' + files.archivo.name;
            fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
                fs.readFile(newpath, "utf-8", function (err, buf) {
                    res.status(202).json({
                        paquetesOut: ssn.datos.paquetesOut,
                        paquetesIn: ssn.datos.paquetesIn,
                        listaMensajes: ssn.datos.mensajes,
                        listaErrores: ssn.datos.errores,
                        struc: ssn.datos.struc,
                        archivo: buf
                    });
                });
            });

        });
    });
    app.get("/", (req, res) => {
        ssn = req.session;
        if (ssn.datos) {
            res.render('./Modos.ejs');
        } else {
            res.render('./index.ejs', {
                errores: [],
                luplogoutEnviado: "",
                luplogoutRecibido: ""
            });
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
            url: urlIISServidor + 'api/Login',
            body: data,
            strictSSL: false
        }, function (error, response, body) {
            var result = interprete.parse(JSON.parse(body));
            if (typeof result == 'boolean' && result) {
                ssn.nombreUsuario = usuario;
                ssn.datos = { "usuario": usuario, "paquetesOut": loopEnviar, "paquetesIn": JSON.parse(body) };
                loopEnviar = `[+STRUC][+USER]` + usuario + `[-USER][-STRUC]`;
                data = JSON.stringify(loopEnviar);
                request.post({
                    headers: { 'content-type': 'application/json' },
                    url: urlIISServidor + 'api/struc',
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
                res.render('./index.ejs', {
                    errores: result,
                    luplogoutEnviado: data,
                    luplogoutRecibido: body,
                });
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
            usuario = ssn.nombreUsuario;
            var loopEnviar = `[+LOGOUT][+USER]` + usuario + `[-USER][-LOGOUT]`;
            data = JSON.stringify(loopEnviar);
            req.session.destroy(function (err) {
                if (err) {
                    console.log(err);
                } else {
                    request.post({
                        headers: { 'content-type': 'application/json' },
                        url: urlIISServidor + 'api/Logout',
                        body: data,
                        strictSSL: false
                    }, function (error, response, body) {
                        var result = interprete.parse(JSON.parse(body));
                        res.render('./index.ejs', {
                            luplogoutEnviado: data,
                            luplogoutRecibido: result,
                            errores: []
                        });
                    });
                }
            });
        } else {
            res.render('./index.ejs', {
                luplogoutEnviado: "",
                luplogoutRecibido: "",
                errores: []
            });
        }
    });

    app.get('/BeginnerMode', function (req, res) {
        ssn = req.session;
        if (ssn.datos) {
            res.render('./BeginnerMode.ejs', {
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
            res.render('./MiddleMode.ejs', {
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

    app.get('/AdvancedMode', function (req, res) {
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

    app.post('/Ejecutar', function (req, res) {
        ssn = req.session;
        if (ssn.datos) {
            loopEnviar = `[+QUERY][+USER]` + usuario + `[-USER][+DATA]` + req.body.data + `[-DATA][-QUERY]`;
            data = JSON.stringify(loopEnviar);
            request.post({
                headers: { 'content-type': 'application/json' },
                url: urlIISServidor + 'api/doQuery',
                body: data,
                strictSSL: false
            }, function (error, response, body) {
                console.log(body);
                var result = interprete.parse(JSON.parse(body));
                var listaMensajes = "";
                var listaErrores = [];
                var listaSelect = [];
                result.map(m => {
                    if (m.mensaje != undefined && m.mensaje != null) {
                        listaMensajes += m.mensaje + "\n";
                    } else if (m.error != undefined && m.error != null) {
                        //var er = m.error.fila + " " + m.error.columna + " " + m.error.tipo + " " + m.error.descripcion
                        //    + " " + m.error.fecha;
                        //listaErrores += er + "\n";
                        listaErrores.push(m.error);
                    } else if (m.data != undefined && m.data != null) {
                        listaSelect.push(m.data);
                    }
                });
                if (result) {
                    ssn.datos.paquetesOut += '\n' + loopEnviar;
                    ssn.datos.paquetesIn += '\n' + JSON.parse(body);
                    ssn.datos.mensajes = listaMensajes;
                    ssn.datos.errores = listaErrores;
                }
                loopEnviar = `[+STRUC][+USER]` + usuario + `[-USER][-STRUC]`;
                data = JSON.stringify(loopEnviar);
                request.post({
                    headers: { 'content-type': 'application/json' },
                    url: urlIISServidor + 'api/struc',
                    body: data,
                    strictSSL: false
                }, function (error, response, body) {
                    var result = interprete.parse(JSON.parse(body));
                    if (result) {
                        ssn.datos.paquetesOut += '\n' + loopEnviar;
                        ssn.datos.paquetesIn += '\n' + JSON.parse(body);
                        ssn.datos.struc = result;
                    }
                    res.status(202).json({
                        paquetesOut: ssn.datos.paquetesOut,
                        paquetesIn: ssn.datos.paquetesIn,
                        listaMensajes: ssn.datos.mensajes,
                        listaErrores: ssn.datos.errores,
                        struc: ssn.datos.struc,
                        selects: listaSelect
                    });
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