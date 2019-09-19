function login() {
    usuario = document.getElementById("nombreUsuario").value;
    pass = document.getElementById("password").value;
    var loopEnviar = `[+LOGIN][+USER]` + usuario + `[-USER][+PASS]` + pass + `[-PASS][-LOGIN]`;
    data = JSON.stringify(loopEnviar);
    $.ajax({
        type: "POST",
        data: { 'data': data },
        url: "/Login",
        success: function (data) {
            var result = LupGrammar.parse(data) ? true : false;
            if (result) {
                window.location = "./Views/Modos.html";
            }
        },
    });
}

var i = 0;
function ejecutar(getSelected=false) {
    var textoActual = !!areaActual ? (!!areaActual.getValue() ? areaActual.getValue() : 'log("NO HAY NADA PARA EJECUTAR");') : 'log("NO HAY NADA PARA EJECUTAR");';
    textoActual = getSelected ? (!!areaActual ? (!!areaActual.getSelection() ? areaActual.getSelection() : 'log("NO HAY NADA SELECCIONADO PARA EJECUTAR");') : 'log("NO HAY NADA PARA EJECUTAR");'):textoActual;
    $.ajax({
        type: "POST",
        data: { "data": textoActual },
        url: "/Ejecutar",
        success: function (data) {
            document.getElementById("consolaArea").value = data.listaMensajes + data.listaErrores;
            document.getElementById("paqueteAreaEnviado").value = data.paquetesOut;
            document.getElementById("paqueteAreaRecibido").value = data.paquetesIn;
            data.selects.map(m => {
                var node = document.createElement("button");
                var att = document.createAttribute("class");
                var att1 = document.createAttribute("onclick");
                var texto = document.createTextNode('query' + i);
                att.value = "tablinks";
                att1.value = "openTab(event, 'query" + i + "')";
                node.setAttributeNode(att);
                node.setAttributeNode(att1);
                node.appendChild(texto);
                document.getElementById("tab").appendChild(node);

                var nodeTabla = document.createElement("div");
                var att2 = document.createAttribute("id");
                var att3 = document.createAttribute("class");
                var att4 = document.createAttribute("style");
                att2.value = "query" + i;
                att3.value = "tabcontent";
                att4.value = "overflow=\"auto\";";
                nodeTabla.setAttributeNode(att2);
                nodeTabla.setAttributeNode(att3);
                nodeTabla.setAttributeNode(att4);
                nodeTabla.style.overflow = "auto";
                nodeTabla.innerHTML = m;
                document.getElementById("row_pestañas").appendChild(nodeTabla);
                i++;
            });
        },
    });
}