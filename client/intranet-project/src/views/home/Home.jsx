import Navbar from "../../components/Navigation.jsx";
import CardComponent from "../../components/CardComponent.jsx";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import './home.css';



const Home = () => {
  const [user, setUser] = useState();

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

  const handleClick = async () => {
    await fetchData();
  };

  async function fetchData() {
    const response = await axios.get(`http://localhost:8000/api/users/random`, config);
    setUser(response.data);
  }

  const handleDelete = async (id) => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Bienvenue sur l'Intranet</h1>
      <p className="hp">
        La plateforme de l'entreprise qui vous permet de retrouver tous vos
        collaborateurs
      </p>
      <h2>Avez-vous dit bonjour à :</h2>
      <Navbar />
      {user ? (
      <CardComponent index={user._id} user={user} handleDeleteParent={handleDelete}/>
      ) : (
        <div>Loading...</div>
      )}
      <button className="btn-home" onClick={handleClick}>
        Dire bonjour à quelqu'un d'autre
      </button>
    </div>
  );
};

export default Home;
