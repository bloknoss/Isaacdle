import { Link } from "react-router-dom";
import "../styles/HomePage.css";

export default function HomePage() {
  return (
    <div className="menu">
      <div className="links">
      <h1>The Isaacdle</h1>
        <Link className="link" to={"/items"}>
          Guess the Item
        </Link>

        <Link className="link" to={"/items"}>
          Guess Character
        </Link>

        <Link className="link" to={"/items"}>
          Guess the Boss
        </Link>

        <Link className="link" to={"/items"}>
          Guess by Emoji
        </Link>
      </div>
    </div>
  );
}
