import { ProcesarApi } from "./ApiFetch";

const controlador = "Libro";;

export const ListarLibros = async () =>{
    const url = `${controlador}/ListarLibros`;
    return await ProcesarApi('POST',url);
}

export const InsertarLibro = async (data) =>{
    const url = `${controlador}/InsertarLibro`;
    return await ProcesarApi('POST',url,data);
}

export const ModificarLibro = async (data) =>{
    const url = `${controlador}/ModificarLibro`;
    return await ProcesarApi('POST',url,data);
}


export const EliminarLibro = async (data) =>{
    const url = `${controlador}/EliminarLibro`;
    return await ProcesarApi('POST',url,data);
}

export const ObtenerLibroPorId = async (data) =>{
    const url = `${controlador}/ObtenerLibroPorId`;
    return await ProcesarApi('POST',url,data);
}


export const ObtenerGenero = async () =>{  
    const url = `${controlador}/ObtenerGenero`;
     return await ProcesarApi('GET',url);
}