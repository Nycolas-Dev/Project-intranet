import React, {useState, useEffect} from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LanIcon from '@mui/icons-material/Lan';

const Navigation = () => {
  const [isConnected, setIsConnected] = useState(false);

  // const getCookie = (name) => {
  //   const value = `; ${document.cookie}`;
  //   const parts = value.split(`; ${name}=`);
  //   if (parts.length === 2) return parts.pop().split(';').shift();
  // }
  // const accessToken = getCookie('access_token');


  const handleClick = () => {
    setIsConnected(!isConnected);
  };

  return (
    <div style={{ maxWidth: '100%' }}>
      <AppBar position="fixed" style={{ background: 'linear-gradient(to bottom, #f76e6e, #ef4446, #ec4893)' }}>
        <Toolbar>
        <LanIcon />
          <Typography variant="h6">Intranet</Typography>
          <Button color="inherit" style={{marginLeft: 'auto'}} onClick={handleClick}>
            {isConnected ? 'Liste' : ''}
          </Button>
          <Button color="inherit" style={{marginLeft: 'auto'}} onClick={handleClick}>
            {isConnected ? 'Déconnexion' : 'Connexion'}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navigation;