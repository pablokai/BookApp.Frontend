import React, { useEffect, useState } from 'react'
import BasicTable from '../../components/BasicTable'
import {useNavigate} from 'react-router-dom'
import editicon from "../../images/pencil.png";
import deleteicon from "../../images/delete.png";
import '../../styles/books.css'

const data = [
    ["John Walsh", "Test Corp", "Hartford", "CT"],
    ["Bob Herm", "Test Corp", "Tampa", "FL"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
    ["Joe James", "Test Corp", "Yonkers", "NY"],
    ["John Walsh", "Test Corp", "Hartford", "CT"],
    ["Bob Herm", "Test Corp", "Tampa", "FL"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
    ["Joe James", "Test Corp", "Yonkers", "NY"],
    ["John Walsh", "Test Corp", "Hartford", "CT"],
    ["Bob Herm", "Test Corp", "Tampa", "FL"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
    ["Joe James", "Test Corp", "Yonkers", "NY"],
    ["John Walsh", "Test Corp", "Hartford", "CT"],
    ["Bob Herm", "Test Corp", "Tampa", "FL"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
    ["Joe James", "Test Corp", "Yonkers", "NY"],
    ["John Walsh", "Test Corp", "Hartford", "CT"],
    ["Bob Herm", "Test Corp", "Tampa", "FL"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
    ["Joe James", "Test Corp", "Yonkers", "NY"],
    ["John Walsh", "Test Corp", "Hartford", "CT"],
    ["Bob Herm", "Test Corp", "Tampa", "FL"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
    ["Joe James", "Test Corp", "Yonkers", "NY"],
    ["John Walsh", "Test Corp", "Hartford", "CT"],
    ["Bob Herm", "Test Corp", "Tampa", "FL"],
    ["James Houston", "Test Corp", "Dallas", "TX", ],
  ];

function Books() {
    const [dataList, setDataList]= useState([]);
    const navigate = useNavigate();

    const getData = async () =>{
        setDataList(await data)
    }
    
    const redirectForm = (rowData, operacion) =>{
        navigate('/formLibros', { state: { data: rowData, operation: operacion } });
        
    }
    useEffect( ()=>{
        getData();
    }, []);

    const columns = [
        {
            name: "Portada",
            options: {
                customBodyRender : (value) =>(
                        <img src={value} alt=''></img>
                )
            }
        },
        "Título", 
        "Autor", 
        "Edición", 
        "Género", 
        "Año Publicación",
        { name: "Acciones",
            options: {
                customBodyRender : (value, tableMeta, updateValue) =>{
                    return (
                        <>
                            <img src={editicon} alt='' onClick={() => redirectForm(tableMeta.rowData, 1)}></img>
                            <img src={deleteicon} alt='' onClick={() => console.log(tableMeta.rowData)}></img>

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
    <BasicTable tableData={dataList} tableColumns={columns}></BasicTable> 
    </>  
  )
}

export default Books