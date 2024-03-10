import { useEffect, useState, useRef } from "react";
import "../styles/GuessItemPage.css";
import ItemData from "../components/ItemData";
import Rkey from "../assets/Rkey.png";

function ScrollTopContainer({ item, data, itemComponents }) {
  const containerRef = useRef(null); // Step 1: Create a ref

  const refreshScroll = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollTop - container.scrollHeight; // Scroll to the top
    }
  };

  useEffect(() => {
    refreshScroll(); // Step 2: Call this function whenever data changes
  }, [data, itemComponents]); // Depend on data and itemComponents

  return (
    <div className="container" style={{}}>
      {data && <>{data.name === item.name ? <h1 style={{ color: "green" }}>Right Guess!!</h1> : <h1 style={{ color: "red" }}>Wrong Guess!!</h1>}</>}

      <div className="informacion">
        <div className="cuadradoInformacion">Image</div>
        <div className="cuadradoInformacion">Type</div>
        <div className="cuadradoInformacion">Tier</div>
        <div className="cuadradoInformacion">Transformation</div>
        <div className="cuadradoInformacion">Pool</div>
        <div className="cuadradoInformacion">Starter</div>
        <div className="cuadradoInformacion">Unlock method</div>
      </div>

      <div onChangeCapture={refreshScroll} ref={containerRef} className="squarebox-container">
        {data && (
          <>
            {itemComponents.map((data, index) => (
              <ItemData key={index} guess={data.guess} real={data.real} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default function GuessItemPage() {
  const [items, setItems] = useState([]);
  const [formValue, setFormValue] = useState({ itemName: "" });
  const [itemComponents, setItemComponents] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [data, setData] = useState(null);
  const [item, setItem] = useState([]);

  useEffect(() => {
    const rnd = parseInt(Math.random() * 710);

    fetch(`/api/items/${rnd}`)
      .then((res) => res.json())
      .then((data) => setItem(data));

    fetch(`/api/items/`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
      });
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });

    const filteredSuggestions = [...items].filter((option) => option.name.toLowerCase().includes(value.toLowerCase()));

    setSuggestions(filteredSuggestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (items.some((item) => item.name.toLowerCase().trim() == formValue.itemName.toLowerCase().trim())) {
      const fetchItem = async () => {
        const response = await fetch(`/api/items/query/${formValue.itemName}`);
        const item = response.json();
        setData(await item);
        return item;
      };

      const guess = fetchItem();

      await guess.then((guessItem) => {
        addItemComponent(guessItem, item);
        setItems(items.filter((x) => x.name !== guessItem.name));
      });

      setFormValue({ ...formValue, itemName: "" });
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (value) => {
    setFormValue({ ...formValue, itemName: value.name });
    setSuggestions([]);
  };

  const addItemComponent = (newGuess, newReal) => {
    const newItemData = { guess: newGuess, real: newReal };
    setItemComponents((prev) => [...prev, newItemData]);
  };

  return (
    <>
      <div className="container" style={{ overflow: "hidden", height: "80px" }}>
        <div style={{ textWrap: "wrap", display: "flex", flexDirection: "column" }}>
          <label htmlFor="itemName">Item Name</label>
          <form onSubmit={handleSubmit}>
            <input name="itemName" value={formValue.itemName} onChange={handleInput} autoComplete="off" type="text" />
            {suggestions.length > 0 && (
              <ul className="suggestions-list">
                
                {suggestions.map((suggestion, index) => (
                  <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                    <img style={{ width: "32px" }} src={suggestion.image} alt="" />
                    <span>{suggestion.name}</span>
                  </li>
                ))}
              </ul>
            )}
            <input type="image" name="submit" src="src/assets/enter.png" className="enter-button" />
          </form>
          {itemComponents && <span style={{ marginTop: "5pxº" }}>Number of attempts: {itemComponents.length}</span>}
        </div>
      </div>

      {data && <ScrollTopContainer item={item} data={data} itemComponents={itemComponents} />}
    </>
  );
}
