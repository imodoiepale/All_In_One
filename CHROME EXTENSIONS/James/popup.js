
console.log('Popup JS loaded');

// Load Supabase script dynamically
const supabaseScript = document.createElement('script');
supabaseScript.src = 'supabase-js.min.js';
supabaseScript.onload = initializeSupabase;
document.head.appendChild(supabaseScript);


// Supabase client initialization
const supabase = supabase.createClient(
  'https://usxmcwfatfhvwfvqspil.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzeG1jd2ZhdGZodndmdnFzcGlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcxMDI0NTcsImV4cCI6MjAxMjY3ODQ1N30.6ulYTo0WXXPJ_hFseZ5uZl_BJzg1iY7AN7h3ZyeXj-s'
);

document.getElementById('search-btn').addEventListener('click', async function () {
  const searchQuery = document.getElementById('search-input').value;

  console.log('Search initiated for:', searchQuery);

  try {
    // Fetch data from Supabase based on the search query
    const { data, error } = await supabase
      .from('clients')
      .select()
      .eq('name', searchQuery); // Adjust the condition based on your table structure

    if (error) {
      console.error('Error fetching data from Supabase:', error.message);
      return;
    }

    // Use the retrieved data to update the UI
    updateUIWithClientData(data);

    console.log('Client Data:', data);
  } catch (error) {
    console.error('Error:', error.message);
  }
});

// Function to update the UI with client information
function updateUIWithClientData(clientData) {
  console.log('Updating UI with client data:', clientData);

  const clientInfoContainer = document.getElementById('client-info-container');

  // Clear existing content in the container
  clientInfoContainer.innerHTML = '';

  // Check if clientData is not empty
  if (clientData && clientData.length > 0) {
    // Create a table to display the client information
    const table = document.createElement('table');
    table.border = '1';

    // Create table headers
    const headers = Object.keys(clientData[0]);
    const headerRow = document.createElement('tr');

    headers.forEach(headerText => {
      const th = document.createElement('th');
      th.textContent = headerText;
      headerRow.appendChild(th);
    });

    table.appendChild(headerRow);

    // Populate table rows with client information
    clientData.forEach(client => {
      const row = document.createElement('tr');

      headers.forEach(header => {
        const td = document.createElement('td');
        td.textContent = client[header];
        row.appendChild(td);
      });

      table.appendChild(row);
    });

    // Append the table to the container
    clientInfoContainer.appendChild(table);

    console.log('UI updated with client data.');
  } else {
    // Display a message when no client data is found
    clientInfoContainer.textContent = 'No client data found.';

    console.log('No client data found. Displaying message.');
  }
}
