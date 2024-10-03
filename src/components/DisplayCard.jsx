import React from "react";

const DisplayCard = ({ onGroupingChange, onOrderingChange }) => {
    return (
        <div className="DisplayCard">
            <h5 className="groupTitle">Grouping</h5>
            <select name="group" id="groupId" onChange={(e) => onGroupingChange(e.target.value)}>
                <option value="" disabled selected>select</option>
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
            </select>
            <h5 className="orderTitle">Ordering</h5>
            <select name="order" id="orderId" onChange={(e) => onOrderingChange(e.target.value)}>
                <option value="" disabled selected>select</option>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
            </select>
        </div>
    );
};

export default DisplayCard;
