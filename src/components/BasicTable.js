import React from "react";
import MUIDataTable from "mui-datatables";
import '../styles/table.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';

function BasicTable({tableData, tableColumns}) {

  const getMuiTheme = () => 
  createTheme({
    components: {
      MuiTypography:{
        styleOverrides:{
          root:{
            fontFamily: '"Plus Jakarta Sans", sans-serif',
          }
        }
      },
      MuiTableCell:{
        styleOverrides:{
          root:{
            fontFamily: '"Plus Jakarta Sans", sans-serif',
          }
        }
      },
      MuiButton:{
        styleOverrides:{
          root:{
            fontFamily: '"Plus Jakarta Sans", sans-serif',
          }
        }
      },
      MuiTablePagination:{
        styleOverrides:{
          selectLabel:{
            fontFamily: '"Plus Jakarta Sans", sans-serif',
          },
          displayedRows:{
            fontFamily: '"Plus Jakarta Sans", sans-serif',
          }
        }
      },
      MuiPaper:{
        styleOverrides:{
          root:{
            borderRadius: "10px",
          }
        }
      },
    }
  });

  const options = {
    filterType: "dropdown",
    rowsPerPage : 20,
    download: false,
    print: false,
    viewColumns: false,
    selectableRows: 'none',
    responsive: "simple"
  };

  return (
    <>
    <ThemeProvider theme={getMuiTheme()}>
      <MUIDataTable
        title={""}
        data={tableData}
        columns={tableColumns}
        options={options}
      />
    </ThemeProvider>
    </>
  );
}

export default BasicTable;
