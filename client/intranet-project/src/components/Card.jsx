import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

export default function MediaCard() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [dateString, setDateString] = useState(null);

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if(!user){
      navigate("/login")
    }
  }, []);

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
    async function fetchData() {
      const response = await axios.get("http://localhost:8000/api/users", config);
      setUsers(response.data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (users.length === 0) return;

    const randomIndex = Math.floor(Math.random() * users.length);
    setSelectedUser(users[randomIndex]);
    setDateString(users[randomIndex].birthdate);
  }, [users]);

  const handleClick = () => {
    if (users.length === 0) return;

    const randomIndex = Math.floor(Math.random() * users.length);
    setSelectedUser(users[randomIndex]);
    setDateString(users[randomIndex].birthdate);
  };

  if (!dateString) {
    return <div>Loading...</div>;
  }

  const date = new Date(dateString);

  const today = new Date();
  const ageInMilliseconds = today - date;
  const ageInYears = ageInMilliseconds / 1000 / 60 / 60 / 24 / 365.25;

  return (
    <div>
      {selectedUser ? (
        <Card
          sx={{ minWidth: 500, maxHeight: 200 }}
          style={{ margin: "0 auto" }}
        >
          <Grid container>
            <Grid item xs={5}>
              <CardMedia
                sx={{ height: 200, maxWidth: 180 }}
                image={selectedUser.photo}
                title="Owen Lopez"
              />
            </Grid>
            <Grid item xs={6}>
              <CardContent>
                <Typography variant="h6" component="div">
                  {selectedUser.firstname} {selectedUser.lastname} (
                  {Math.floor(ageInYears)})
                </Typography>
                <Typography variant="h6" component="div">
                  {selectedUser.category}
                </Typography>
                <Typography component="div">
                  {selectedUser.city}, {selectedUser.country}
                </Typography>
                <Link variant="button" component="div">
                  {selectedUser.email}
                </Link>{" "}
                <br />
                <Link variant="button" component="div">
                  {selectedUser.phone}
                </Link>
                <Typography component="div">
                  Anniversaire: {date.getMonth() + 1}/{date.getDate()}/
                  {date.getFullYear()}
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      ) : (
        <div>Loading...</div>
      )}

      <button className="btn-home" onClick={handleClick}>
        Dire bonjour à quelqu'un d'autre
      </button>
    </div>
  );
}
