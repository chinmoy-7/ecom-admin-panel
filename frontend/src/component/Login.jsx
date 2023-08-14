import React, { useContext, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LockIcon from '@mui/icons-material/Lock';
import LinearProgress from '@mui/material/LinearProgress';
import axios from "axios";
import {
  Box,
  Grid,
  FormControl,
  FormControlLabel,
  FormGroup,
  TextField,
  InputAdornment,
  IconButton,
  Avatar,
  Typography,
  Button
} from "@mui/material";
import { Link } from "react-router-dom";
import { authContext } from "../context/AuthContext";
import { useFormik } from "formik";
import { loginSchema } from "../schemas";


export const Login = () => {
    const auth = useContext(authContext)
    const [visibility,setVisibility]=useState(false)//password visible button status

    //form validation
    const initialValues={
        email:"",
        password:""
    }
    const {handleSubmit,touched,errors,handleChange,values} = useFormik({
        initialValues:initialValues,
        validationSchema:loginSchema,
        onSubmit:()=>{
            auth.handleLogin(values)
        }
    })


  return (
    <>
    <form onSubmit={handleSubmit}> 
      <Box
        height={"100vh"}
        bgcolor={""}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid
          container
          maxWidth={{ xs: "80vw", lg: "30vw" }}
          direction={"column"}
          gap={3}
        >
          <Grid item xs={12} alignSelf={"center"} justifyItems={"center"}>
            <Avatar sx={{ margin: "auto" }}>
                <IconButton>
                    <LockIcon color="secondary"/>
                </IconButton>
            </Avatar>
            <Typography variant="h5">Sign In</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email Address"
              variant="outlined"
              color="secondary"
              name="email"
            //   onChange={(e)=>auth.setCred({...auth.cred,email:e.target.value})}
            onChange={handleChange}
            
            helperText={errors["email"]!=""?errors.email:""}
            
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="password"
              label="Password"
              type={visibility?"text":"password"}
              variant="outlined"
              color="secondary"
              onMouseDown={()=>setVisibility(true)}
              onMouseUp={()=>setVisibility(false)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <VisibilityIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            //   onChange={(e)=>auth.setCred({...auth.cred,password:e.target.value})}
            onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" 
            // onClick={auth.handleLogin}
             variant="contained" color="primary" fullWidth>
              Sign In
            </Button>
          </Grid>
          <Grid item xs={12} display={`${auth.loading==true?"":"none"}`}>
              <LinearProgress></LinearProgress>
          </Grid>
          <Grid  item xs={12}>
              <Link to="/signup" style={{color:"blue"}} color={"primary"}>Dont have an Account?Signup</Link>
          </Grid>
        </Grid>
      </Box>
      </form>
    </>
  );
};
