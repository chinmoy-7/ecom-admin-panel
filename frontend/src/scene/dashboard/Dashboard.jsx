import React, { useContext, useEffect } from 'react'
import {Box,Grid} from "@mui/material"
import { SideNav } from '../global/SideNav'
import { TestNav } from '../global/TestNav'
import { dashboardContext } from '../../context/DashBoardContext'
import { authContext } from '../../context/AuthContext'
import { TopBar } from '../global/TopBar'
import {Table} from "../global/Table"
export const Dashboard = () => {
  const {checkAuth} = useContext(authContext)
  useEffect(()=>{
    checkAuth()
  },[])

  return (
    <Box display={"flex"}>
          <Box>
              <TestNav/>
          </Box>
          <Box bgcolor={"#ffffff"} height={"100vh"} display={"flex"} width={"100%"} flexDirection={"column"}>
              <Box height={"10%"} width={"100%"} bgcolor={""}>
                <TopBar/>
              </Box>
              <Box height={"90%"} gap={2} bgcolor={""} display={"flex"} alignItems={"center"} flexDirection={"column"} justifyContent={"center"}>
                <Table/>
              </Box>
          </Box>
    </Box>
  )
}
