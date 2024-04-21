import React, { useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import {ObtenerGenero} from '../../services/LibroService'
import '../../styles/FormBooks.css'
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

  
    const onChangeIdLibro = (e) => setIdLibro(e.target.value);
  return (
    <>
                    
             
          <div className='contenedorHeader'>
            <h1 className='titulo'>Mantenimiento de Libros</h1>
            <button className='add-buttonUno'>Guardar Libro</button>
            <button className='add-buttonDos'>Modificar Libro</button>
          </div>  

           <div class="containerinput">
              <div className='containerinputUno'>
                <div className='inputscontainer'>
                  <label class='form-label' for="titulo">Título</label>
                  <input class="form-input" type="text" id="titulo" placeholder="Ingrese el título del libro"></input>
                </div>
                <div className='inputscontainer'>
                  <label class="form-label" for="autor">Nombre del autor</label>
                  <input class="form-input" type="text" id="autor" placeholder="Ingrese el nombre del autor del libro"></input>
                </div>
                <div className='inputscontainer'>
                  <label class="form-label" for="paginas">Primer Apellido del Autor</label>
                  <input class="form-input" type="number" id="paginas" placeholder="Ingrese el primer apellido del autor del libro"></input>
                </div>
                <div className='inputscontainer'>
                  <label class="form-label" for="paginas">Segundo Apellido del Autor</label>
                  <input class="form-input" type="number" id="paginas" placeholder="Ingrese el segundo apellido del autor del libro"></input>
                </div>

              </div>
              <div className='containerinputDos'>
              <div className='inputscontainer'>
                  <label class="form-label" for="paginas">Total de páginas</label>
                  <input class="form-input" type="number" id="paginas" placeholder="Ingrese el numero de páginas"></input>
                </div>
             
                <div className='inputscontainer'>
                  <label class="form-label" for="genero">Género</label>
                  <select class="form-select" id="genero">
                    <option value="">Seleccione un género</option>

                  </select>
                </div>
               
                <div className='inputscontainer'>
                  <label class="form-label" for="paginas">Fecha de Publicacion</label>
                  <input class="form-input" type="date"  placeholder="Seleccione la fecha"></input>
                </div>
              
                <div className='inputscontainer'>
                  <label class="form-label" for="paginas">Editorial</label>
                  <input class="form-input" type="number" id="paginas" placeholder="Ingrese el nombre de la editorial"></input>
                </div>

              </div>
        
             
                


              
           </div> 
           
         
         
         
                
              
         
        
    </>
  )


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