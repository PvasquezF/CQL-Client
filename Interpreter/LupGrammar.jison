/* lexical grammar */
%lex
%s mensaje descripcion fecha data
identificador   [a-zA-Z_][a-zA-Z0-9_]*
dataRegex       \\[\\+DATA\\](.|\s)*\\[-DATA\\]
passwordRegex   \\[\\+PASS\\](.|\s)*\\[-PASS\\]
descRegex      \\[\\+DESC\\](.|\s)*\\[-DESC\\]
dateRegex      \\[\\+DATE\\](.|\s)*\\[-DATE\\]
entero [0-9]+
%%
<INITIAL>\s+                   /* skip whitespace */
<INITIAL>{identificador}         return 'Identificador'
<INITIAL>{dataRegex}             return 'DataRegex'
<INITIAL>{passwordRegex}         return 'PasswordRegex'
<INITIAL>{descRegex}             return 'DescRegex'
<INITIAL>{dateRegex}             return 'DateRegex'
<INITIAL>{entero}                return 'ENTERO'
'[+LOGIN]'              return 'loginA'
'[-LOGIN]'              return 'loginC'
'[+LOGOUT]'             return 'logoutA'
'[-LOGOUT]'             return 'logoutC'
'[SUCCESS]'             return 'success'
'[FAIL]'                return 'fail'
'[+DATABASES]'          return 'databasesA'
'[-DATABASES]'          return 'databasesC'
'[+DATABASE]'           return 'databaseA'
'[-DATABASE]'           return 'databaseC'
'[+NAME]'               return 'nameA'
'[-NAME]'               return 'nameC'
'[+TABLES]'             return 'tablesA'
'[-TABLES]'             return 'tablesC'
'[+TABLE]'              return 'tableA'
'[-TABLE]'              return 'tableC'
'[+COLUMNS]'            return 'columnsA'
'[-COLUMNS]'            return 'columnsC' 
'[+COLUMN]'             return 'columnA'
'[-COLUMN]'             return 'columnC' 
'[-COLUMNS]'            return 'columnsC' 
'[+ATTRIBUTE]'          return 'attributeA'
'[-ATTRIBUTE]'          return 'attributeC' 
'[+TYPE]'               return 'typeA'
'[-TYPE]'               return 'typeC'
'[+TYPES]'              return 'typesA'
'[-TYPES]'              return 'typesC'
'[+ATTRIBUTES]'         return 'attributesA'
'[-ATTRIBUTES]'         return 'attributesC'
'[+PROCEDURES]'         return 'proceduresA'
'[-PROCEDURES]'         return 'proceduresC'
'[+PROCEDURE]'          return 'procedureA'
'[-PROCEDURE]'          return 'procedureC'
'[+LINE]'               return 'lineA'
'[-LINE]'               return 'lineC'
'[+ERROR]'              return 'errorA'
'[-ERROR]'              return 'errorC'

'[+MESSAGE]'            {this.begin("mensaje"); return "mensajeA";}
<mensaje>'[-MESSAGE]'   {this.begin("INITIAL"); return "mensajeC";}
<mensaje>.              return 'data';
<mensaje>\s             return 'data';

'[+DESC]'               {this.begin("descripcion"); return "descripcionA";}
<descripcion>'[-DESC]'  {this.begin("INITIAL"); return "descripcionC";}
<descripcion>.          return 'data';
<descripcion>\s         return 'data';

'[+DATE]'               {this.begin("fecha"); return "dateA";}
<fecha>'[-DATE]'        {this.begin("INITIAL"); return "dateC";}
<fecha>.                return 'data';
<fecha>\s               return 'data';

'[+DATA]'               {this.begin("data"); return "dataA";}
<data>'[-DATA]'         {this.begin("INITIAL"); return "dataC";}
<data>.                 return 'data';
<data>\s                return 'data';
<<EOF>>                 return 'EOF'
.                       return 'INVALID'

/lex

%start INICIO

%% /* language grammar */

INICIO : PAQUETES EOF {return $1;}
        | QUERYS EOF {return $1;}
        ;

QUERYS : QUERYS QUERY {$$ = $1; $$.push($2);}
       | QUERY {$$ = [$1];}
       ;

PAQUETES : PAQUETELOGIN{$$ = $1;}
        |  PAQUETELOGOUT{$$ = $1;}
        |  PAQUETESTRUC{$$ = $1;}
        ;

