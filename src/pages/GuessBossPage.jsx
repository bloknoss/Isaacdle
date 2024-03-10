import { useEffect, useState, useRef } from "react";
import "../styles/GuessBossPage.css";

function ScrollTopContainer({ boss, data, bossComponents }) {
  const containerRef = useRef(null); // Step 1: Create a ref

  const refreshScroll = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollTop - container.scrollHeight; // Scroll to the top
    }
  };

  useEffect(() => {
    refreshScroll(); // Step 2: Call this function whenever data changes
  }, [data, bossComponents]); // Depend on data and itemComponents

  return (
    <div className="container" style={{}}>
      {data && <>{data === boss.name ? <h1 style={{ color: "green" }}>Right Guess!!</h1> : <h1 style={{ color: "red" }}>Wrong Guess!!</h1>}</>}
    </div>
  );
}

export default function GuessBossPage() {
  const [zoom, setZoom] = useState(2.2);
  const [data, setData] = useState(null);
  const [boss, setBoss] = useState([]);
  const [original, setOriginalBoss] = useState([]);
  const [bosses, setBosses] = useState([]);
  const [formValue, setFormValue] = useState({ bossName: "" });
  const [suggestions, setSuggestions] = useState([]);
  const [bossComponents, setBossComponents] = useState([]);

  const addBossComponent = (newGuess, newReal) => {
    const newBossData = { guess: newGuess, real: newReal };
    setBossComponents((prev) => [...prev, newBossData]);
  };

  useEffect(() => {
    //Creamos un numeor random para escoger un boss random
    const rnd = parseInt(Math.random() * 99);
    //Hacemos fetch a la api y cogemos un la silueta de un boss random
    fetch(`/api/bosses`)
      .then((res) => res.json())
      .then((data) => setBoss(data.silhouette[rnd]));

    fetch(`/api/bosses`)
      .then((res) => res.json())
      .then((data) => setOriginalBoss(data.original[rnd]));

    //Hacemos un fetch a la api y cogemos todos los bosses
    fetch(`/api/bosses/`)
      .then((res) => res.json())
      .then((data) => {
        setBosses(data.original);
      });
  }, []);

  //Cuando pulsa en el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    //Bajamos el zoom cada vez que no acertamos una
    if (zoom > 1) {
      setZoom(zoom - 0.1);
    }

    if (bosses.some((boss) => boss.name.toLowerCase().trim() == formValue.bossName.toLowerCase().trim())) {
      const guessBoss = formValue.bossName;

      setData(guessBoss);

      addBossComponent(guessBoss, boss);
      setBosses(bosses.filter((x) => x.name !== guessBoss.name));
      if (boss.name === formValue.bossName) {
        setBoss(original);
        setZoom(1)
      }

      setFormValue({ ...formValue, bossName: "" });
      setSuggestions([]);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
    const filteredSuggestions = [...bosses].filter((option) => option.name.toLowerCase().includes(value.toLowerCase()));

    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (value) => {
    setFormValue({ ...formValue, bossName: value.name });
    setSuggestions([]);
  };

  return (
    <>
      <div className="contenedor">
        <div style={{ background: "white", border: "1px red solid", borderColor: "red" }} className="contenedorBoss">
          {boss && <img style={{ zoom: zoom }} draggable="false" className="imagenBoss" src={"http://localhost:8080" + boss.filepath} alt="" />}
        </div>
      </div>

      <div className="container" style={{ overflow: "hidden", height: "80px" }}>
        <div style={{ textWrap: "wrap", display: "flex", flexDirection: "column" }}>
          <label htmlFor="bossName">Boss Name</label>
          <form onSubmit={handleSubmit}>
            <input name="bossName" value={formValue.bossName} onChange={handleInput} autoComplete="off" type="text" />
            {suggestions.length > 0 && (
              <ul className="suggestions-list">
                {suggestions.map((suggestion, index) => (
                  <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                    <img style={{ width: "32px" }} src={"http://localhost:8080" + suggestion.filepath} alt="" />
                    <span>{suggestion.name}</span>
                  </li>
                ))}
              </ul>
            )}
            <input type="image" name="submit" src="src/assets/enter.png" className="enter-button" />
          </form>
        </div>
      </div>
      {data && <ScrollTopContainer boss={boss} data={data} bossComponents={bossComponents} />}
    </>
  );
}
