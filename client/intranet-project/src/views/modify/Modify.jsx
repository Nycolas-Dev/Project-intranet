import React, { useState, useEffect, useContext } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Navbar from "../../components/Navigation.jsx";
import Form from "../../components/Form.jsx";
import Container from "@mui/material/Container";
import { useLocation } from 'react-router-dom';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from 'axios';
import { AuthContext } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";


const Modify = () => {  
  const { user, dispatch } = useContext(AuthContext);
  const location = useLocation();
  const [formData, setFormData] =  location.state ? useState(location.state.item) : useState(user);
  const navigate = useNavigate();
  const theme = createTheme();

  const handleSubmit = async (data) => {
    const res = await axios.put(`http://localhost:8000/api/users/${data._id}`, data, { withCredentials: true });
    if(!location.state){dispatch({ type: "LOGIN_SUCCESS", payload: data });};
    navigate('/list')
    console.log(res);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
      <Navbar />
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >

          <Typography component="h1" variant="h5">
            Modifier profil
          </Typography>
          <Form onSubmit={handleSubmit} formData={formData}/>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Modify;
