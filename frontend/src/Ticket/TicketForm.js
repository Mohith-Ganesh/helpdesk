import React, { useState } from 'react';
import axios from 'axios';

const TicketForm = ({ addTicket }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://helpdesk-1enh.onrender.com/api/tickets/create', { title }, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json' },
            });
            addTicket(response.data);
            setTitle('');
        } catch (error) {
            console.error('Error creating ticket:', error);
        }
    };

    return (
        <form className="ticket-form" onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Enter ticket title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required 
            />
            <button type="submit">Submit Ticket</button>
        </form>
    );
};

export default TicketForm;
