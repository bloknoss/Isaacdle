import "../styles/SquareBox.css";

function getColor(guess, real) {
    guess = String(guess);
    real = String(real);

    return guess.toLowerCase() === real.toLowerCase() ? "green" : "red";
}

export default function BossData({ guess, real }) {
    return (
        <div className="square-container">
            <div className="square">
                <img src={"localhost:8080" + guess.filepath} alt="" />
            </div>
            <div style={{ backgroundColor: getColor(guess, real.name) }} className="square">
                <span>{guess}</span>
            </div>
        </div>
    );
}
