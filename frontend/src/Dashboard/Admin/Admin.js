import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("tickets");
  const [tickets, setTickets] = useState([]);
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTickets();
    fetchCustomers();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get('https://helpdesk-1enh.onrender.com/api/tickets/all', {
        headers: { 
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json' 
        },
      });
      setTickets(response.data);
    } catch (err) {
      console.error("Error fetching tickets:", err.message);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("https://helpdesk-1enh.onrender.com/api/auth/customers", {
        headers: { 
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json' 
        },
      });
      setCustomers(response.data);
    } catch (err) {
      console.error("Error fetching customers:", err.message);
    }
  };

  const handleStatusChange = async (ticketId, newStatus) => {
    try {
      await axios.put(`https://helpdesk-1enh.onrender.com/api/tickets/${ticketId}`, { status: newStatus });
      fetchTickets(); // Refresh tickets
    } catch (err) {
      console.error("Error updating ticket status:", err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };

  return (
    <div className="admin-dashboard">
      {/* Top bar with Logout button */}
      <div className="admin-top-bar">
        <h1 className="admin-title">Admin Panel</h1>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>

      <aside className="admin-sidebar">
        <h2 className="admin-sidebar-title">Menu</h2>
        <ul className="admin-menu">
          <li
            className={activeTab === "tickets" ? "active" : ""}
            onClick={() => setActiveTab("tickets")}
          >
            Tickets
          </li>
          <li
            className={activeTab === "customers" ? "active" : ""}
            onClick={() => setActiveTab("customers")}
          >
            Customers
          </li>
        </ul>
      </aside>

      <main className="admin-main">
        {activeTab === "tickets" && (
          <div className="tickets-section">
            <h2>All Tickets</h2>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Ticket ID</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Customer Name</th>
                  <th>Last Updated On</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket._id}>
                    <td>{ticket._id}</td>
                    <td>{ticket.title}</td>
                    <td>{ticket.status}</td>
                    <td>{ticket.customerName}</td>
                    <td>{new Date(ticket.updatedAt).toLocaleString()}</td>
                    <td>
                      <select
                        value={ticket.status}
                        onChange={(e) => handleStatusChange(ticket._id, e.target.value)}
                      >
                        <option value="Active">Active</option>
                        <option value="Pending">Pending</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "customers" && (
          <div className="customers-section">
            <h2>All Customers</h2>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Customer ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer._id}>
                    <td>{customer._id}</td>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
