import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import GuessItemPage from "./pages/GuessItemPage";
import HomePage from "./pages/HomePage";
import logo from "./assets/logo.png";
import "./App.css";

function App() {
  return (
    <Router>
      <Link className="logo" to="/">
        <img className="logo" src={logo} alt="" />
      </Link>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/items" element={<GuessItemPage />} />
      </Routes>
    </Router>
  );
}

export default App;
