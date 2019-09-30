int @id_1;
string @____id2_3232_;
boolean @id3_;
date @id4;
time @i_d5;
double @IdCaSe;

// comentario 1
/**
* comentario multilinea
*/

log("**************************Valores predeterminados******************************");
log("int: " +@id_1);
log("string: " +@____id2_3232_);
log("boolean: " +@id3_);
log("date: " +@id4);
log("time: " +@i_d5);
log("double: " +@idcase);

log("==========================FIN PREDETERMINADOS==================================");

log("**************************CASTEOS******************************");
log("int: " +(INT)"329");
log("string: " +(string)32);
log("boolean: " +false);
log("date: " +(date)"2006-06-06");
log("time: " +(time)((string)now()));
log("double: " +((double)"3,4")*5.4);

log("==========================FIN CASTEOS==================================");

log("**************************SECUENCIAS DE ESCAPE******************************");
@____id2_3232_ = "hola \'mundo\'";
log("Secuencia comilla simple(\')" +@____id2_3232_);

@____id2_3232_ = "hola \"mundo\"";
log("Secuencia comilla doble(\")" +@____id2_3232_);

@____id2_3232_ = "hola \?mundo\?";
log("Secuencia signo interrogacion(\?)" +@____id2_3232_);

@____id2_3232_ = "hola \nmundo";
log("Secuencia nueva linea(\\n)" +@____id2_3232_);

@____id2_3232_ = "hola \\mundo\\";
log("Secuencia barra invertida(\\)" +@____id2_3232_);

@____id2_3232_ = "hola \rmundo";
log("Secuencia retorno de carro(\r)" +@____id2_3232_);

@____id2_3232_ = "hola \tmundo";
log("Secuencia tabulacion(\t)" +@____id2_3232_);
log("==========================FIN SECUENCIAS DE ESCAPE==================================");

log("**************************USER TYPES******************************");
try{
  try{
    insert into nada values(1); 
    log("****************no capturo TableDontExists");
  }catch(TableDontExists @a){
      log(@a.message);
  }  
  log("****************no capturo UseBDException");
}catch(UseBDException @e){
	log(@e.message);
}

use testing;
map @letras = {
    1: "a", 2: "b", 3: "c", 4: "d", 5: "e", 6: "f", 7: "g", 8: "h", 9: "i", 10: "j", 11: "k", 12: "l", 13: "m", 14: "n", 15: "ñ", 16: "o", 17: "p",
        18: "q", 19: "r", 20: "s", 21: "t", 22: "u", 23: "v", 24: "w", 25: "x", 26: "y", 27: "z"
};
log(@letras.size());

create type IF NOT EXISTS persona(
    nombre string,
        nombre2 string,
            apellido string,
                carnet int,
                    edad int,
                        masculino boolean,
                            femenino boolean,
                                altura double,
                                    peso double,
                                        hijos list < persona >,
                                            palabrasConLetra map < string, list < string >>,
                                                agenda map < date, map < time, string >>,
                                                    fechasimportantes set<date>
);
create type gato(
	nombre string,
    edad int
);
persona @people = new persona;
persona @per = {
    "pavel",
        "alexander",
        "vasquez",
        201503611,
        23,
        true,
        false,
        1.70,
        62.4,
        new list < string >,
        { "a": ["arbol", "arzuIsAlive", "Alma", "Alv"] },
        [today(): {
            '07:00:00': "Despertar",
            '07:30:00': "Desayunar",
            '08:30:00': "Encender la compu",
            '09:30:00': "Perder tiempo",
            '10:30:00': "hacer compi",
            '10:32:00': "Ver instagram",
            '10:45:00': "Ver Facebook",
            '11:00:00': "Seguir compi",
            '11:06:00': "Responder whatsapp",
            '11:42:00': "Ver instagram",
            '11:50:00': "clash 1 partida",
            '12:30:00': "Seguir compi",
            '13:02:00': "Almorzar",
            '15:02:00': "Ver netflix",
            '17:32:00': "Ver instagram",
            '17:45:00': "Ver Facebook",
            '18:02:00': "Seguir compi",
            '18:20:00': "Recordar hacer analisis",
            '19:20:00': "Hacer commit",
            '19:30:00': "Cenar",
            '21:30:00': "Hacer compi",
            '21:32:00': "Ver instagram",
            '21:45:00': "Ver Facebook",
            '22:06:00': "Responder whatsapp",
            '23:06:00': "Guardar todo y dormir"
        }],
        { today(), '2001-09-09', '1996-06-27', '1997-01-07', '1995-10-19', today(), today(), today(), today() }
} as persona;
map @listaDia = @per.agenda.get(today());
log("**********************imprimiendo actividades*********************");
int @indexActivity;
for (int @i; @i < 24; @i++) {
    for (int @j; @j < 60; @j++) {
        for (int @k; @k < 60; @k++) {
            string @hora = @i+":" +@j+":" +@k;
            string @actividad = @listadia.get((time)@hora);
            if (@actividad != null) {
                log(@indexActivity++ + " - " +@actividad+" __ " + (time)@hora);
            }
        }
    }
}
log("cantidad de actividades: " + @listadiA.size());

