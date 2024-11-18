import React from 'react';
import TicketDetails from './TicketDetails';

const TicketList = ({ tickets, addNoteToTicket }) => {
    return (
        <div className="ticket-list">
            <h2>Your Tickets</h2>
            {tickets.length === 0 ? (
                <p>No tickets available.</p>
            ) : (
                <table className="ticket-table">
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
                            <TicketDetails 
                                key={ticket._id} 
                                ticket={ticket} 
                                addNoteToTicket={addNoteToTicket} 
                            />
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TicketList;
