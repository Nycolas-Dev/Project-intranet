import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useContext } from "react";


import Login from "./views/login/Login.jsx";
import Create from "./views/create/Create.jsx";
import Modify from "./views/modify/Modify.jsx";
import Home from "./views/home/Home.jsx";
import List from "./views/list/List.jsx";
import { AuthContext } from "./context/AuthContext.jsx";
import "./app.css";

function App() {

  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={user !== null ? (<Navigate replace to="/" />) : (<Login />)}/>
        <Route path="/" element={user === null ? (<Navigate replace to="/login" />) : (<Home />)}/>
        <Route path="/create" element={user === null || user.isAdmin === false ? (<Navigate replace to="/login" />) : (<Create />)}/>
        <Route path="/modify" element={user === null ? (<Navigate replace to="/login" />) : (<Modify />)}/>
        <Route path="/list" element={user === null ? (<Navigate replace to="/login" />) : (<List />)}/>

        {/* <Route path="/test" element={user.isAdmin === true ? (<Create />) : (<Create />)}/> */}

        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Router>
  );
}

export default App;
