import Navbar from "../../components/Navigation.jsx";      <Navbar />
import Card from "../../components/Card.jsx";
import './home.css';
import { Button } from "@mui/material";

const Home = () => {
  return (
    <div>
      <h1>Bienvenue sur l'Intranet</h1>
      <p className="hp">
        La plateforme de l'entreprise qui vous permet de retrouver tous vos
        collaborateurs
      </p>
      <h2>Avez-vous dit bonjour à :</h2>
      <Navbar />
      <Card />
      <button className="btn-home">Dire bonjour à quelqu'un d'autre</button>
    </div>
  );
};

export default Home;
