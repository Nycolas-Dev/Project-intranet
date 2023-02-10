import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

import "../views/list/list.css";

import axios from "axios";

const CardComponent = (props) => {
  const [item, setUsers] = useState(props.user);
  const { handleDeleteParent } = props;
  const [index, setIndex] = useState(props.index);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setUsers(props.user);
  }, [props.user]);

  useEffect(() => {
    setIndex(props.index);
  }, [props.index]);
  
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
    return roundedAge;
  };

  // Navigate to modify form
  const handleModify = (item) => {
    const birthdate = new Date(item.birthdate).toISOString().substring(0, 10);
    item.birthdate = birthdate;
    navigate("/modify", { state: { item } });
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8000/api/users/${id}`, {withCredentials: true});
    handleDeleteParent(id);
  };

  return (
    <Card
      sx={{ minWidth: 500, maxHeight: 200, margin: "10px" }}
      key={index}
      style={{ position: "relative" }}
    >
      <Grid container>
        <Grid item xs={5} style={{ maxWidth: 180 }}>
          <CardMedia
            sx={{ height: 200, maxWidth: 180 }}
            image={item.photo}
            title="Owen Lopez"
          />
        </Grid>
        <Grid item xs={7} style={{ textAlign: "left" }}>
          <CardContent>
            <Typography
              variant="h6"
              component="div"
              style={{ fontWeight: "bold", fontSize: 18 }}
            >
              {item.firstname} {item.lastname} (
              {displayAge(item.birthdate)})
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
            <Link to={`mailto:${item.email}`} className="rose">
              {item.email}
            </Link>
            <br />
            <Link to={`tel:${item.phone}`} className="rose">
              {item.phone}
            </Link>
            <Typography component="div" className="loc">
              Anniversaire: {displayDate(item.birthdate)}
            </Typography>
            {user.isAdmin ? (
              <div>
                <Button
                  color="inherit"
                  onClick={() => handleModify(item)}
                  className="btn-admin"
                >
                  Éditer
                </Button>
                <Button
                  color="inherit"
                  onClick={() => handleDelete(item._id)}
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
  );
};

export default CardComponent;
