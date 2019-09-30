
Blockly.JavaScript['select'] = function (block) {
  var statements_select = Blockly.JavaScript.statementToCode(block, 'Select');
  var text_table = block.getFieldValue('Table');
  var value_where = Blockly.JavaScript.valueToCode(block, 'Where', Blockly.JavaScript.ORDER_ATOMIC);
  var value_limit = Blockly.JavaScript.valueToCode(block, 'Limit', Blockly.JavaScript.ORDER_ATOMIC);
  var text_order = block.getFieldValue('Order');
  value_where = !!value_where ? value_where : true;
  value_limit = !!value_limit ? '\nlimit ' + value_limit : '';
  text_order = !!text_order ? '\norder by ' + text_order : '';
  statements_select = statements_select.substring(0, statements_select.length - 1);
  var code = 'select ' + statements_select +
    '\nfrom ' + text_table +
    '\nwhere ' + value_where +
    value_limit + text_order + ';\n';
  return code;
};

Blockly.JavaScript['delete'] = function (block) {
  var text_from = block.getFieldValue('From');
  var value_where = Blockly.JavaScript.valueToCode(block, 'Where', Blockly.JavaScript.ORDER_ATOMIC);
  value_where = !!value_where ? value_where : true;
  var code = 'delete\nfrom ' + text_from + '\nWhere' + value_where + ';\n';
  return code;
};

Blockly.JavaScript['specialdelete'] = function (block) {
  var text_delete = block.getFieldValue('Delete');
  var text_from = block.getFieldValue('From');
  var value_where = Blockly.JavaScript.valueToCode(block, 'Where', Blockly.JavaScript.ORDER_ATOMIC);
  value_where = !!value_where ? value_where : true;
  var code = 'Delete ' + text_delete + '\nFrom ' + text_from + '\nWhere ' + value_where + ';\n';
  return code;
};

Blockly.JavaScript['update'] = function (block) {
  var statements_update = Blockly.JavaScript.statementToCode(block, 'Update');
  var statements_set = Blockly.JavaScript.statementToCode(block, 'Set');
  //var text_from = block.getFieldValue('From');
  var value_where = Blockly.JavaScript.valueToCode(block, 'Where', Blockly.JavaScript.ORDER_ATOMIC);
  value_where = !!value_where ? value_where : true;
  var a;
  a = statements_set.split(';');
  a.pop();

  //statements_update = statements_update.substring(0, statements_update.length - 1);
  var code = 'Update' + statements_update + '\nSet' + a.join(',') + '\nWhere ' + value_where + ';\n';
  return code;
};

Blockly.JavaScript['insert'] = function (block) {
  var value_insert = Blockly.JavaScript.valueToCode(block, 'Insert', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_values = Blockly.JavaScript.statementToCode(block, 'Values');
  //value_insert = value_insert.substring(1, value_insert.length - 1);
  //statements_values = statements_values.substring(0, statements_values.length - 1);
  var code = 'insert into ' + value_insert + '\nvalues (' + statements_values + ');\n';
  return code;
};

Blockly.JavaScript['insertspecial'] = function (block) {
  var value_insertspecial = Blockly.JavaScript.valueToCode(block, 'InsertSpecial', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_campos = Blockly.JavaScript.statementToCode(block, 'Campos');
  var statements_values = Blockly.JavaScript.statementToCode(block, 'Values');

  //value_insertspecial = value_insertspecial.substring(1, value_insertspecial.length - 1);
  //statements_campos = statements_campos.substring(0, statements_campos.length - 1);
  //statements_values = statements_values.substring(0, statements_values.length - 1);
  var code = 'insert into \n' + value_insertspecial + ' (' + statements_campos + ')' + '\nvalues (' + statements_values + ');\n';
  return code;
};

Blockly.JavaScript['all'] = function (block) {
  // TODO: Assemble JavaScript into code variable.
  var code = ' * ';
  return code;
};

Blockly.JavaScript['where'] = function (block) {
  var value_where = Blockly.JavaScript.valueToCode(block, 'Where', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'where ' + value_where + '\n';
  return code;
};
Blockly.JavaScript['expresion'] = function (block) {
  var text_name = block.getFieldValue('NAME');
  // TODO: Assemble JavaScript into code variable.
  var code = text_name;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['campo'] = function (block) {
  console.log(block);
  var value_campo = Blockly.JavaScript.valueToCode(block, 'campo', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_campo;

  if (block.parentBlock_ != null && block.parentBlock_.type == 'campo') {
    code = ',' + code;
  }
  return code;
};

Blockly.JavaScript['campo_tabla'] = function (block) {
  var text_campo = block.getFieldValue('Campo');
  // TODO: Assemble JavaScript into code variable.
  var code = text_campo + ',';
  return code;
};

Blockly.JavaScript['use'] = function (block) {
  var text_use = block.getFieldValue('Use');
  var code = 'use ' + text_use + ';\n';
  return code;
};

Blockly.JavaScript['tipo'] = function (block) {
  var dropdown_name = block.getFieldValue('NAME');
  var value_tipo = Blockly.JavaScript.valueToCode(block, 'Tipo', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = dropdown_name + ' ' + value_tipo + ';\n';
  return code;
};

Blockly.JavaScript['dowhile'] = function (block) {
  var statements_do = Blockly.JavaScript.statementToCode(block, 'Do');
  var value_while = Blockly.JavaScript.valueToCode(block, 'While', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  value_while = !!value_while ? value_while : true;
  var code = 'do{\n' + statements_do + '\n}while(' + value_while + ');\n';
  return code;
};

Blockly.JavaScript['llamada'] = function (block) {
  var text_nombre = block.getFieldValue('nombre');
  var statements_parametros = Blockly.JavaScript.statementToCode(block, 'Parametros');
  // TODO: Assemble JavaScript into code variable.
  //statements_parametros = statements_parametros.substring(0, statements_parametros.length - 1);
  var code = text_nombre + '(' + statements_parametros + ')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['substring'] = function (block) {
  var text_inicio = block.getFieldValue('inicio');
  var text_fin = block.getFieldValue('fin');
  var value_substring = Blockly.JavaScript.valueToCode(block, 'substring', Blockly.JavaScript.ORDER_ATOMIC);

  var code = value_substring + '.substring(' + text_inicio + ', ' + text_fin + ')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['with'] = function (block) {
  var dropdown_tipo = block.getFieldValue('tipo');
  var text_name = block.getFieldValue('NAME');
  var value_with = Blockly.JavaScript.valueToCode(block, 'with', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_with + '.' + dropdown_tipo + '("' + text_name + '")';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['call'] = function (block) {
  var value_call = Blockly.JavaScript.valueToCode(block, 'call', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  //value_call = value_call.substring(1, value_call.length - 1);
  var code = 'call ' + value_call + ';\n';
  return code;
};

Blockly.JavaScript['example_date'] = function (block) {
  var text_name = block.getFieldValue('FIELDNAME');
  // TODO: Assemble JavaScript into code variable.
  var code = "'" + text_name + "'";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['time'] = function (block) {
  var dropdown_hora = block.getFieldValue('hora');
  var dropdown_minuto = block.getFieldValue('minuto');
  var dropdown_segundo = block.getFieldValue('segundo');
  // TODO: Assemble JavaScript into code variable.
  var code = "'" + dropdown_hora + ':' + dropdown_minuto + ':' + dropdown_segundo + "'";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};