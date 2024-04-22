import React, { useEffect, useState } from 'react'
import BasicTable from '../../components/BasicTable'
import {useNavigate, useLocation} from 'react-router-dom'
import editicon from "../../images/pencil.png";
import deleteicon from "../../images/delete.png";
import noimageicon from "../../images/noimage.jpg";
import '../../styles/books.css'
import { Button, Modal, Alert } from "flowbite-react"; 
import {EliminarLibro, ListarLibros} from '../../services/LibroService'
import { toBase64 } from '../../utils/Base64Converter';
import { Libro } from '../../class/Libro';

function Books() {

    const [dataList, setDataList]= useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [mensajeBorrado, setMensajeBorrado] = useState('');
    const [mostrarMensaje, setMostrarMensaje] = useState(false);
    const [estadoBorrado, setEstadoBorrado] = useState(false);

    const [listaLibros, setListaLibros]= useState([]);
    const [idLibro, setIdLibro] = useState(0);
    const navigate = useNavigate();

    const listarLibros = async () =>{
        setListaLibros(await ListarLibros());
    }

    const mostrarAlerta =  ()=>{
        setMostrarMensaje(!mostrarMensaje);
    }
    
    const redirectForm = (rowData, operacion) =>{
        console.log(rowData);
        navigate('/formLibros', { state: { data: rowData, operation: operacion } });        
    }

    const eliminarLibro  = async (idLibro) =>{
        const libro = new Libro(idLibro, "","","","","","",0,"",new Date(),"",0)
        const response = await EliminarLibro(libro);
        
        if(response.estado === 1){
            setEstadoBorrado(true);
            listarLibros();
           
        }else if(response.estado === 0){
            setEstadoBorrado(false);
        }

        setMensajeBorrado(response.mensaje);
        mostrarAlerta();
         
    }
    useEffect( ()=>{
        listarLibros();
    }, []);

    const columns = [
        {
            name: "idLibro",
            label: "idlibro",
            options:{
                display: false
            }

        },
        {
            name: "portada",
            label: "Portada",
            options: {
                customBodyRender : (value) =>( 
                        value===null || value===""? <img src={noimageicon} alt='' className='bookcover'></img>  :<img src={value} alt='' className='bookcover'></img>                
                        
                )
            }
        },
        { 
            name :"titulo",
            label: "Título"
        }, 
        {
            name :  "nombreAutor",
            options:{
                display: false
            }
        },
        {
            name :  "primerApellidoAutor",
            options:{
                display: false
            }
        },
        {
            name :  "segundoApellidoAutor",
            options:{
                display: false
            }
        },
        {
            name :  "autor",
            label:  "Autor"
        },
        {
            name: "editorial",
            label: "Editorial"
        },
        {
            name: "idGenero",
            options:{
                display: false
            }
        },
        {
            name: "genero",
            label: "Género",
        },
        {
            name: "totalPaginas",
            label: "Total Páginas",
        },
        {
            name: "annioPublicacion",
            label: "Año Publicación",
            options: {
                customBodyRender : (value) =>(
                        value.slice(0,4)
                )
            }
        },
        { 
            name: "Acciones",
            options: {
                customBodyRender : (value, tableMeta, updateValue) =>{
                    return (
                        <>
                            <img src={editicon} alt='' onClick={() => redirectForm(tableMeta.rowData, 2)}></img>
                            <img src={deleteicon} alt='' onClick={() => 
                                {
                                    setOpenModal(true);
                                    setIdLibro (tableMeta.rowData[0]);
                                }}></img>
                            {}
                        </>
                    )
                }
            }
        }
    ];

  return (
    <>
    <div className='top-header'>
        <div >
             <h1>Lista de Libros</h1>
        </div>
        <div>
            <button className='add-button' onClick={ ()=>{ redirectForm('', 1)}}>Agregar</button>
        </div>
    </div>
    {   mostrarMensaje &&
                <div className='delete-message'>
                <Alert color={estadoBorrado === true ? "success" : "failure"} onDismiss={() => mostrarAlerta()}>
                <span className="font-medium" >{estadoBorrado === true ? "Éxito: " : "Error: "}</span> {mensajeBorrado}
                </Alert>
                </div>
            }
    <BasicTable tableData={listaLibros} tableColumns={columns}></BasicTable> 
    
    <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            ¿Seguro que desea borrar este libro?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={
                () => {
                    setOpenModal(false)
                    eliminarLibro(idLibro);
                    }}>
                {"Sí, estoy seguro"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancelar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>  
  )
}

export default Books