import React, { useEffect, useRef } from "react";
import ImageCard from '../assets/default-Profile.png';

const TicketCard = ({ ticket, ticketTitle, usersData }) => {
    const activeUserRef = useRef("");
    useEffect(() => {
        if (activeUserRef.current) {
            usersData.forEach((user) => {
                if (ticket.userId === user.id && user.available) {
                    // console.log("i am runing", activeUserRef.current)
                    activeUserRef.current.style.backgroundColor = 'blue';
                }
            });
        }
    }, [usersData, ticket]);
    return (
        <div className="ticketCard">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p id="id">{ticket.id}</p>
                <div>
                    {ticketTitle !== "user" && (
                        <img
                            src={ImageCard}
                            style={{ width: "25px", height: "25px", borderRadius: "50%" }}
                            alt="P"
                            id="ImageCard"
                        />
                    )}
                    {ticketTitle !== "user" && <div ref={activeUserRef} id="activeUser"></div>}
                </div>
            </div>
            <p id="title">
                <img src={`Img-${ticket.status}.svg`} alt="Backlog" /> {ticket.title}
            </p>
            <img src={`Img-${getPriorityLabel(ticket.priority)}.svg`} alt="..." id="ticketcardimg1" />
            <p id="tag" style={{ display: 'inline' }}>
                <img src="Img-Urgent1.svg" alt="..." /> {ticket.tag}
            </p>
        </div >
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
