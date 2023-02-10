import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import "./list.css";


const List = () => {
  const { user } = useContext(AuthContext);

  return (
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
  );
};

export default List;
