import { Link } from "react-router-dom";
import "../styles/HomePage.css";
import guess_the_item from "../assets/Guess_the_Item.png";
import guess_the_boss from "../assets/Gues_the_boss.png";
import guess_the_character from "../assets/Guess_Character.png";
import Rkey from "../assets/Rkey.png";

export default function HomePage() {
    return (
        <div className="menu">
            <div className="links">
                <h1>The Isaacdle</h1>
                <Link className="link" to={"/items"}>
                    <img src={guess_the_item} alt="" />
                </Link>

                <Link className="link" to={"/items"}>
                    <img src={guess_the_character} alt="" />
                </Link>

                <Link className="link" to={"/boss"}>
                    <img src={guess_the_boss} alt="" />
                </Link>
            </div>
            <div className="rkey">
                <img className="rkey" src={Rkey} alt="" />
            </div>
        </div>
    );
}
