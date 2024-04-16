import React, { useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import {ObtenerGenero} from '../../services/LibroService'

function FormBooks( ) {
    const location = useLocation();

    const [operacion, setOperacion] = useState( location.state.operation);
    const [idLibro, setIdLibro] = useState(operacion === 1 ? location.state.data[0] : ''); 
    const [Titulo, setTitulo] = useState(operacion === 1 ? location.state.data[0] : ''); 
    const [TotalPaginas, setTotalPaginas] = useState(operacion === 1 ? location.state.data[0] : ''); 
    const [NombreAutor, setNombreAutor] = useState(operacion === 1 ? location.state.data[0] : ''); 
    const [PrimerApellidoAutor, setPrimerApellidoAutor] = useState(operacion === 1 ? location.state.data[0] : ''); 
    const [SegundoApellidoAutor, setSegundoApellidoAutor] = useState(operacion === 1 ? location.state.data[0] : ''); 
    const [Editorial, setEditorial] = useState(operacion === 1 ? location.state.data[0] : ''); 
    const [Genero, setGenero] = useState(operacion === 1 ? location.state.data[0] : ''); 
    const [FechaPublicacion, setFechaPublicacion] = useState(operacion === 1 ? location.state.data[0] : ''); 
    const [Portada, setPortada] = useState(operacion === 1 ? location.state.data[0] : '');

    const [ListaGenero, setListaGenero] = useState([]); 

    useEffect( ()=>{
        const ObtenerGeneros = async ()=>{
            setListaGenero(await ObtenerGenero() );
        }
        ObtenerGeneros();
        console.log(ListaGenero);
    },[]);


    const ObtenerGeneros = async ()=>{
        setListaGenero(await ObtenerGenero() );
    }

    //changes
    const onChangeIdLibro = (e) => setIdLibro(e.target.value);
  return (
    <>
        <div> { ListaGenero.map( (item)=> <p>{item.nombre}</p>)}</div>
        <h1 style={{color: "black"}}>{operacion}</h1>
        
    </>
  )
}

export default FormBooks