import Navbar from "../../components/Navigation.jsx";
import Card from "../../components/Card.jsx";
import './home.css';



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
      
    </div>
  );
};

export default Home;
