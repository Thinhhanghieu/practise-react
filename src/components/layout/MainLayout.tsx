import React from "react";
import { Link, Outlet } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const MainLayout: React.FC = () => {
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#686666' }}>
        <Container>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              My Page
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar /> {/* Spacer to push content below the AppBar */}
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'start', mt: 2, mb: 2 }}>
          <Button
            component={Link}
            to="/reducer"
            variant="contained"
            color="primary"
          >
            Reducer Form
          </Button>
          <Button
            component={Link}
            to="/formilk"
            variant="contained"
            color="secondary"
            sx={{ mx: 1 }}
          >
            React Formik
          </Button>
        </Box>
        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;
