//Dentro del index tengo que manejar la logica del stdin y stdout
import {stdout,stdin} from "node:process"
// import { date , exit } from "./cli.js"

// dos tipos de soluciones: Solucion con switch/if 
// stdout.write("Ingrese un comando valido: \n")
// stdin.on("data", async (data) => {
//     try {
//         const input = data.toString().trim() // convierte el input (Buffer) en string y elimina los espacios vacios
//         switch (input) {
//             case "date":
//                 const fecha = await date()
//                 stdout.write(`${fecha}\n` )
//                 break;
//             case "pwd":
//                 const ubi = await pwd()
//                 stdout.write(`${ubi}\n`)
//                   break;
//             case "ls":
//                 const directorios = await ls()
//                 stdout.write(`${directorios}\n`)
//                   break;
//             case "cat":
//                 const file = await cat([...archivo])
//                 console.log(file)
//                 break;
//             case "exit":
//                 exit()
//                 break
//         }   
            
//     } catch (error) {
//         console.log("El comando ingresado no existe, ingrese los siguientes comandos: ")
//     }
  
   
// })

//Solucion dinamica: 
import * as commands from "./cli.js" //=> Es un objeto, puedo acceder a sus valores dinamicamente

stdout.write("Ingrese un comando valido: \n")
stdin.on("data", async (data) => {
    try {

        const input = data.toString().trim() // convierte el input (Buffer) en string y elimina los espacios vacios

           //El input voy a tener que convertirlo en un array con split(), asi puede admitir flags. El primer elemento es el comando
        // const command = input.split(" ")[0]
         const [command,...params] = input.split(" ") // ...params => me va a copiar todos los elementos del array en esta propiedad
        // console.log("Params: ",...params)
            if(!commands[command]){
                throw new Error(`El comando no existe ${command}, los comandos disponibles son: ${Object.keys(commands).join(",")}`// Object.keys(commands) => Clase Object, la funcion keys me devuelve un array con las claves de un objeto
                )}

        const res = await commands[command](params) // await xq todos lo que trae commands es asincronico,  con bracket notation puedo hacerlo dinamico pasandole input, () porque todo lo que devuelve es una funcion
        stdout.write(`${res}\n`)


    } catch (error) {
        stdout.write(`Error: ${error.message}\n`)

    }finally{
        stdout.write("Escribi tu comando: ")
    }
  
   
})