import Navbar from "../../components/Navigation.jsx";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";

import axios from "axios";

const List = () => {
  const [users, setUsers] = useState([]);
  const [dateString, setDateString] = useState(null);

  const getCookie = (name) => {
    const cookie = document.cookie.split(";").find(c => c.trim().startsWith(name + "="));
    if (!cookie) return undefined;
    return cookie.split("=")[1];
  };
  
  const access_token = getCookie("access_token");
  
  const config = {
    headers: {
      "access_token": `${access_token}`
    },
    withCredentials: true
  };
  
  useEffect(() => {
    axios.get("http://localhost:8000/api/users", config).then(({ data }) => {
      console.log(data);
      setUsers(data);
      setDateString(data.birthdate)


    });
  }, []);

  if (!users.length) {
    return <div>Loading...</div>;
  }

  // if (!dateString) {
  //   return <div>Loading...</div>;
  // }

  const date = new Date(dateString);

  const today = new Date();
  const ageInMilliseconds = today - date;
  const ageInYears = ageInMilliseconds / 1000 / 60 / 60 / 24 / 365.25;

  return (
    <div>
      <Navbar />

      <div style={{display: "flex", flexWrap: "wrap", margin: "250px 0 30px 0", justifyContent: "center"}}>
        {users.map((user, index) => (
          <Card sx={{ minWidth: 500, maxHeight: 200, margin: "10px" }} key={index}>
            <Grid container>
              <Grid item xs={5}>
                <CardMedia
                  sx={{ height: 200, maxWidth: 180 }}
                  image={user.photo}
                  title="Owen Lopez"

                />
              </Grid>
              <Grid item xs={6}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {user.firstname} {user.lastname} 
                    (
                  {Math.floor(ageInYears)})
                  </Typography>
                  <Typography variant="h6" component="div">
                    {user.category}
                  </Typography>
                  <Typography component="div">
                    {user.city}, {user.country}
                  </Typography>
                  <Link variant="button" component="div">
                    {user.email}
                  </Link>{" "}
                  <br />
                  <Link variant="button" component="div">
                    {user.phone}
                  </Link>
                  <Typography component="div">
                    Anniversaire: {date.getMonth() + 1}/{date.getDate()}/
                  {date.getFullYear()}
                  </Typography>
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
