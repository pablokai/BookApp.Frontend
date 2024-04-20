import React, { useEffect, useState } from 'react'
import BasicTable from '../../components/BasicTable'
import {useNavigate} from 'react-router-dom'
import editicon from "../../images/pencil.png";
import deleteicon from "../../images/delete.png";
import '../../styles/books.css'
import { Button, Modal } from "flowbite-react"; 
import {EliminarLibro, ListarLibros} from '../../services/LibroService'
import { toBase64 } from '../../utils/Base64Converter';
import { Libro } from '../../class/Libro';

function Books() {
    const [dataList, setDataList]= useState([]);
    const [openModal, setOpenModal] = useState(false);

    const [listaLibros, setListaLibros]= useState([]);
    const [idLibro, setIdLibro] = useState(0);
    const navigate = useNavigate();

    const listarLibros = async () =>{
        setListaLibros(await ListarLibros());
    }
    
    const redirectForm = (rowData, operacion) =>{
        navigate('/formLibros', { state: { data: rowData, operation: operacion } });        
    }

    const eliminarLibro  = async (idLibro) =>{
        const libro = new Libro(idLibro, "","","","","","",0,"",new Date(),"",0)
        const response = await EliminarLibro(libro);
        
        console.log(response);
        response.estado === 1 ?? ListarLibros();
         
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
                        <img src={ value} alt='' className='bookcover'></img>
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
                            <img src={editicon} alt='' onClick={() => redirectForm(tableMeta.rowData, 1)}></img>
                            <img src={deleteicon} alt='' onClick={() => 
                                {
                                    setOpenModal(true);
                                    setIdLibro (tableMeta.rowData[0]);
                                }}></img>
                            {/* { <Button gradientMonochrome="teal" onClick={() => console.log(tableMeta.rowData)} style={{display: "inline-block"}} >Editar</Button>
                            <Button gradientMonochrome="failure" style={{display: "inline-block"}}>Borrar</Button> } */}
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
            <button className='add-button' onClick={ ()=>{ redirectForm('', 2)}}>Agregar</button>
        </div>
    </div>
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