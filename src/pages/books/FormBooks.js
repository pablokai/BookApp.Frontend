import React, { useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import {ObtenerGenero, InsertarLibro} from '../../services/LibroService'
import {  Alert } from "flowbite-react"; 
import { toBase64 } from '../../utils/Base64Converter';


function FormBooks( ) {
    const location = useLocation();

    const [operacion, setOperacion] = useState( location.state.operation);
    const [mensajeError, setMensajeError] = useState('');
    const [mostrarMensaje, setMostrarMensaje] = useState(true);


    const [idLibro, setIdLibro] = useState(operacion === 1 ? location.state.data[0] : ''); 
    const [Titulo, setTitulo] = useState(operacion === 1 ? location.state.data[2] : ''); 
    const [TotalPaginas, setTotalPaginas] = useState(operacion === 1 ? location.state.data[0] : ''); 
    const [NombreAutor, setNombreAutor] = useState(operacion === 1 ? location.state.data[3] : ''); 
    const [PrimerApellidoAutor, setPrimerApellidoAutor] = useState(operacion === 1 ? location.state.data[0] : ''); 
    const [SegundoApellidoAutor, setSegundoApellidoAutor] = useState(operacion === 1 ? location.state.data[0] : ''); 
    const [Editorial, setEditorial] = useState(operacion === 1 ? location.state.data[0] : ''); 
    const [Genero, setGenero] = useState(operacion === 1 ? location.state.data[0] : ''); 
    const [FechaPublicacion, setFechaPublicacion] = useState(operacion === 1 ? location.state.data[0] : ''); 
    const [Portada, setPortada] = useState(operacion === 1 ?? location.state.data[1] );

    const [ListaGenero, setListaGenero] = useState([]); 

    useEffect( ()=>{
        const ObtenerGeneros = async ()=>{
            setListaGenero(await ObtenerGenero() );
        }
        ObtenerGeneros();
    },[]);


    const ObtenerGeneros = async ()=>{
        setListaGenero(await ObtenerGenero() );
    }
    const mostrarAlerta =  ()=>{
        setMostrarMensaje(!mostrarMensaje);
    }

    const InsertarLibros = async () =>{
        const libro = {
            "idLibro": 0,
            "titulo": "prueba2",
            "nombreAutor": "prueba2",
            "primerApellidoAutor": "test",
            "segundoApellidoAutor": "",
            "autor": "prueba2",
            "editorial": "prueba2",
            "idGenero": 2,
            "genero": "",
            "annioPublicacion": "2024-04-19T21:51:14.944Z",
            "portada": await toBase64(Portada),
            "totalPaginas": 0,

        }
        const response = await InsertarLibro(libro);
        console.log(response);
        
    }

   

    //changes
    const onChangeIdLibro = (e) => setIdLibro(e.target.value);

    const onChangePortada = async (e) => {
        const target = e.target.files[0];
        setPortada( target);
    }
    return (
        <>
            <div> { ListaGenero.map( (item)=> <p>{item.nombre}</p>)}</div>
            <h1 style={{color: "black"}}>{Titulo}</h1>
            <input type='file' name='portada' onChange={onChangePortada}/>

            <button onClick={()=> InsertarLibros()}>Guardar</button>

            {   mostrarMensaje &&
                <Alert color="failure" onDismiss={() => mostrarAlerta()}>
                <span className="font-medium">Error!</span> {mensajeError}
                </Alert>
            }
        </>
    )

}

export default FormBooks