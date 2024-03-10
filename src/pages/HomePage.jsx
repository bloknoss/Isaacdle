import { Link } from "react-router-dom";
import "../styles/HomePage.css";
import hoverOptionSound from "../assets/audios/hover_option.wav";
import guess_the_item from "../assets/Guess_the_Item.png";
import guess_the_boss from "../assets/Gues_the_boss.png";
import guess_the_character from "../assets/Guess_Character.png";
import Rkey from "../assets/Rkey.png";
import { useEffect, useState, useMemo } from "react";

export default function HomePage() {
  const audio = useMemo(() => new Audio(hoverOptionSound), []);
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    audio.volume = 0.1;
  }, []);

  useEffect(() => {
    console.log("NO");
    playing ? audio.play() : audio.pause();
  }, [playing]);

  return (
    <div className="menu">
      <div className="links">
        <h1>The Isaacdle</h1>
        <Link className="menu-option ink" to={"/items"}>
          <img onMouseEnter={toggle} src={guess_the_item} alt="" />
        </Link>

        <Link onMouseEnter={toggle} className="menu-option link" to={"/boss"}>
          <img src={guess_the_boss} alt="" />
        </Link>
      </div>
      <div className="rkey">
        <img className="rkey" src={Rkey} alt="" />
      </div>
    </div>
  );
}
