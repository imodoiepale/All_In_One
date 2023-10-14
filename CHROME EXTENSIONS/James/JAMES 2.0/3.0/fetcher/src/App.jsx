import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from("autofill_test").select("*");

        if (error) {
          console.error("Oops! Something went wrong:", error.message);
        } else {
          console.log("Fetched data:", data);
          setData(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = event => {
    setUserInput(event.target.value);
  };

  const filteredData = data.filter(item => item.name.includes(userInput));

  return (
    <div>
      <h1>Autofilled Form</h1>
      <form id="testForm">
        <input type="search" id="searchInput" name="searchInput" value={userInput} onChange={handleInputChange} />

        <button type="submit" id="searchButton">
          Search
        </button>

        <label htmlFor="nameInput">Name:</label>
        <input type="text" id="nameInput" name="nameInput" value={filteredData[0]?.name || ""} readOnly />

        <label htmlFor="emailInput">Email:</label>
        <input type="email" id="emailInput" name="emailInput" value={filteredData[0]?.email || ""} readOnly />

        {/* Add more form fields as needed */}
      </form>

      <div>
        <h1>Data from Supabase</h1>
        {filteredData.map(item => (
          <div key={item.id}>
            <p>Name: {item.name}</p>
            <p>email: {item.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
