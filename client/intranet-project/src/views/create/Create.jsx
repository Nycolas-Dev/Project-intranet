import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Navbar from "../../components/Navigation.jsx";
import Form from "../../components/Form.jsx";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";


const Create = () => {  
  const theme = createTheme();

  const handleSubmit = (data) => {
    console.log(data);
    // Faire ce que vous voulez avec les données du formulaire ici
  };


  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get("email"),
  //     password: data.get("password"),
  //   });
  // };

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
