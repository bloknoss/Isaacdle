import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import BGMusic from "./assets/audios/bg_music.mp3";
import GuessItemPage from "./pages/GuessItemPage";
import GuessBossPage from "./pages/GuessBossPage";
import Megaphone from "./assets/megaphone.png";
import HomePage from "./pages/HomePage";
import logo from "./assets/logo.png";
import "./App.css";
import { useState, useEffect, useMemo } from "react";

function App() {
  const audio = useMemo(() => new Audio(BGMusic), []);
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    audio.volume = 0.1;
  }, []);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  return (
    <Router>
      <div>
        <img src={Megaphone} className="megaphone" onClick={toggle} />
      </div>
      <Link className="logo" to="/">
        <img className="logo" src={logo} alt="" />
      </Link>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/items" element={<GuessItemPage />} />
        <Route path="/boss" element={<GuessBossPage />} />
      </Routes>
    </Router>
  );
}

export default App;
