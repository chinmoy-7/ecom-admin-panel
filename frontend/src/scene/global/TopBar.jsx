import React from 'react'
import { Box, Typography,IconButton } from '@mui/material'
import StorefrontIcon from '@mui/icons-material/Storefront';
export const TopBar = () => {
  return (
    <Box width={"100%"} display={"flex"} height={"100%"} bgcolor={""} justifyContent={"center"} alignItems={"center"}>
        <IconButton>
            <StorefrontIcon/>
        </IconButton>
        <Typography variant='h5' fontFamily={"sans-serif"}  >E-COM Dashboard </Typography>
    </Box>
  )
}
