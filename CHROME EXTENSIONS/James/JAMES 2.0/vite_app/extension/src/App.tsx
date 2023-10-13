// Popup.tsx
import React, { useState, useEffect } from 'react';

const Popup = () => {
  const [selectedWebsite, setSelectedWebsite] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [clientData, setClientData] = useState<any[]>([]); // Adjust this based on your actual data structure

  // Fetch client data based on the search query and selected website
  const fetchClientData = async () => {
    // Implement logic to fetch client data from MongoDB or Supabase
    // You might want to use a library like axios or fetch for this
    // Update the clientData state with the fetched data
  };

  // Handle the selection of a website
  const handleWebsiteSelect = (website: string) => {
    setSelectedWebsite(website);
  };

  // Handle the search query change
  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query);
  };

  // Handle the form submission and autofill
  const handleAutofill = (client: any) => {
    // Implement autofill logic for the selected website
    // You might want to use browser APIs like chrome.tabs.sendMessage
  };

  useEffect(() => {
    // Fetch client data when the search query or selected website changes
    fetchClientData();
  }, [searchQuery, selectedWebsite]);

  return (
    <div>
      <h2>Jaza Autofill</h2>
      <p>Description: Form Autofill Pro is a powerful Chrome extension...</p>

      <div>
        <label>Choose Website:</label>
        <select onChange={(e) => handleWebsiteSelect(e.target.value)}>
          <option value="KRA">KRA</option>
          <option value="eCitizen">eCitizen</option>
          <option value="NSSF">NSSF</option>
          <option value="NHIF">NHIF</option>
          <option value="ENFS">ENFS</option>
        </select>
      </div>

      <div>
        <label>Client Search:</label>
        <input
          type="text"
          placeholder="Search for a client..."
          value={searchQuery}
          onChange={(e) => handleSearchQueryChange(e.target.value)}
        />
      </div>

      <div>
        <ul>
          {clientData.map((client) => (
            <li key={client.id}>
              {client.name} - <button onClick={() => handleAutofill(client)}>Autofill</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Popup;
