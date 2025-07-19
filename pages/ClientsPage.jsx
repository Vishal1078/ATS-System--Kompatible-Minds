import React, { useState, useEffect } from 'react';
import ClientForm from './clientForm';
import './ClientsPage.css';

const ClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetchClients = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/clients');
      const data = await res.json();
      setClients(data);
    } catch (err) {
      console.error('Error fetching clients:', err);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div className="clients-page">
      <div className="clients-header">
        <h1>Clients</h1>
        <button onClick={() => setShowForm(!showForm)} className="add-client-btn">
          {showForm ? 'Close Form' : 'Add Client'}
        </button>
      </div>

      {showForm && <ClientForm onClientAdded={fetchClients} />}

      <ul className="client-list">
        {clients.map((client, index) => (
          <li key={client.id || index} className="client-item">
            <strong>{client.name}</strong> — {client.contactName} — {client.email} — {client.phone}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientsPage;
