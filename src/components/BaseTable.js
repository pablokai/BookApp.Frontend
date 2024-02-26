import React from 'react'
import  {flexRender, useReactTable, getCoreRowModel} from '@tanstack/react-table';


function BaseTable() {
    const data = [
        {
          "firstName": "Tanner",
          "lastName": "Linsley",
          "age": 33,
          "visits": 100,
          "progress": 50,
          "status": "Married"
        },
        {
          "firstName": "Kevin",
          "lastName": "Vandy",
          "age": 27,
          "visits": 200,
          "progress": 100,
          "status": "Single"
        }
      ];
      const columns =[
        {
            header: "First Name",
            accessorKey: 'firstName'
        },
        {
            header: "Last Name",
            accessorKey: 'lastName'
        },
        {
            header: "Age",
            accessorKey: 'age'
        },
        {
            header: "Visits",
            accessorKey: 'visits'
        },
        {
            header: "Progress",
            accessorKey: 'progress'
        },
        {
            header: "Status",
            accessorKey: 'status'
        },
        {
            header: 'Actions',
            accessorKey: 'actions',
        }
      ];
      const table= useReactTable({data, columns, getCoreRowModel: getCoreRowModel()});


  
  return (
    <table>
        {table.getHeaderGroups().map(headerGroup =>(
            <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => 
                <th key={header.id}>
                    {flexRender(header.column.columnDef.header,
                        header.getContext())}
                </th>)}
            </tr>
        ))}
        <tbody>
            {table.getRowModel().rows.map(row=>(
                <tr key={row.id}>
                    {row.getVisibleCells().map(cell =>(
                        <td key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    </table>
  )
}

export default BaseTable