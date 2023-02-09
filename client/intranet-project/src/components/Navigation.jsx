import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import LanIcon from "@mui/icons-material/Lan";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const Navigation = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  const handleRedirect = () => {
    window.location.assign("/list");
  };

  // Navigate to modify form
  const handleCreate = () => {
    navigate("/create");
  };

  // Use AuthContext to logout
  const handleClick = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  // Navigate to login page
  const handleToLogin = () => {
    navigate("/login");
  };

  return (
    <div style={{ maxWidth: "100%" }}>
      <AppBar
        position="fixed"
        style={{
          background: "linear-gradient(to bottom, #f76e6e, #ef4446, #ec4893)",
        }}
      >
        <Toolbar>
          <LanIcon />
          <Link to="/" className="btn btn-primary" style={{ color: "#fff" }}>
            Intranet
          </Link>

          {user ? (
            <div  style={{ marginLeft: "auto" }}>
              <Button
                color="inherit"
               
                onClick={handleRedirect}
              >
                <FormatListBulletedIcon /> Liste
              </Button>
              {user.isAdmin ? (<Button
                color="inherit"
               
                onClick={handleCreate}
              >
                <PersonIcon /> Ajouter
              </Button>) : ''}
              <Button color="inherit" onClick={handleClick}>
                Déconnexion
              </Button>
            </div>
          ) : (
            <Button color="inherit" onClick={handleToLogin} style={{ marginLeft: "auto" }}>
              Connexion
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navigation;
