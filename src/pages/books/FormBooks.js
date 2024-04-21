import React, { useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import {ObtenerGenero} from '../../services/LibroService'
import '../../styles/FormBooks.css'

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
}

export default FormBooks