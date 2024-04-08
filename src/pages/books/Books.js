import React, { useEffect, useState } from 'react'
import BasicTable from '../../components/BasicTable'
import { Button } from "flowbite-react";
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

    const getData = () =>{
        setDataList(data)
    }
    

    useEffect( ()=>{
        getData();
    }, []);

    const columns = [
        "Name", 
        {
            name: "Cover",
            options: {
                customBodyRender : (value) =>(
                        <img src={value} alt=''></img>
                )
            }
        },
        "Company", 
        "City", 
        "State", 
        { name: "Acciones",
            options: {
                customBodyRender : (value, tableMeta, updateValue) =>{
                    return (
                        <>
                            <img src={editicon} alt=''></img>
                            <img src={deleteicon} alt=''></img>

                            {/* <Button gradientMonochrome="teal" onClick={() => console.log(tableMeta.rowData)} style={{display: "inline-block"}} >Editar</Button>
                            <Button gradientMonochrome="failure" style={{display: "inline-block"}}>Borrar</Button> */}
                        </>
                    )
                }
            }
        }
    ];

  return (
    <>
    <BasicTable tableData={dataList} tableColumns={columns}></BasicTable> 
    </>  
  )
}

export default Books