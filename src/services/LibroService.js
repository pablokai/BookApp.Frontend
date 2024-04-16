import { ProcesarApi } from "./ApiFetch";

const controlador = "Libro";;

export const ListarLibros = async (data) =>{
    const url = `${controlador}/ListarLibros`;
    return await ProcesarApi('POST',url,data);
}

export const ObtenerGenero = async () =>{  
    const url = `${controlador}/ObtenerGenero`;
     return await ProcesarApi('GET',url);
}