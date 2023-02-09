import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Navbar from "../../components/Navigation.jsx";
import Form from "../../components/Form.jsx";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const Create = () => {  
  const theme = createTheme();
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    console.log("submit", data);
    try {
       axios.post("http://localhost:8000/api/auth/register",
        data, { withCredentials: true });
        navigate('/list');
    } catch (error) {
      console.log(error);
    }
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
            Ajouter un utilisateur
          </Typography>
          <Form onSubmit={handleSubmit}/>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Create;
