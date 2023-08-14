import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { dashboardContext } from "../context/DashBoardContext";
import { InputLabel, TextField } from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';
import {Grid} from "@mui/material";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditDialogSlide() {
  const {
    editOpen,
    editHandleClickOpen,
    editHandleClose,
    editData,
    setEditData,
    handleEdit,
    editLoading
  } = React.useContext(dashboardContext);
console.log(editData)
  return (
    <div>
     
      <Dialog
        open={editOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={editHandleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Grid display={`${editLoading?"":"none"}`}>
           <LinearProgress></LinearProgress>
           </Grid>
        <DialogTitle>Edit Your Product</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <form>
              <InputLabel htmlFor="product_name"> Product Name</InputLabel>
              <TextField
                variant="outlined"
                value={editData.product_name}
                onChange={(e) =>
                  setEditData({ ...editData, product_name: e.target.value })
                }
                margin="dense"
                id="product_name"
                fullWidth
              />
              <InputLabel htmlFor="price"> Price</InputLabel>
              <TextField
                variant="outlined"
                value={editData.price}
                margin="dense"
                id="price"
                fullWidth
                onChange={(e) =>
                  setEditData({ ...editData, price: e.target.value })
                }
              />
              <InputLabel htmlFor="desc"> Description</InputLabel>
              <TextField
                variant="outlined"
                value={editData.description}
                margin="dense"
                id="desc"
                fullWidth
                onChange={(e) =>
                  setEditData({ ...editData, description: e.target.value })
                }
              />
              <InputLabel htmlFor="quantity"> Quantity</InputLabel>
              <TextField
                variant="outlined"
                value={editData.quantity}
                margin="dense"
                id="quantity"
                fullWidth
                onChange={(e) =>
                  setEditData({ ...editData, quantity: e.target.value })
                }
              />
              <input
                type="file"
                onChange={(e) =>
                  setEditData({ ...editData, image: e.target.files[0] })
                }
              />
            </form>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={editHandleClose} variant="outlined" color="secondary">Cancel</Button>
          <Button onClick={()=>handleEdit()} variant="contained" color="success">Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
