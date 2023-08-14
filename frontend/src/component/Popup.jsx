import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Grid, TextField } from '@mui/material';
import { dashboardContext } from '../context/DashBoardContext';
import LinearProgress from '@mui/material/LinearProgress';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({open}) {
    const {formData,setFormData,addItem,isLoading}=React.useContext(dashboardContext)
  return (
    <div>
      <Dialog
        open={open.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={open.handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Add new Item</DialogTitle>
        <DialogContent>
        <form > 
            <TextField variant='outlined' label="Product Name" margin='dense' id="product_name" onChange={(e)=>{setFormData({...formData,product_name:e.target.value})}} fullWidth/>
            <TextField variant='outlined' label="Price" margin='dense' id="price" onChange={(e)=>{setFormData({...formData,price:e.target.value})}} fullWidth/>
            <TextField variant='outlined' label="Description" margin='dense' id="desc" onChange={(e)=>{setFormData({...formData,description:e.target.value})}} fullWidth/>
            <TextField variant='outlined' label="Quantity" margin='dense' id="quantity" onChange={(e)=>{setFormData({...formData,quantity:e.target.value})}} fullWidth/>
            <input type="file" onChange={(e)=>{setFormData({...formData,image:e.target.files[0]})}}/>
        </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={open.handleClose} variant='outlined' color='warning'>Cancel</Button>
          <Button onClick={addItem} variant='contained' color='primary'>Submit</Button>
        </DialogActions>
        <Grid display={`${isLoading?"":"none"}`}>
        <LinearProgress></LinearProgress>
        </Grid>
      </Dialog>
    </div>
  );
}
