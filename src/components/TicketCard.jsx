import React from "react";

const TicketCard = ({ ticket }) => {
    return (
        <div className="ticketCard">
            <p id="id">{ticket.id}</p> {/* Now using userId as per your request */}
            <p id="title">
                <img src={`Img-${ticket.status}.svg`} alt="Backlog" /> {ticket.title}
            </p>
            <img src={`Img-${getPriorityLabel(ticket.priority)}.svg`} alt="..." id="ticketcardimg1" />
            <p id="tag" style={{ display: 'inline' }}>
                <img src="Img-Urgent1.svg" alt="..." /> {ticket.tag}
            </p>
        </div>
    );
};

const getPriorityLabel = (priority) => {
    switch (priority) {
        case 4: return 'Urgent';
        case 3: return 'High';
        case 2: return 'Medium';
        case 1: return 'Low';
        case 0: return 'No Priority';
        default: return 'Unknown';
    }
};

export default TicketCard;
