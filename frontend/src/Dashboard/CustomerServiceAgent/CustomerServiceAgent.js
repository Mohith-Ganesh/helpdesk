import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CustomerServiceAgent.css';

const CustomerServiceAgent = () => {
    const [tickets, setTickets] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [activeSection, setActiveSection] = useState('tickets');
    const navigate = useNavigate();

    // Fetch Tickets
    const fetchTickets = async () => {
        try {
            const response = await axios.get('https://helpdesk-1enh.onrender.com/api/tickets/all', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json' },
            });
            setTickets(response.data);
        } catch (err) {
            console.error('Error fetching tickets:', err.message);
        }
    };

    // Fetch Customers
    const fetchCustomers = async () => {
        try {
            const response = await axios.get('https://helpdesk-1enh.onrender.com/api/auth/customers', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json' }, 
            });
            setCustomers(response.data);
        } catch (err) {
            console.error('Error fetching customers:', err.message);
        }
    };

    // Handle Logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/signin');
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchTickets();
        fetchCustomers();
    }, []);

    return (
        <div className="agent-dashboard">
            <div className="top-bar">
                <h1>Customer Service Agent Dashboard</h1>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>

            <div className="sidebar">
                <button onClick={() => setActiveSection('tickets')} className={activeSection === 'tickets' ? 'active' : ''}>
                    Tickets
                </button>
                <button onClick={() => setActiveSection('customers')} className={activeSection === 'customers' ? 'active' : ''}>
                    Customers
                </button>
            </div>

            <div className="main-content">
                {activeSection === 'tickets' && (
                    <div>
                        <h2>Tickets</h2>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Ticket ID</th>
                                    <th>Title</th>
                                    <th>Status</th>
                                    <th>Customer Name</th>
                                    <th>Last Updated On</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tickets.map((ticket) => (
                                    <tr key={ticket._id}>
                                        <td>{ticket._id}</td>
                                        <td>{ticket.title}</td>
                                        <td>{ticket.status}</td>
                                        <td>{ticket.customer.name}</td>
                                        <td>{new Date(ticket.lastUpdatedOn).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeSection === 'customers' && (
                    <div>
                        <h2>Customers</h2>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers.map((customer) => (
                                    <tr key={customer._id}>
                                        <td>{customer.name}</td>
                                        <td>{customer.email}</td>
                                        <td>{customer.role}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomerServiceAgent;
