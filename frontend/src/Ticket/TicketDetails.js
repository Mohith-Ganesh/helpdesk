import React, { useState } from 'react';
import axios from 'axios';

const TicketDetails = ({ ticket, addNoteToTicket }) => {
    const [note, setNote] = useState('');

    const handleAddNote = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/api/tickets/${ticket._id}/notes`, { message: note }, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'  },
            });
            addNoteToTicket(ticket._id, response.data);
            setNote('');
        } catch (error) {
            console.error('Error adding note:', error);
        }
    };

    return (
        <>
            <tr>
                <td>{ticket._id}</td>
                <td>{ticket.title}</td>
                <td>{ticket.status}</td>
                <td>{ticket.customerName}</td>
                <td>{new Date(ticket.lastUpdatedOn).toLocaleString()}</td>
            </tr>
            <tr>
                <td colSpan="5">
                    <h4>Notes</h4>
                    <ul>
                        {ticket.notes.map((note, index) => (
                            <li key={index}>
                                <strong>{note.authorName}:</strong> {note.message} <em>({new Date(note.timestamp).toLocaleString()})</em>
                            </li>
                        ))}
                    </ul>
                    <form onSubmit={handleAddNote}>
                        <input 
                            type="text" 
                            placeholder="Add a note" 
                            value={note} 
                            onChange={(e) => setNote(e.target.value)} 
                            required 
                        />
                        <button type="submit">Add Note</button>
                    </form>
                </td>
            </tr>
        </>
    );
};

export default TicketDetails;
