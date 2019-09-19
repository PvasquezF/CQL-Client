//---------------------------SENTENCIAS
Blockly.Blocks['select'] = {
  init: function() {
    this.appendStatementInput("Select")
        .setCheck(null)
        .appendField("Select");
    this.appendDummyInput()
        .appendField("From")
        .appendField(new Blockly.FieldTextInput("Table"), "Table");
    this.appendValueInput("Where")
        .setCheck(null)
        .appendField("Where");
    this.appendValueInput("Limit")
        .setCheck(null)
        .appendField("Limit");
    this.appendDummyInput()
        .appendField("Order")
        .appendField(new Blockly.FieldTextInput(""), "Order");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['update'] = {
  init: function () {
    this.appendStatementInput("Update")
      .setCheck(null)
      .appendField("Update");
    this.appendStatementInput("Set")
      .setCheck(null)
      .appendField("Set");
    this.appendDummyInput()
      .appendField("From")
      .appendField(new Blockly.FieldTextInput("default"), "From");
    this.appendValueInput("Where")
      .setCheck("Boolean")
      .appendField("Where");
    this.setColour(315);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['insert'] = {
  init: function () {
    this.appendValueInput("Insert")
      .setCheck(null)
      .appendField("Insert Into");
    this.appendStatementInput("Values")
      .setCheck(null)
      .appendField("Values");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['insertspecial'] = {
  init: function () {
    this.appendValueInput("InsertSpecial")
      .setCheck(null)
      .appendField("Special Insert Into");
    this.appendStatementInput("Campos")
      .setCheck(null)
      .appendField("Campos");
    this.appendStatementInput("Values")
      .setCheck(null)
      .appendField("Values");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['where'] = {
  init: function () {
    this.appendValueInput("Where")
      .setCheck(null)
      .appendField("Where");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
    this.setTooltip("Returns number of letters in the provided text.");
    this.setHelpUrl("http://www.w3schools.com/jsref/jsref_length_string.asp");
  }
};

Blockly.Blocks['delete'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Delete From")
      .appendField(new Blockly.FieldTextInput("default"), "From");
    this.appendValueInput("Where")
      .setCheck("Boolean")
      .appendField("Where");
    this.setColour(315);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['specialdelete'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Delete")
      .appendField(new Blockly.FieldTextInput("default"), "Delete");
    this.appendDummyInput()
      .appendField("From")
      .appendField(new Blockly.FieldTextInput("default"), "From");
    this.appendValueInput("Where")
      .setCheck("Boolean")
      .appendField("Where");
    this.setColour(315);

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['use'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Use")
      .appendField(new Blockly.FieldTextInput("Table"), "Use");
    this.setColour(120);

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
//--------------------FIN------SENTENCIAS

//---------------------------ATRIBUTOS
Blockly.Blocks['campo'] = {
  init: function () {
    this.appendValueInput("campo")
      .setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip("Returns number of letters in the provided text.");
    this.setHelpUrl("http://www.w3schools.com/jsref/jsref_length_string.asp");
  }
};

Blockly.Blocks['all'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Todo *");
    this.setPreviousStatement(true, null);
    this.setColour(120);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['campo_tabla'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput("Campo_Tabla"), "Campo");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip("");
    this.setHelpUrl("");
  }
}
//--------------------FIN------ATRIBUTOS

//---------------------------Ciclos
Blockly.Blocks['dowhile'] = {
  init: function () {
    this.appendStatementInput("Do")
      .setCheck(null)
      .appendField("Do");
    this.appendValueInput("While")
      .setCheck(null)
      .appendField("While");
    this.setNextStatement(true, null);
    this.setColour(0);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
//--------------------FIN------ciclos

//---------------------------funciones
Blockly.Blocks['llamada'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Llamada")
      .appendField(new Blockly.FieldTextInput("nombre"), "nombre");
    this.appendStatementInput("Parametros")
      .setCheck(null)
      .appendField("Parametros");
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['call'] = {
  init: function () {
    this.appendValueInput("call")
      .setCheck(null)
      .appendField("call");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['substring'] = {
  init: function () {
    this.appendValueInput("substring")
      .setCheck(null)
      .appendField("substring")
      .appendField(new Blockly.FieldTextInput("inicio"), "inicio")
      .appendField(new Blockly.FieldTextInput("fin"), "fin");
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['with'] = {
  init: function () {
    this.appendValueInput("with")
      .setCheck(null)
      .appendField(new Blockly.FieldDropdown([["startswith", "startswith"], ["endswith", "endswith"]]), "tipo")
      .appendField("string")
      .appendField(new Blockly.FieldTextInput("default"), "NAME");
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
//--------------------FIN------funciones
//---------------------------funciones

//--------------------FIN------funciones

//---------------------------VALORES
Blockly.Blocks['expresion'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput("expresion"), "NAME");
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['example_date'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('date:')
      .appendField(new Blockly.FieldDate('2020-02-20'), 'FIELDNAME');
    this.setOutput(true, null);
  }
};

Blockly.Blocks['time'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("time:")
        .appendField(new Blockly.FieldDropdown([["00","00"],["01","01"],["02","02"],["03","03"],["10","10"],["11","11"],["12","12"],["13","13"],["20","20"],["21","21"],["22","22"],["23","23"]]), "hora")
        .appendField(new Blockly.FieldDropdown([["00","00"],["01","01"],["02","02"],["03","03"],["04","04"],["05","05"],["06","06"],["07","07"],["08","08"],["09","09"],["10","10"],["11","11"],["12","12"],["13","13"],["14","14"],["15","15"],["16","16"],["17","17"],["18","18"],["19","19"],["20","20"],["21","21"],["22","22"],["23","23"],["24","24"],["25","25"],["26","26"],["27","27"],["28","28"],["29","29"],["30","30"],["31","31"],["32","32"],["33","33"],["34","34"],["35","35"],["36","36"],["37","37"],["38","38"],["39","39"],["40","40"],["41","41"],["42","42"],["43","43"],["44","44"],["45","45"],["46","46"],["47","47"],["48","48"],["49","49"],["50","50"],["51","51"],["52","52"],["53","53"],["54","54"],["55","55"],["56","56"],["57","57"],["58","58"],["59","59"]]), "minuto")
        .appendField(new Blockly.FieldDropdown([["00","00"],["01","01"],["02","02"],["03","03"],["04","04"],["05","05"],["06","06"],["07","07"],["08","08"],["09","09"],["10","10"],["11","11"],["12","12"],["13","13"],["14","14"],["15","15"],["16","16"],["17","17"],["18","18"],["19","19"],["20","20"],["21","21"],["22","22"],["23","23"],["24","24"],["25","25"],["26","26"],["27","27"],["28","28"],["29","29"],["30","30"],["31","31"],["32","32"],["33","33"],["34","34"],["35","35"],["36","36"],["37","37"],["38","38"],["39","39"],["40","40"],["41","41"],["42","42"],["43","43"],["44","44"],["45","45"],["46","46"],["47","47"],["48","48"],["49","49"],["50","50"],["51","51"],["52","52"],["53","53"],["54","54"],["55","55"],["56","56"],["57","57"],["58","58"],["59","59"]]), "segundo");
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
//--------------------FIN------VALORES

//-----------------------------VARIABLES
Blockly.Blocks['tipo'] = {
  init: function () {
    this.appendValueInput("Tipo")
      .setCheck(null)
      .appendField("Tipo")
      .appendField(new Blockly.FieldDropdown([["string", "string"], ["int", "int"], ["double", "double"], ["boolean", "boolean"], ["date", "date"], ["time", "time"]]), "NAME");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

//--------------------FIN------VARIABLES
