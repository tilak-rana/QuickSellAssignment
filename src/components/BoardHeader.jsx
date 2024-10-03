import React, { useState } from "react";
import NewCard from "./NewCard";
import userProfileImage from '../assets/default-Profile.png';


const BoardHeader = ({ title, ticketCount, usersData, onAddTicket }) => {
    const [isFormVisible, setFormVisible] = useState(false);
    const [isMenuVisible, setMenuVisible] = useState(false);

    const isUsername = Array.isArray(usersData) && usersData.some(user => user.name === title);
    // console.log(isUsername);
    const handleAddTicket = (newTicket) => {
        onAddTicket(newTicket);
        setFormVisible(false);
    };

    return (
        <>
            <div className="BoardHead">
                <div className="priority">
                    {isUsername ? <img src={userProfileImage} style={{ width: "20px", height: "20px", borderRadius: "50%" }} alt="P" /> : <img src={`Img-${title}.svg`} alt="P" />}
                    <span id="span1">
                        {title}
                    </span>
                    <span id="span2">{ticketCount}</span> {/* Always show the ticket count */}
                </div>
                {title === "Cancelled" ? null : <div className="icons">
                    <img src="add.svg" alt="Add" id="AddCard" onClick={() => setFormVisible(true)} />
                    < img src="3dotmenu.svg" alt="Menu" id="menu" onClick={() => setMenuVisible(true)} />
                </div>}
            </div>
            {isFormVisible && (
                <NewCard onSubmit={handleAddTicket} onClose={() => setFormVisible(false)} />
            )}
            {isMenuVisible && (
                <TeamMemberMenu onClose={() => setMenuVisible(false)} />
            )}
        </>
    );

};

const TeamMemberMenu = ({ onClose }) => {
    return (
        <div className="team-member-menu">
            <ul>
                <li >View Profile</li>
                <li >Edit Team Member</li>
                <li >Remove Team Member</li>
            </ul>
            <img src="Img-Cancelled.svg" alt="" onClick={onClose} />
        </div>
    );
};

export default BoardHeader;
