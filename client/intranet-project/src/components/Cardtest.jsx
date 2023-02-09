import Navbar from "../../components/Navigation.jsx";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import "./list.css";

import axios from "axios";

const List = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [dateString, setDateString] = useState(null);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("Nom");
  const [category, setCategory] = useState("");

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const getCookie = (name) => {
    const cookie = document.cookie
      .split(";")
      .find((c) => c.trim().startsWith(name + "="));
    if (!cookie) return undefined;
    return cookie.split("=")[1];
  };

  const access_token = getCookie("access_token");

  const config = {
    headers: {
      access_token: `${access_token}`,
    },
    withCredentials: true,
  };

  useEffect(() => {
    axios.get("http://localhost:8000/api/users", config).then(({ data }) => {
      const formattedData = data.map((user) => {
        const birthdate = new Date(user.birthdate);
        return {
          ...user,
          birthdate: birthdate.toISOString().substring(0, 10),
         
        };
      });
      setUsers(formattedData);
      setDateString(data.birthdate);
    });
  }, []);

  const displayDate = (birthdate) => {
    const date = new Date(birthdate);
    const options = { month: "long" };
    const month = new Intl.DateTimeFormat("fr-FR", options).format(date);
    const day = date.getDate();
    return `${day} ${month}`;
  };

  const displayAge = (date) => {
    const bd = new Date(date);
    const today = new Date();
    const ageInMilliseconds = today - bd;
    const ageInYears = ageInMilliseconds / 1000 / 60 / 60 / 24 / 365.25;
    const roundedAge = Math.floor(ageInYears);
    return roundedAge
  };

  if (!users.length) {
    return <div>Loading...</div>;
  }

  const filteredData = users.filter((user) => {
    if (city === "Nom") {
      return (
        (user.lastname.toLowerCase().includes(search) &&
          user.category.includes(category)) ||
        (user.firstname.toLowerCase().includes(search) &&
          user.category.includes(category))
      );
    } else {
      return (
        (user.city.toLowerCase().includes(search) &&
          user.category.includes(category)) ||
        (user.country.toLowerCase().includes(search) &&
          user.category.includes(category))
      );
    }
  });

  // Navigate to modify form
  const handleModify = (user) => {
    navigate("/modify", { state: { user }});
 };

  // Navigate to modify form
  const handleDelete = async (id) => {
    await axios.delete(
      `http://localhost:8000/api/users/${id}`,
      config,
      { withCredentials: true }
    );
    window.location.reload();
  };


  return (
    <div
      style={{
        marginTop: "75px",
      }}
    >
      <Navbar />

      <div className="searchDiv">
        <input type="text" value={search} onChange={handleSearchChange} />

        <div>
          <label htmlFor="searchFilter">Rechercher par :</label>

          <select id="searchFilter" value={city} onChange={handleCityChange}>
            <option value="Nom">Nom</option>
            <option value="Localisation">Localisation</option>
          </select>
        </div>
        <div>
          <label htmlFor="category">Catégorie :</label>
          <select
            id="category"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="">All</option>
            <option value="Technique">Technique</option>
            <option value="Marketing">Marketing</option>
            <option value="Client">Client</option>
          </select>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          margin: "50px 0 30px 0",
          justifyContent: "center",
        }}
      >
        {filteredData.map((item, index) => (
          <Card
            sx={{ minWidth: 500, maxHeight: 200, margin: "10px" }}
            key={index}
            style={{ position: "relative" }}
          >
            <Grid container>
              <Grid item xs={5} style={{maxWidth: 180}}>
                <CardMedia
                  sx={{ height: 200, maxWidth: 180 }}
                  image={item.photo}
                  title="Owen Lopez"
                  
                />
              </Grid>
              <Grid item xs={6} style={{ textAlign: "left" }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    style={{ fontWeight: "bold", fontSize: 18 }}
                  >
                    {item.firstname} {item.lastname} ({displayAge(item.birthdate)})
                  </Typography>

                  {item.category === "Marketing" ? (
                    <Typography
                      variant="h6"
                      component="div"
                      id="cat"
                      className="category purple"
                    >
                      {item.category}
                    </Typography>
                  ) : item.category === "Client" ? (
                    <Typography
                      variant="h6"
                      component="div"
                      id="cat"
                      className="category green"
                    >
                      {item.category}
                    </Typography>
                  ) : (
                    <Typography
                      variant="h6"
                      component="div"
                      id="cat"
                      className="category blue"
                    >
                      {item.category}
                    </Typography>
                  )}

                  <Typography component="div" className="loc">
                    {item.city}, {item.country}
                  </Typography>
                  <Link to={`mailto:${item.email}`} className="rose" target="_blank">
                    {item.email}
                  </Link>
                  <br />
                  <Link to={`tel:${item.phone}`} className="rose" target="_blank">
                    {item.phone}
                  </Link>
                  <Typography component="div" className="loc">
                    Anniversaire: {displayDate(item.birthdate)}
                  </Typography>
                  {user.isAdmin ? (
                    <div>
                      <Button
                        color="inherit"
                        onClick={(e) => handleModify(item)}
                        className="btn-admin"
                      >
                        Éditer
                      </Button>
                      <Button
                        color="inherit"
                        onClick={(e) => handleDelete(item._id)}
                        className="btn-admin"
                      >
                        Supprimer
                      </Button>
                    </div>
                  ) : (
                    ""
                  )}
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default List;
