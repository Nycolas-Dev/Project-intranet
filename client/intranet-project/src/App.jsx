import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";


import Login from "./views/login/Login.jsx";
import Create from "./views/create/Create.jsx";
import Modify from "./views/modify/Modify.jsx";
import Home from "./views/home/Home.jsx";
import List from "./views/list/List.jsx";
import "./app.css";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<Create />} />
        <Route path="/modify" element={<Modify />} />
        <Route path="/list" element={<List />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
