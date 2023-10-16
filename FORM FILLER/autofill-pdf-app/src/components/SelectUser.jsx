// UserSelector.js
import { useState, useEffect } from 'react';
import { supabase } from './supabase'; // Make sure to import your supabase configuration

const UserSelector = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from Supabase
    const fetchUsers = async () => {
      const { data, error } = await supabase.from('users').select('id, name');
      if (error) {
        console.error('Error fetching users:', error.message);
      } else {
        setUsers(data);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <label>Select User:</label>
      <select onChange={(e) => onSelectUser(e.target.value)}>
        <option value="">Select a user</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserSelector;
