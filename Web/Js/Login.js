function login() {
    usuario = document.getElementById("nombreUsuario").value;
    pass = document.getElementById("password").value;
    usuario = !!usuario ? usuario : "";
    pass = !!pass ? pass : "";
    var loopEnviar = `[+LOGIN][+USER]` + usuario + `[-USER][+PASS]` + pass + `[-PASS][-LOGIN]`;
    data = JSON.stringify(loopEnviar);
    console.log(data);
    $.ajax({
        type: "POST",
        data: { 'data': data },
        url: "/Login",
        success: function (data) {
            var result = LupGrammar.parse(data);
            console.log(result);
            if (typeof (result) == 'boolean') {
                if (result) {
                    window.location = "./Views/Modos.html";
                }
            }else{
                console.log(result);
            }
        },
    });
}

var indexTab = 0;
function ejecutar(getSelected = false) {
    var textoActual = !!areaActual ? (!!areaActual.getValue() ? areaActual.getValue() : 'log("NO HAY NADA PARA EJECUTAR");') : 'log("NO HAY NADA PARA EJECUTAR");';
    textoActual = getSelected ? (!!areaActual ? (!!areaActual.getSelection() ? areaActual.getSelection() : 'log("NO HAY NADA SELECCIONADO PARA EJECUTAR");') : 'log("NO HAY NADA PARA EJECUTAR");') : textoActual;
    $.ajax({
        type: "POST",
        data: { "data": textoActual },
        url: "/Ejecutar",
        success: function (data) {
            document.getElementById("consolaArea").value = data.listaMensajes;
            document.getElementById("paqueteAreaEnviado").value = data.paquetesOut;
            document.getElementById("paqueteAreaRecibido").value = data.paquetesIn;
            generarErrores(data.listaErrores);

            data.selects.map(m => {
                var node = document.createElement("button");
                var att = document.createAttribute("class");
                var att1 = document.createAttribute("onclick");
                var texto = document.createTextNode('query' + indexTab);
                att.value = "tablinks";
                att1.value = "openTab(event, 'query" + indexTab + "')";
                node.setAttributeNode(att);
                node.setAttributeNode(att1);
                node.appendChild(texto);
                document.getElementById("tab").appendChild(node);
                var nodeTabla = document.createElement("div");
                var att2 = document.createAttribute("id");
                var att3 = document.createAttribute("class");
                var att4 = document.createAttribute("style");
                att2.value = "query" + indexTab;
                att3.value = "tabcontent";
                att4.value = "overflow=\"auto\";";
                nodeTabla.setAttributeNode(att2);
                nodeTabla.setAttributeNode(att3);
                nodeTabla.setAttributeNode(att4);
                nodeTabla.style.overflow = "auto";
                nodeTabla.innerHTML = m;
                document.getElementById("row_pestañas").appendChild(nodeTabla);
                indexTab++;
            });
        },
    });
}

function generarErrores(errores) {
    var panel = document.getElementById("contenidoErrores");
    if (errores == undefined || errores == undefined || errores.length < 1) {
        var contenidoErr = document.getElementById("contenidoErrores")
        var btnErr = document.getElementById("botonErrores")
        if (!!contenidoErr && !!btnErr) {
            contenidoErr.remove();
            btnErr.remove();
        }
        return;
    } else if (panel != null) {
        var contenidoErr = document.getElementById("contenidoErrores")
        var btnErr = document.getElementById("botonErrores")
        if (!!contenidoErr && !!btnErr) {
            contenidoErr.remove();
            btnErr.remove();
        }
    }
    var contador = 0;
    var htmlGen = "<table class=\"table table-striped table-dark\" style=\"height: 100%;\"> ";
    var filas = "";
    var encabezado = "<tr>";
    encabezado += "<th scope=\"col\">#</th>";
    encabezado += "<th scope=\"col\">fila</th>";
    encabezado += "<th scope=\"col\">columna</th>";
    encabezado += "<th scope=\"col\">Tipo</th>";
    encabezado += "<th scope=\"col\">Descripcion</th>";
    encabezado += "<th scope=\"col\">Fecha</th>";
    encabezado += "</tr>";
    errores.map(m => {
        filas += "<tr>";
        filas += "<td scope=\"row\">" + contador + "</td>";
        filas += "<td scope=\"row\">" + m.fila + "</td>";
        filas += "<td scope=\"row\">" + m.columna + "</td>";
        filas += "<td scope=\"row\">" + m.tipo + "</td>";
        filas += "<td scope=\"row\">" + m.descripcion + "</td>";
        filas += "<td scope=\"row\">" + m.fecha + "</td>";
        filas += "</tr>";
        contador++;
    });
    htmlGen += encabezado + filas;
    htmlGen += "</table>";

    var node = document.createElement("button");
    var att = document.createAttribute("class");
    var att1 = document.createAttribute("onclick");
    var texto = document.createTextNode('errores');
    var attId = document.createAttribute("id");
    att.value = "tablinks";
    att1.value = "openTab(event, 'contenidoErrores')";
    attId.value = "botonErrores";
    node.setAttributeNode(att);
    node.setAttributeNode(att1);
    node.setAttributeNode(attId);
    node.appendChild(texto);
    document.getElementById("tab").appendChild(node);

    var nodeTabla = document.createElement("div");
    var att2 = document.createAttribute("id");
    var att3 = document.createAttribute("class");
    var att4 = document.createAttribute("style");
    att2.value = "contenidoErrores";
    att3.value = "tabcontent";
    att4.value = "overflow=\"auto\";";
    nodeTabla.setAttributeNode(att2);
    nodeTabla.setAttributeNode(att3);
    nodeTabla.setAttributeNode(att4);
    nodeTabla.style.overflow = "auto";
    nodeTabla.innerHTML = htmlGen;
    document.getElementById("row_pestañas").appendChild(nodeTabla);
}