log("*********************imprimiendo hijos: ");
if (@per.hijos.size() > 0) {
    for (int @i = 0; @i < @per.hijos.size(); @i = @i + 1) {
        log(@i+": " +@per.hijos.get(@i));
    }
}else {
    log("no tiene hijos");
}

log("*********************imprimiendo palabras: ");
if (@per.palabrasConLetra.size() > 0) {
    for (int @i= 0; @i < @letras.size(); @i = @i + 1) {
        if (@letras.get(@i) != null) {
            if ( @per.palabrasConLetra.get(@letras.get(@i)) != null) {
            log(@letras.get(@i));
                for (int @j = 0; @j < @per.palabrasConLetra.get(@letras.get(@i)).size(); @j += 1) {
                    log(@j+": " +@per.palabrasConLetra.get(@letras.get(@i)).get(@j));
                }
            }
        }
    }
}else {
    log("no tiene letras");
}

log("*********************imprimiendo fechas: ");
if (@per.fechasimportantes.size() > 0) {
    for (int @i = 0; @i < @per.fechasimportantes.size(); @i = @i + 1) {
        log(@i+": " +@per.fechasimportantes.get(@i));
    }
}else {
    log("no tiene fechas");
}
commit;
rollback;
commit;
rollback;
commit;
rollback;
@people = new persona;
@people.nombre = "Daniela";
log(@people.nombre);
log("==========================FIN USER TYPES==================================");

create database _baseFinal;
create database IF NOT EXISTS _baseFinal;

create database _baseFinalQueEliminar;
create database IF NOT EXISTS _baseFinalQueEliminar;
try{
	create database _baseFinal;
    log("NO CAPTURO LA EXCEPCION BDAlreadyExists");
}caTCH(BDAlreadyExists @e){
	log(@e.message);
}
use _basefinal;

drop database _baseFinalQueEliminar;
try{
	drop database _baseFinalQueEliminar;
    log("NO CAPTURO LA EXCEPCION BDDontExists");
}caTCH(BDDontExists @e){
	log(@e.message);
}


CREATE TABLE humano(
	idHumano counter primary key,
    nombre string,
    cat gato
);

CREATE TABLE mascota(
	carnet int,
    edad int,
    años int,
    primary key (carnet, edad, años)
);

CREATE TABLE IF NOT EXISTS mascota(
	carnet int,
    edad int,
    años int,
    primary key (carnet, edad, años)
);

CREATE TABLE aEliminar(
	carnet int,
    edad int,
    años int,
    primary key (carnet, edad, años)
);


try{
	CREATE TABLE mascota(
	carnet int,
    edad int,
    años int,
    primary key (carnet, edad, años)
);
    log("NO CAPTURO LA EXCEPCION TableAlreadyExists");
}caTCH(TableAlreadyExists @e){
	log(@e.message);
}

alter table mascota
add casita boolean,
  hogar boolean,
  familia boolean,
  vida boolean,
  vidas map<int, string>
  ;

alter table mascota
drop familia; 

drop table aEliminar;
drop table  IF EXISTS aEliminar;

try{
  drop table aEliminar;
  log("****************no capturo TableDontExists");
}catch(TableDontExists @a){
	log(@a.message);
}
insert into mascota values(201503611, 11, 36, true, true, true, null);
insert into mascota values(201503611, 11, 36, true , true, false, null);

insert into mascota(carnet, años, edad) values(201504397,97,43);
truncate table mascota;


create user pavel with password "123";
create user nath with password "123";
create user da with password "123";
try{
create user da with password "123";
  log("****************no capturo UserAlreadyExists");
}catch(UserAlreadyExists @a){
	log(@a.message);
}

grant pavel on testing;
try{
grant pavel1 on testing;
  log("****************no capturo UserDontExists");
}catch(UserDontExists @a){
	log(@a.message);
}

revoke pavel on testing;
try{
revoke pavel1 on testing;
  log("****************no capturo UserDontExists");
}catch(UserDontExists @a){
	log(@a.message);
}
gato @g = new gato;
@g.nombre = "cat1";
@g.edad = 43;
insert into humano(nombre, cat) values("pavel", new gato);
insert into humano(nombre, cat) values("karla", @g);
insert into humano(nombre, cat) values("nath", {"gato", 5} as gato);
try{
insert into humano(idhumano,nombre, cat) values(4,"nath", new gato);
  log("****************no capturo CounterTypeException");
}
catch(CounterTypeException @e){
log(@e.message);
}
insert into mascota values(201503611, 36, 11, true, true, true, null);
insert into mascota values(201504397, 97, 43, true, true, true, null);
update mascota
set vidas = new map<int, string>
where 1==1;

update mascota
set vidas = vidas + {1:"1",2:"2"}
where carnet == 201503611;


select * from mascota;
rollback;