QUERY   : PAQUETEMESSAGE{$$ = {"mensaje":$1};}
        | PAQUETEERROR{$$ = {"error":$1};}
        | PAQUETEDATA{$$ = {"data":$1};}
        ;

PAQUETEDATA : dataA CUERPOMENSAJE dataC {$$ = $2;}
            ;

PAQUETELOGIN : loginA RESULTLOGIN loginC {$$ = $2;}
             ;

RESULTLOGIN : success {$$ = true;}
            | fail {$$ = false;}
            ;

PAQUETELOGOUT : logoutA RESULTLOGIN logoutC {$$ = $1 + $2 + $3;}
              ;

LISTAERRORES : PAQUETEERROR {$$ = [$1];}
             ;

LISTAMENSAJES : PAQUETEMESSAGE {$$ = [$1];}
              ;

PAQUETEMESSAGE : mensajeA CUERPOMENSAJE mensajeC {$$ = $2;}
               ;
               
CUERPOMENSAJE : CUERPOMENSAJE data {$$ = $1 + $2;}
              | data {$$ = $1;}
              ;

PAQUETEERROR : errorA FILA COLUMNA TIPO DESCRIPCION FECHA errorC {$$ = {"fila": $2, "columna": $3, "tipo": $4, "descripcion": $5, "fecha": $6};}
             ;

FILA : lineA ENTERO lineC {$$ = $2;}
     ;

DESCRIPCION : descripcionA CUERPOMENSAJE descripcionC {$$ = $2;}
            ;

FECHA : dateA CUERPOMENSAJE dateC {$$ = $2;}
      ;

PAQUETESTRUC : databasesA LISTABASES databasesC {$$ = $2;}
             | databasesA databasesC {$$ = [];}
             ;

LISTABASES : LISTABASES BASE {$$ = $1; $$.push($2);}
           | BASE {$$ = [$1];}
           ;

BASE : databaseA NOMBRE TABLAS TIPOS PROCEDURES databaseC
        {$$ = {base: {nombre: $2, tablas: $3, tipos: $4, procedures: $5}};}
     ;

NOMBRE : nameA Identificador nameC {$$ = $2;}
       ;

TABLAS : tablesA LISTATABLAS tablesC {$$ = $2;}
       | tablesA tablesC {$$ = [];}
       ;

LISTATABLAS : LISTATABLAS TABLA {$$ = $1; $$.push($2);}
            | TABLA {$$ = [$1];}
            ;

TABLA : tableA NOMBRE COLUMNAS tableC {$$ = {tabla: {nombre: $2, columnas: $3}};}
      | tableA tableC {$$ = [];}
      | tableA NOMBRE tableC {$$ = {tabla: {nombre: $2, columnas: []}};}
      ;

COLUMNAS : columnsA LISTACOLUMNAS columnsC {$$ = $2;}
         ;

LISTACOLUMNAS : LISTACOLUMNAS COLUMNA {$$ = $1; $$.push($2);}
              | COLUMNA {$$ = [$1];}
              ;

COLUMNA : columnA Identificador columnC {$$ = $2;}
        | columnA ENTERO columnC {$$ = $2;}
        ;

TIPOS : typesA LISTATIPOS typesC {$$ = $2;}
      | typesA typesC {$$ = [];}
      ;

LISTATIPOS : LISTATIPOS TIPO {$$ = $1; $$.push($2);}
           | TIPO {$$ = [$1];}
           ;

TIPO : typeA NOMBRE ATRIBUTOS typeC {$$ = {tipo : { nombre: $2, atributos: $3}};}
     | typeA Identificador typeC {$$ = $2;}
     ;

ATRIBUTOS: attributesA LISTAATRIBUTOS attributesC {$$ = $2;}
         | attributesA attributesC {$$ = [];}
         ;

LISTAATRIBUTOS : LISTAATRIBUTOS ATRIBUTO {$$ = $1; $$.push($2);}
                | ATRIBUTO {$$ = [$1];}
                ;

ATRIBUTO : attributeA Identificador attributeC {$$ = $2;}
     ;

PROCEDURES : proceduresA LISTAPROCEDURES proceduresC {$$ = {procedimientos: $2};}
           | proceduresA proceduresC {$$ = [];}
           ;

LISTAPROCEDURES : LISTAPROCEDURES PROC {$$ = $1; $$.push($2);}
                | PROC {$$ = [$1];}
                ;

PROC : procedureA Identificador procedureC {$$ = $2;}
     ;