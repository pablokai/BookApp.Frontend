import React, { useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {ObtenerGenero, InsertarLibro, ModificarLibro} from '../../services/LibroService'
import {  Alert, Button, Modal  } from "flowbite-react"; 
import { toBase64 } from '../../utils/Base64Converter';
import { InputCheckText } from '../../utils/InputChecker';
import { Libro } from '../../class/Libro';

function FormBooks( ) {
    const location = useLocation();

    const [operacion, setOperacion] = useState( location.state.operation);
    const [mensajeError, setMensajeError] = useState('');
    const [mostrarMensaje, setMostrarMensaje] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();
    const [inputCorrecto, setInputCorrecto] = useState(false);

    const [idLibro, setIdLibro] = useState(operacion === 2 ? location.state.data[0] : ''); 
    const [Titulo, setTitulo] = useState(operacion === 2 ? location.state.data[2] : ''); 
    const [TotalPaginas, setTotalPaginas] = useState(operacion === 2 ? location.state.data[10] : ''); 
    const [NombreAutor, setNombreAutor] = useState(operacion === 2 ? location.state.data[3] : ''); 
    const [PrimerApellidoAutor, setPrimerApellidoAutor] = useState(operacion === 2 ? location.state.data[4] : ''); 
    const [SegundoApellidoAutor, setSegundoApellidoAutor] = useState(operacion === 2 ? location.state.data[5] : ''); 
    const [Editorial, setEditorial] = useState(operacion === 2 ? location.state.data[7] : ''); 
    const [Genero, setGenero] = useState(operacion === 2 ? location.state.data[8] : ''); 
    const [FechaPublicacion, setFechaPublicacion] = useState(operacion === 2 ? location.state.data[11] : ''); 
    const [Portada, setPortada] = useState(operacion === 2 ? location.state.data[1] : '' );

    const [ListaGenero, setListaGenero] = useState([]); 

    useEffect( ()=>{
        const ObtenerGeneros = async ()=>{
            setListaGenero(await ObtenerGenero() );
        }
        ObtenerGeneros();
    },[]);

    const redirectForm = () =>{
        navigate('/Libros');        
    }

    const ObtenerGeneros = async ()=>{
        setListaGenero(await ObtenerGenero() );
    }
    const mostrarAlerta =  ()=>{
        setMostrarMensaje(!mostrarMensaje);
    }

    const InsertarLibros = async () =>{
        const libro = new Libro(idLibro, Titulo,NombreAutor,PrimerApellidoAutor,SegundoApellidoAutor,
            "",Editorial,Genero,"",FechaPublicacion,Portada, TotalPaginas);

        const response = await InsertarLibro(libro);
        response.estado === 1  ??  setOpenModal(true); 
    }

    const ModificarLibros = async () =>{
        const libro = new Libro(idLibro, Titulo,NombreAutor,PrimerApellidoAutor,SegundoApellidoAutor,
            "",Editorial,Genero,"",FechaPublicacion,Portada, TotalPaginas);
        const response = await ModificarLibro(libro);
        response.estado === 1  ??  setOpenModal(true); 
    }

    //changes

    const onChangePortada = async (e) => {
        const target = e.target.files[0];
        const extension = target.name.split(".").pop();
        if( extension === "png" || extension === "jpg" ||  extension === "jpeg"){           
            setPortada( await toBase64(target));
        }else{           
            setMensajeError('   Los archivos deben ser png o jpg');
            setMostrarMensaje(true);
        }
    }

    const onChangeCheck = (text, isName) =>{
        const check = InputCheckText(text, isName);
        check !== true ? setInputCorrecto(true) :   setInputCorrecto(false);

        if(check !== true){
            setMensajeError(check);
            mostrarAlerta();
        }
    }

    return (
        <>
            <div> { ListaGenero.map( (item)=> <p>{item.nombre}</p>)}</div>
            <h1 style={{color: "black"}}>{Titulo}</h1>
            <input type='file' name='portada' onChange={onChangePortada}/>


            <input type='text' value={operacion} onChange={ (e) => setTitulo(e.target.value)  } />
            <img src={Portada} alt='' style={{width: "500px", height: "500px"}}/>

            <button onClick={()=>  onChangeCheck(Titulo, true)}>Guardar</button>

            {   mostrarMensaje &&
                <Alert color="failure" onDismiss={() => mostrarAlerta()}>
                <span className="font-medium">Error!</span> {mensajeError}
                </Alert>
            }

        <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {operacion === 1 ? "Se ha insertado el libro": "Se ha modificado el libro"}
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="success" onClick={
                () => {
                    setOpenModal(false)
                    redirectForm();
                    }}>
                {"Volver"}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
        </>
    )

}

export default FormBooks