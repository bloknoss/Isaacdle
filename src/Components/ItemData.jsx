import "../styles/SquareBox.css";

function getColor(guess, real) {
    guess = String(guess);
    real = String(real);

    return guess.toLowerCase() === real.toLowerCase() ? "green" : "red";
}

function Images({ guess }) {
    return guess.pools[0] != "None" ? (
        guess.pools_images.map((img, index) => (
            <div
                key={index}
                style={{
                    display: "flex",
                    textAlign: "center",
                    justifyContent: "center",
                }}
            >
                <img style={{ width: "12px" }} src={img[0]}></img>
                <img style={{ width: "12px" }} src={img[1]}></img>
            </div>
        ))
    ) : (
        <span>None</span>
    );
}

function compareImages(item1, item2) {}

export default function ItemData({ guess, real }) {
    return (
        <div className="square-container">
            <div className="square">
                <img src={guess.image} alt="" />
            </div>
            <div style={{ backgroundColor: getColor(guess.type, real.type) }} className="square">
                <span>{guess.type}</span>
            </div>
            <div style={{ backgroundColor: getColor(guess.tier, real.tier) }} className="square">
                <span>{guess.tier}</span>
            </div>
            <div
                style={{
                    backgroundColor: getColor(guess.transformations, real.transformations),
                }}
                className="square"
            >
                <span>{guess.transformations}</span>
            </div>
            <div style={{ backgroundColor: getColor(guess.pools, real.pools) }} className="square">
                <div style={{ alignItems: "center", textAlign: "center", top: "50%" }}>
                    <Images guess={guess}></Images>
                </div>
            </div>
            <div
                style={{
                    backgroundColor: getColor(guess.character, real.character),
                }}
                className="square"
            >
                <span>{guess.character}</span>
            </div>

            <div
                className="square"
                style={{
                    backgroundColor: getColor(guess.unlock_method, real.unlock_method),
                }}
            >
                <span>{guess.unlock_method}</span>
            </div>
        </div>
    );
}
