import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import TicketForm from '../../Ticket/TicketForm';
import TicketList from '../../Ticket/TicketList';
import './Customer.css';

const Customer = () => {
    const [tickets, setTickets] = useState([]);

    const navigate = useNavigate();

    // Fetch tickets on load
    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await axios.get('https://helpdesk-1enh.onrender.com/api/tickets', {
                    headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'},
                });
                setTickets(response.data);
            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        };
        fetchTickets();
    }, []);

    // Add new ticket to the list
    const addTicket = (newTicket) => {
        setTickets([newTicket, ...tickets]);
    };

    // Add a note to a specific ticket
    const addNoteToTicket = (ticketId, note) => {
        setTickets(tickets.map(ticket => 
            ticket._id === ticketId 
            ? { ...ticket, notes: [...ticket.notes, note] } 
            : ticket
        ));
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate('/signin');
    };

    return (
        <div className="dashboard">
            <h1 className='customer-head'>Customer Dashboard</h1>
            <TicketForm addTicket={addTicket} />
            <TicketList tickets={tickets} addNoteToTicket={addNoteToTicket} />
            <button className="customer-logout-button" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default Customer;
