import { useEffect, useState } from "react";

export default function SearchForm() {
  const [formValue, setFormValue] = useState({ itemName: "" });
  const [data, setData] = useState(null);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fetchItem = async () => {
      const response = await fetch(`/api/items/query/${formValue.itemName}`);
      setData(await response.json());
    };
    fetchItem();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="itemName"
          value={formValue.itemName}
          onChange={handleInput}
          type="text"
        />
        <button type="submit"></button>
      </form>

      {data && (
        <div className="item-info">
          <h1>{data.name}</h1>
          <span>{data.type}</span>
          <img src={data.image} />
          <span>{data.quote}</span>
          <span>{data.id}</span>
          <span>{data.tier}</span>
          <span>{data.character}</span>
        </div>
      )}
    </div>
  );
}
