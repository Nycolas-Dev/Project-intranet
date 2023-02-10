import React, { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { AuthContext } from "../context/AuthContext.jsx";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";

const Form = (props) => {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState(
    props.formData
      ? props.formData
      : {
          firstname: "",
          lastname: "",
          gender: "",
          birthdate: "",
          city: "",
          country: "",
          phone: "",
          category: "",
          email: "",
          password: "",
          photo: "",
          isAdmin: false,
        }
  );

  const [admin, setAdmin] = useState(formData.isAdmin);

  useEffect(() => {
    if (props.formData) {
      const formData = { ...props.formData };
      delete formData.password;
      setFormData(formData);
    }
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData, 
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!props.formData && !formData.password) {
      alert("Le mot de passe est requis.");
      return;
    } else if (formData.password === formData.confirm) {
      formData.isAdmin = admin;
      props.onSubmit(formData);
    } else {
      alert("Les mots de passe ne correspondent pas. Veuillez réessayer.");
      return;
    }
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
            <InputLabel id="genderlabel">Civilité</InputLabel>
            <Select
              labelId="genderlabel"
              required
              id="gender"
              name="gender"
              label="Civilité"
              value={formData.gender}
              onChange={handleChange}
            >
              <MenuItem value={"male"}>Male</MenuItem>
              <MenuItem value={"female"}>Female</MenuItem>
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
            <InputLabel id="categorylabel">Category</InputLabel>
            <Select
              labelId="categorylabel"
              id="category"
              name="category"
              label="Categorie"
              required
              value={formData.category}
              onChange={handleChange}
            >
              <MenuItem value={"Marketing"}>Marketing</MenuItem>
              <MenuItem value={"Client"}>Client</MenuItem>
              <MenuItem value={"Technique"}>Technique</MenuItem>
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
            label="Mot de passe"
            type="password"
            id="password"
            autoComplete="new-password"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="confirm"
            label="Confirmation mot de passe"
            type="password"
            id="confirm"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="photo"
            label="Photo"
            id="photo"
            value={formData.photo}
            onChange={handleChange}
          />
        </Grid>
        {user.isAdmin ? (
          <FormControl
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
              paddingLeft: 16,
            }}
          >
            <FormLabel id="demo-row-radio-buttons-group-label">
              Admin :
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                control={<Radio />}
                label="Yes"
                value={true}
                checked={admin === true}
                onChange={() => setAdmin(true)}
              />
              <FormControlLabel
                control={<Radio />}
                label="No"
                value={false}
                checked={admin === false}
                onChange={() => setAdmin(false)}
              />
            </RadioGroup>
          </FormControl>
        ) : (
          ""
        )}
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        style={{
          background: "linear-gradient(to bottom, #f76e6e, #ef4446, #ec4893)",
        }}
      >
        Valider
      </Button>
    </Box>
  );
};

export default Form;
