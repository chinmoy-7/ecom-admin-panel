import React, { useContext, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LockIcon from '@mui/icons-material/Lock';
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
  Button,
  LinearProgress
} from "@mui/material";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { signupSchema } from "../schemas";
import { authContext } from "../context/AuthContext";
export const Signup = () => {
    const {handleSignup,loading} = useContext(authContext)
    const initialValues={
        name:"",
        email:"",
        password:"",
        confirm_password:"",
        secret:""
    }
    const {handleSubmit,touched,errors,handleChange,values,handleBlur}=useFormik({
        initialValues:initialValues,
        validationSchema:signupSchema,
        onSubmit:()=>{
            handleSignup(values)
        }
    })

    // console.log(errors)
  return (
    <>
    <form
     onSubmit={handleSubmit}
     >
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
            <Typography variant="h5">Sign Up</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              color="secondary"
            //   onChange={(e)=>setCred({...cred,email:e.target.value})}
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={errors["name"]!=""&&touched.name!=""?errors.name:null}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email Address"
              variant="outlined"
              color="secondary"
            //   onChange={(e)=>setCred({...cred,email:e.target.value})}
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={errors.email!=""&&touched.email!=""?errors.email:null}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth

              label="Password"
              name="password"
              type="password"
              variant="outlined"
              color="secondary"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <VisibilityIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            //   onChange={(e)=>setCred({...cred,password:e.target.value})}
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={errors["password"]!=""&&touched.password!=""?errors.password:null}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
 
              label="Confirm Password"
              name="confirm_password"
              type="text"
              variant="outlined"
              color="secondary"
              value={values.confirm_password}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={errors["confirm_password"]!=""&&touched.confirm_password!=""?errors.confirm_password:null}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Secret Admin Key(optional)"
              type="text"
              variant="outlined"
              color="secondary"
              name="secret"
            //   onChange={handleChange}
            value={values.secret}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={errors["secret"]!=""&&touched.secret!=""?errors.secret:null}
            />
            <h3>Secret key for admin is access "abcd"</h3>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" 
            // onClick={handleLogin}    
            variant="contained" color="primary" fullWidth>

              Sign In
            </Button>
            <Grid display={`${loading==true?"":"none"}`}>
              <LinearProgress></LinearProgress>
              </Grid>
          </Grid>
          <Grid  item xs={12}>
              <Link to="/" style={{color:"blue"}} color={"primary"}>Already have an Account? Login</Link>
          </Grid>
        </Grid>
      </Box>
      </form>
    </>
  );
};
