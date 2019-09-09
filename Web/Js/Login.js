function login() {
    usuario = document.getElementById("nombreUsuario").value;
    pass = document.getElementById("password").value;
    var loopEnviar = `[+LOGIN][+USER]` + usuario + `[-USER][+PASS]` + pass + `[-PASS][-LOGIN]`;
    data = JSON.stringify(loopEnviar);
    $.ajax({
        type: "POST",
        data: {'data' : data},
        url: "/Login",
        success: function (data) {
            var result = LupGrammar.parse(data) ? true : false;
            if(result){
                window.location = "./Views/Modos.html";
            }
        },
    });
}

function ejecutar(){
    console.log(editor.getValue());
    $.ajax({
        type: "POST",
        data: {"data":editor.getValue()},
        url: "/Ejecutar",
        success: function (data) {
            document.getElementById("consolaArea").value = data.listaMensajes + data.listaErrores;
            document.getElementById("paqueteAreaEnviado").value = data.paquetesOut;
            document.getElementById("paqueteAreaRecibido").value = data.paquetesIn;
        },
    });
}