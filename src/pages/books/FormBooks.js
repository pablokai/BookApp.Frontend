import React, { useEffect, useState} from 'react'
import '../../styles/FormBooks.css'
import {useLocation, useNavigate} from 'react-router-dom'
import {ObtenerGenero, InsertarLibro, ModificarLibro} from '../../services/LibroService'
import {  Alert, Button, Modal  } from "flowbite-react"; 
import { toBase64 } from '../../utils/Base64Converter';
import { InputCheckText, InputCheckNumber } from '../../utils/InputChecker';
import { Libro } from '../../class/Libro';


function FormBooks( ) {
    const location = useLocation();

    const [operacion, setOperacion] = useState( location.state.operation);
    const [mensajeError, setMensajeError] = useState('');
    const [mostrarMensaje, setMostrarMensaje] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();
    const [inputError, setInputError] = useState("");

    const [idLibro, setIdLibro] = useState(operacion === 2 ? location.state.data[0] : 0); 
    const [Titulo, setTitulo] = useState(operacion === 2 ? location.state.data[2] : ''); 
    const [TotalPaginas, setTotalPaginas] = useState(operacion === 2 ? location.state.data[10] : 0); 
    const [NombreAutor, setNombreAutor] = useState(operacion === 2 ? location.state.data[3] : ''); 
    const [PrimerApellidoAutor, setPrimerApellidoAutor] = useState(operacion === 2 ? location.state.data[4] : ''); 
    const [SegundoApellidoAutor, setSegundoApellidoAutor] = useState(operacion === 2 ? location.state.data[5] : ''); 
    const [Editorial, setEditorial] = useState(operacion === 2 ? location.state.data[7] : ''); 
    const [Genero, setGenero] = useState(operacion === 2 ? location.state.data[8] : 1);
    const [FechaPublicacion, setFechaPublicacion] = useState(operacion === 2 ? location.state.data[11] : ''); 
    const [Portada, setPortada] = useState(operacion === 2 ? location.state.data[1] : '' );

    const [ListaGenero, setListaGenero] = useState([]);

    useEffect( ()=>{
        const ObtenerGeneros = async ()=>{
            setListaGenero(await ObtenerGenero() );
        }
        ObtenerGeneros();
    },[]);

    const redireccionarForm = () =>{
        navigate('/Libros');        
    }

    const mostrarAlerta =  ()=>{
        setMostrarMensaje(!mostrarMensaje);
    }

    const InsertarLibros = async () =>{

        const campos = [
            {
                texto: Titulo,
                esNombre: false,
                esRequerido: true
            },
            {
                texto: NombreAutor,
                esNombre: true,
                esRequerido: true
            },
            {
                texto: PrimerApellidoAutor,
                esNombre: true,
                esRequerido: true
            },
            {
                texto: SegundoApellidoAutor,
                esNombre: true,
                esRequerido: false
            },
            {
                texto: Editorial,
                esNombre: true,
                esRequerido: true
            },
        ];
        
        const numeros = [
            {
                numero: TotalPaginas,
            }
        ];

        const checkText = InputCheckTextFormat(campos);
        const checkNumber = InputCheckNumberFormat(numeros);
        const checkDate = InputCheckDateFormat(FechaPublicacion);
     
        if(checkText && checkNumber && checkDate){
            const libro = new Libro(idLibro, Titulo,NombreAutor,PrimerApellidoAutor,SegundoApellidoAutor ,
            "",Editorial,Genero,"",FechaPublicacion,Portada, TotalPaginas);
            const response = await InsertarLibro(libro);
            if(response.estado === 1){
                setOpenModal(true); 
            }else if(response.estado === 0){
                setMensajeError(response.mensaje);
                mostrarAlerta();
            }
           
        }
}

    const ModificarLibros = async () =>{

        const campos = [
            {
                texto: Titulo,
                esNombre: false,
                esRequerido: true
            },
            {
                texto: NombreAutor,
                esNombre: true,
                esRequerido: true
            },
            {
                texto: PrimerApellidoAutor,
                esNombre: true,
                esRequerido: true
            },
            {
                texto: SegundoApellidoAutor,
                esNombre: true,
                esRequerido: false
            },
            {
                texto: Editorial,
                esNombre: true,
                esRequerido: true
            },
        ];

        const numeros = [
            {
                numero: TotalPaginas,
            }
        ];
        const checkText = InputCheckTextFormat(campos);
        const checkNumber = InputCheckNumberFormat(numeros);
        const checkDate = InputCheckDateFormat(FechaPublicacion);
     
        if(checkText && checkNumber && checkDate){
            const libro = new Libro(idLibro, Titulo,NombreAutor,PrimerApellidoAutor,SegundoApellidoAutor,
                "",Editorial,Genero,"",FechaPublicacion,Portada, TotalPaginas);
            const response = await ModificarLibro(libro);
            if(response.estado === 1){
                setOpenModal(true); 
            }else if(response.estado === 0){
                setMensajeError(response.mensaje);
                mostrarAlerta();
            }
        }
    }

    const InputCheckTextFormat = (data) =>{

        for(let i=0; i<data.length; i++ ){

            const check = InputCheckText(data[i].texto, data[i].esNombre, data[i].esRequerido);
            // check !== true ? setInputCorrecto(true) :   setInputCorrecto(false);

            if(check !== true){
                setMensajeError( check);
                mostrarAlerta();
                return false;
            }
        }

        return true;
    }

    const InputCheckNumberFormat = (data) =>{

        for(let i=0; i<data.length; i++ ){

            const check = InputCheckNumber(data[i].numero);

            if(check !== true){

                setMensajeError("Total de paginas: "+check);
                mostrarAlerta();
                return false;
            }
        }

        return true;
    }

    const InputCheckDateFormat = (data) =>{
        
        const fechaActual =  new Date();
        const fechaLimite = new Date('1784-01-01T00:00:00');
        const fechaLibro = Date.parse(data);

        console.log(fechaActual, fechaLimite, fechaLibro)
        if(fechaLibro > fechaActual || fechaLibro <= fechaLimite){

            setMensajeError("La fecha ingresada no puede estar fuera de los rangos de año 1753 hasta la fecha actual");
            mostrarAlerta();
            return false;
        }

        return true;
    }

    //CHANGES

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

    const onChangeTitulo = (e) => setTitulo(e.target.value);
    const onChangeNombreAutor = (e) => setNombreAutor(e.target.value);
    const onChangePrimerApellidoAutor= (e) => setPrimerApellidoAutor(e.target.value);
    const onChangeSegundoApellidoAutor= (e) => setSegundoApellidoAutor(e.target.value);
    const onChangeTotalPaginas = (e) => setTotalPaginas(e.target.value);
    const onChangeGenero = (e) => {
        setGenero(parseInt(e.target.value));
    };
    const onChangeFechaPublicacion = (e) => setFechaPublicacion(e.target.value);
    const onChangeEditorial = (e) => setEditorial(e.target.value);

    return (
        <>
            {/* <button onClick={()=>  onChangeCheck(Titulo, true)}>Guardar</button> */}

           
            <div className='contenedorHeader'>
                <h1 className='titulo'>Mantenimiento de Libros </h1>
                {operacion === 1 ?  <button className='add-buttonUno' onClick={()=> InsertarLibros()}>Guardar Libro</button> : ''}
                {operacion === 2 ? <button className='add-buttonUno' onClick={()=>ModificarLibros()}>Modificar Libro</button> : ''}
            </div>  
            {   mostrarMensaje &&
                <div className='error-message'>
                <Alert color="failure" onDismiss={() => mostrarAlerta()}>
                <span className="font-medium" >Error!</span> {mensajeError}
                </Alert>
                </div>
            }
           <div class="containerinput">
              <div className='containerinputUno'>
                <div className='inputscontainer'>
                  <label class='form-label' for="titulo">Título</label>
                  <input class="form-input" type="text" id="titulo" placeholder="Ingrese el título del libro" 
                  value={Titulo} onChange={onChangeTitulo}></input>
                </div>
                <div className='inputscontainer'>
                  <label class="form-label" for="autor">Nombre del autor</label>
                  <input class="form-input" type="text" id="autor" placeholder="Ingrese el nombre del autor del libro" 
                  value={NombreAutor} onChange={onChangeNombreAutor}></input>
                </div>
                <div className='inputscontainer'>
                  <label class="form-label" for="paginas">Primer Apellido del Autor</label>
                  <input class="form-input" type="text" id="paginas" placeholder="Ingrese el primer apellido del autor del libro" 
                  value={PrimerApellidoAutor} onChange={onChangePrimerApellidoAutor}></input>
                </div>
                <div className='inputscontainer'>
                  <label class="form-label" for="paginas">Segundo Apellido del Autor</label>
                  <input class="form-input" type="text" id="paginas" placeholder="Ingrese el segundo apellido del autor del libro"
                  value={SegundoApellidoAutor} onChange={onChangeSegundoApellidoAutor}></input>
                  <p className='helper-text' style={{fontSize: "1.2vh", padding: "1%"}}>Campo opcional</p>

                </div>
                <div className='inputscontainer'>
                    <label class="form-label" for="paginas" style={{marginBottom: "2vh"}}>Portada del Libro</label>
                    <input type='file' name='portada' onChange={onChangePortada} id='select-file' />
                    <p className='helper-text' style={{fontSize: "1.2vh", paddingBottom: "0"}}>Campo opcional</p>
                    <p className='helper-text' style={{fontWeight : "300"}}>Solo archivos tipo .png o .jpg</p>
                </div>

              </div>
              <div className='containerinputDos'>
              <div className='inputscontainer'>
                  <label class="form-label" for="paginas">Total de páginas</label>
                  <input class="form-input" type="number" id="paginas" placeholder="Ingrese el numero de páginas"
                  value={TotalPaginas} onChange={onChangeTotalPaginas}></input>
                </div>
             
                <div className='inputscontainer'>
                  <label class="form-label" for="genero">Género</label>
                  <select class="form-select" id="genero" onChange={(e)=>onChangeGenero(e)} value={Genero } >
                    {/* {operacion === 1 ?  <option value={0}>Seleccione un género</option> : ''} */}
                    {              
                        ListaGenero?.map((item)=> (                                     
                            <option key={item.idGenero} value={item.idGenero}>{item.nombre}</option>
                            
                    ))}

                  </select>
                </div>
               
                <div className='inputscontainer'>
                  <label class="form-label" for="paginas">Fecha de Publicacion</label>
                  <input class="form-input" type="date"  placeholder="Seleccione la fecha" 
                  value={FechaPublicacion.slice(0,10)} onChange={onChangeFechaPublicacion}></input>
                </div>
              
                <div className='inputscontainer'>
                  <label class="form-label" for="paginas">Editorial</label>
                  <input class="form-input" type="text" id="paginas" placeholder="Ingrese el nombre de la editorial"
                  value={Editorial} onChange={onChangeEditorial}></input>
                </div>
                <div className='inputscontainer'>
                    <label class="form-label" for="paginas" style={{marginBottom: "3vh"}}>Vista Previa</label>
                    <img src={Portada} alt='' className='image-preview'/>
                </div>
              </div>
           </div> 

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
                    redireccionarForm();
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