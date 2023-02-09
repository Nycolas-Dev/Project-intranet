import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const Form = (props) => {
    const [formData, setFormData] = useState(props.formData ? props.formData : {
        firstname: '',
        lastname: '',
        gender: '',
        birthdate: '',
        city: '', 
        country: '',
        phone: '',
        category: '',
        email: '',
        password: ''
      });
    
    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onSubmit(formData);
    };


  return (
    <Box
    component="form"
    noValidate
    onSubmit={handleSubmit}
    sx={{ mt: 3 }}
    >
    <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
        <TextField
            autoComplete="given-name"
            name="firstname"
            required
            fullWidth
            id="firstname"
            label="Prénom"
            autoFocus
            value={formData.firstname}
            onChange={handleChange}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
            required
            fullWidth
            id="lastname"
            label="Nom"
            name="lastname"
            autoComplete="family-name"
            value={formData.lastname}
            onChange={handleChange}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Civilité</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="gender"
            label="Civilité"
            value={formData.gender}
            onChange={handleChange}
            >
            <MenuItem value={'male'}>Male</MenuItem>
            <MenuItem value={'female'}>Female</MenuItem>
            </Select>
        </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
            required
            fullWidth
            id="birthdate"
            name="birthdate"
            autoComplete="birthdate"
            type="date"
            value={formData.birthdate}
            onChange={handleChange}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
            name="city"
            required
            fullWidth
            id="city"
            label="Ville"
            value={formData.city}
            onChange={handleChange}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
            required
            fullWidth
            id="country"
            label="Pays"
            name="country"
            autoComplete="country"
            value={formData.country}
            onChange={handleChange}
        />
        </Grid>
        <Grid item xs={12}>
        <TextField
            required
            fullWidth
            id="phone"
            label="Numéro de téléphone"
            name="phone"
            autoComplete="phone"
            value={formData.phone}
            onChange={handleChange}
        />
        </Grid>
        <Grid item xs={12}>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
            Category
            </InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Categorie"
            value={formData.category}
            onChange={handleChange}
            >
            <MenuItem value={'Marketing'}>Marketing</MenuItem>
            <MenuItem value={'Client'}>Client</MenuItem>
            <MenuItem value={'Technique'}>Technique</MenuItem>
            </Select>
        </FormControl>
        </Grid>
        <Grid item xs={12}>
        <TextField
            required
            fullWidth
            id="email"
            label="Adresse mail"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
        />
        </Grid>
        <Grid item xs={12}>
        <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
        />
        </Grid>
        <Grid item xs={12}>
        <TextField
            required
            fullWidth
            name="confirm"
            label="Confirm Password"
            type="password"
            id="confirm"
            value={formData.confirm}
            onChange={handleChange}
        />
        </Grid>
        <Grid item xs={12}>
        <TextField
            required
            fullWidth
            name="photo"
            label="photo"
            id="photo"
            value={formData.photo}
            onChange={handleChange}
        />
        </Grid>
    </Grid>
    <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
    >
        Sign Up
    </Button>
    </Box>
  );
}

export default Form;
