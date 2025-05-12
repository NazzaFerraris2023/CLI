//Dentro de este archivo tengo que crear las funciones correspondientes para que funcione la terminal
//Tengo que usar el modulo process para poder acceder a la informacion del entorno del programa
import fs from "node:fs/promises"

import process from "node:process"

//Al usar el modulo fs/promises y que dentro de index.js el stdin es una funcion asincronica, hay que tratar que todas las funciones de cli.js sean asincronas

export async function pwd(){
    return process.cwd()
}
// console.log(pwd())

export async function date(){
    const date = new Date().toString()
    return date
}
// console.log(date())
export async function ls(){
    return  await fs.readdir(process.cwd())
}

export async function cat(archivo){
    //Lee lo que esta dentro de un archivo
   return await fs.readFile(archivo[0],"utf-8")
  
}

// cat(["./prueba/prueba.txt"])
//    .then((contenido) => console.log(contenido))
//     .catch((error) => console.error(error));
//El parametro "archivo" => es un array que hace referencia a todo el path. Si hago archivo[0], le estoy diciendo que me lea el ultimo elemento que aparece en la ruta ("./prueba/prueba.txt")

export async function echo(params){
    return params.join(" ")
}
// console.log("Esto es un texto separado por espacios")

export async function exit(){
    return process.exit()
}