import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Google Flights Clone
        </Typography>
        <Button color="inherit" component={Link} to="/flights">
          Home
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
