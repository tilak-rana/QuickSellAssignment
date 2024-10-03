import React, { useState } from "react";
import './NewCard.css'
const TicketForm = ({ onSubmit, onClose }) => {
    const [title, setTitle] = useState("");
    const [tag, setTag] = useState("");
    const [userId, setUserId] = useState("usr-1");
    const [status, setStatus] = useState("Todo");
    const [priority, setPriority] = useState(2);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTicket = {
            id: `CAM-${Math.floor(Math.random() * 100)}`,
            title,
            tag: [tag],
            userId,
            status,
            priority
        };
        onSubmit(newTicket);
        onClose(); // Close the form after submission
    };

    return (
        <form onSubmit={handleSubmit} className="ticket-form">
            <label>
                Title:
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </label>
            <label>
                Tag:
                <input
                    type="text"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                />
            </label>
            <label>
                User ID:
                <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
            </label>
            <label>
                Status:
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="Todo">Todo</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
            </label>
            <label>
                Priority:
                <select value={priority} onChange={(e) => setPriority(Number(e.target.value))}>
                    <option value={0}>No Priority</option>
                    <option value={1}>Low</option>
                    <option value={2}>Medium</option>
                    <option value={3}>High</option>
                    <option value={4}>Urgent</option>
                </select>
            </label>
            <button type="submit" style={{ color: "blue", fontWeight: "bold" }}>Add Ticket</button>
            <button type="button" onClick={onClose} style={{ color: "red", fontWeight: "bold", marginLeft: "15px" }}>Cancel</button>
        </form>
    );
};

export default TicketForm;
