import React, { useState } from "react";
import { Box,Grid,Avatar, Typography,IconButton, Icon, Button} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
export const SideNav = () => {
  const [collapse, setCollapse] = useState(true);
  return (
    <Box width={{"lg":"100%"}} bgcolor={""}>
      <Grid container height={"100vh"} width={"100%"}>
        <Grid container height={"30%"}  bgcolor={""} maxWidth={"100%"} direction={"column"} justifyContent={"center"} gap={4} alignItems={"center"}  >
            <Avatar ></Avatar>
            <Typography  variant="body2" textAlign={"center"}  fontSize={{"sm":"1.5rem"}} component={"p"}  display={{"xs":"none", "sm":"flex"}}>Chinmoy </Typography>
        </Grid>
        <Grid container height={"70%"} direction={"column"} width={"100%"} bgcolor={""} justifyContent={"start"} gap={8}>
              <Grid container  direction={"row"} justifyContent={"center"} alignItems={"center"}>
                  <IconButton>
                      <ShoppingCartIcon/>
                  </IconButton>
                  <Typography>Home</Typography>
              </Grid>
              <Grid container  direction={"row"} justifyContent={"center"} alignItems={"center"}>
                  <IconButton>
                      <AddIcon/>
                  </IconButton>
                  <Typography>Home</Typography>
              </Grid>
              <Grid container  direction={"row"} justifyContent={"center"} alignItems={"center"}>
                  <IconButton>
                      <ShoppingCartIcon/>
                  </IconButton>
                  <Typography>Home</Typography>
              </Grid>
              <Grid container  direction={"row"} justifyContent={"center"} alignItems={"center"}>
                <Button variant="contained" color="warning" sx={{width:"50%"}}>Logout</Button>
              </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
