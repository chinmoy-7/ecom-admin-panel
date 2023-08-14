import React, { useState,useEffect, useContext, useMemo } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Button, Grid, Box, Avatar, Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import AddIcon from '@mui/icons-material/Add';
import jwtDecode from "jwt-decode";
import { dashboardContext } from "../../context/DashBoardContext";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
export const TestNav = () => {
  const navigate=useNavigate()
    const {getUserInfo,userInfo}=useContext(dashboardContext)
  const [collapsed, setCollapsed] = useState(true);
  const handleLogout=()=>{
    sessionStorage.clear()
    navigate("/")
    
  }
  return (
    <Box height={"100vh"} bgcolor={"#1c2536"}>
      <Box display={"flex"} flexDirection={"column"} height={"20%"} justifyContent={"space-around"} alignItems={"center"} bgcolor={""}>
      <Button 
              onClick={() => {
                setCollapsed(!collapsed);
              }}
              variant="outlined"
            >
              =
            </Button>
            {/* <Avatar> */}
            <IconButton>
                <AccountCircleIcon color="primary" />
                </IconButton>
            {/* </Avatar> */}
        <Typography variant="h6" sx={{color:"white"}}>{userInfo.name}</Typography >
      </Box>
      <Box
        justifyContent={"center"}
        alignItems={"center"}
        height={"60%"}
        bgcolor={""}
      >
        <Sidebar rootStyles={{color:"#58606d" ,fontSize:"1.2rem"}} backgroundColor="#1c2536" collapsed={collapsed} transitionDuration={800}>
          <Menu>
 
            <MenuItem rootStyles={{":hover":{
                color:"black"
            }}} icon={<ShoppingCartIcon color="primary"/>}> List Item</MenuItem>
            <MenuItem icon={<AddIcon color="primary"/>}> Add Item</MenuItem>
            <MenuItem icon={<ShoppingCartIcon color="primary"/>}> Calender </MenuItem>
          </Menu>
        </Sidebar>
      </Box>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"} height={"20%"} width={"100%"}>
        <Button height="20%" width="50%" variant="contained" color="warning" sx={{color:"wheat"}} onClick={handleLogout}>Logout</Button>
      </Box>
    </Box>
  );
};
