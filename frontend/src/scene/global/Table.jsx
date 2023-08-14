import React, { useContext, useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import LinearProgress from "@mui/material/LinearProgress";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import { Box, Button,Grid } from "@mui/material";
import { dashboardContext } from "../../context/DashBoardContext";
import FullScreenDialog from "../../component/Popup";
import EditDialogSlide from "../../component/EditPopup";

export const Table = () => {
  const {
    getAllItem,
    allItems,
    setIsLoading,
    open,
    handleClose,
    handleClickOpen,
    handleDelete,
    delLoading,
    editHandleClickOpen
    
  } = useContext(dashboardContext);

  const [gridApi, setGridApi] = useState();
  const [edit, setEdit] = useState(true);
  useEffect(() => {
    getAllItem();
  }, []);

  const handleGrid = (param) => {
    setGridApi(param);
  };
  const exportCsv=()=>{
    gridApi.api.exportDataAsCsv()
    // console.log(gridApi)
  }
  const columnDef = [
    { headerName: "id", field: "id",editable:false },
    { headerName: "Product Name", field: "product_name" },
    { headerName: "price", field: "price" },
    { headerName: "ImageUrl", field: "image_url" },
    { headerName: "Quantity", field: "quantity" },
    { headerName: "Description", field: "description" },
    {
      headerName: "Action",
      field: "action",
      filter: false,
      cellRenderer: (params) => (
        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              editHandleClickOpen(params.data)
            }}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={(e) => handleDelete(params.data.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];
  const defaultCol = {
    sortable: true,
    filter: true,
    floatingFilter: true,
    flex: 0,
    editable: edit,
  };
  return (
    <>
    <Grid container gap={2}>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => handleClickOpen()}
      >
        Add Item
      </Button>
      <Button variant="outlined" color="success" onClick={exportCsv}>Export CSV</Button>
      </Grid>
      <FullScreenDialog open={{ open, handleClose }} />
      <EditDialogSlide open={{ open, handleClose }}/>
      <Box className="ag-theme-alpine" sx={{ height: "100%", width: "100%" }}>
        <Grid  display={`${delLoading?"":"none"}`}>
          <LinearProgress></LinearProgress>
        </Grid>
        <AgGridReact
          columnDefs={columnDef}
          rowData={allItems}
          defaultColDef={defaultCol}
          pagination={true}
          paginationAutoPageSize={true}
          onGridReady={handleGrid}
        />
      </Box>
    </>
  );
};
