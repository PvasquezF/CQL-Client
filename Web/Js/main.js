var toggler = document.getElementsByClassName("caret");
var i;
var areaActual;
var botonActual;
var tabNameActual;
for (i = 0; i < toggler.length; i++) {
  toggler[i].addEventListener("click", function () {
    this.parentElement.querySelector(".nested").classList.toggle("active");
    this.classList.toggle("caret-down");
  });
}

function openTab(evt, tabname) {
  var i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(tabname).style.display = "block";
  evt.currentTarget.className += " active";
}

function openTabEditor(evt, tabname, editorActual, first, objActual) {
  var i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tabEditor");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(tabname).style.display = "block";
  evt.currentTarget.className += " active";
  if (first) {
    //editorActual.setValue(editorActual.getValue());
    setTimeout(function () {
      editorActual.refresh();
    }, 1);
    first = false;
  }
  areaActual = editorActual;
  botonActual = evt.currentTarget;
  tabNameActual = tabname;
}

function closeTab() {
  if (!!botonActual) {
    botonActual.style.display = "none"
    document.getElementById(tabNameActual).style.display = "none";
  }
}
var k = 1;
function agregarPestañaEditor(valorinicial = "") {
  var name = prompt('Nombre de la pestaña');
  if (name != null && name != undefined) {

    var node = document.createElement("button");
    var att = document.createAttribute("class");
    var att1 = document.createAttribute("onclick");
    var texto = document.createTextNode(name);
    att.value = "tablinks";
    att1.value = "openTabEditor(event, '" + name + "', editor" + k + ", true)";
    node.setAttributeNode(att);
    node.setAttributeNode(att1);
    node.appendChild(texto);
    document.getElementById("tabsEditor").appendChild(node);

    var nodeTabla = document.createElement("div");
    var nodeArea = document.createElement("textarea");
    var att2 = document.createAttribute("id");
    var att3 = document.createAttribute("class");
    var att4 = document.createAttribute("style");
    var attIdArea = document.createAttribute("id");
    var attNameArea = document.createAttribute("name");
    att2.value = name;
    att3.value = "tabEditor";
    //att4.value = "overflow=\"auto\";";
    nodeTabla.setAttributeNode(att2);
    nodeTabla.setAttributeNode(att3);
    //nodeTabla.setAttributeNode(att4);
    //nodeTabla.style.overflow = "auto";
    //nodeTabla.innerHTML = "<textarea id='editor" + k + "' name='editor" + k + "'></textarea>";
    attIdArea.value = "editor" + k;
    attNameArea.value = "editor" + k;
    nodeArea.setAttributeNode(attIdArea);
    nodeArea.setAttributeNode(attNameArea);
    nodeTabla.appendChild(nodeArea);
    document.getElementById("pestañasEditor").appendChild(nodeTabla);
    window["editor" + k]
    window["editor" + k] = CodeMirror.fromTextArea(nodeArea, {
      lineNumbers: true,
      mode: "sql",
      mode: "javascript",
      theme: "dracula"
    });
    window["editor" + k].setSize(null, 267);
    window["editor" + k].setValue(valorinicial);
    k++;
  }
}

function abrirArchivo() {
  document.getElementById("archivo").click();
}

function enviarArchivo() {
  var formData = new FormData(document.getElementById("formuploadajax"));
  formData.append("dato", "valor");
  $.ajax({
    url: "/AdvancedMode",
    type: "post",
    dataType: "html",
    data: formData,
    cache: false,
    contentType: false,
    processData: false
  })
    .done(function (res) {
      res = JSON.parse(res);
      agregarPestañaEditor(res.archivo);
    });
}

function guardarArchivo() {
  if (!!areaActual && !!areaActual.getValue() && !!tabNameActual) {
    var entrada = areaActual.getValue();
    var blob = new Blob([entrada], { type: "text/plain;charset=utf-8" });
    saveAs(blob, tabNameActual + '.txt');
  }
}

function volver() {
  window.location.replace("http://localhost:3000/Modos");
}
