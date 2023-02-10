import Navbar from "../../components/Navigation.jsx";
import CardComponent from "../../components/CardComponent.jsx";
import React, { useState, useEffect } from "react";
import axios from "axios";

import "./list.css";

const List = () => {
  const [users, setUsers] = useState([]);
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

  useEffect(() => {
    axios.get("http://localhost:8000/api/users", {withCredentials: true}).then(({ data }) => {
      const formattedData = data.map((user) => {
        return {
          ...user
        };
      });
      setUsers(formattedData);
    });
  }, []);

  const filteredData = users.filter((user) => {
    if (city === "Nom") {
      const fullName = user.firstname + ' ' + user.lastname;
      const fullNameReverse = user.lastname + ' ' + user.firstname;
      return (
        (user.lastname.toLowerCase().includes(search.toLowerCase()) &&
          user.category.includes(category)) ||
        (user.firstname.toLowerCase().includes(search.toLowerCase()) &&
          user.category.includes(category)) ||
        (fullName.toLowerCase().includes(search.toLowerCase()) &&
        user.category.includes(category)) ||
        (fullNameReverse.toLowerCase().includes(search.toLowerCase()) &&
        user.category.includes(category))
      );
    } else {
      return (
        (user.city.toLowerCase().includes(search.toLowerCase()) &&
          user.category.includes(category)) ||
        (user.country.toLowerCase().includes(search.toLowerCase()) &&
          user.category.includes(category))
      );
    }
  });

  const handleDelete = async (id) => {
    setUsers(users.filter((user) => user._id !== id));
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
        {filteredData.map((item) => (
          <CardComponent user={item} index={item._id} handleDeleteParent={handleDelete}/>
        ))}
      </div>
    </div>
  );
};

export default List;
