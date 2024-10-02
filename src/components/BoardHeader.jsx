import React from "react";


const BoardHeader = ({ title, ticketCount, usersData }) => {
    const isUsername = Array.isArray(usersData) && usersData.some(user => user.name === title);

    return (
        <div className="BoardHead">
            <div className="priority">
                {!isUsername && <img src={`Img-${title}.svg`} alt="P" />}
                {/* <img src={`Img-${title}.svg`} alt="IM" /> */}
                <span id="span1">
                    {title}
                </span>
                <span id="span2">{ticketCount}</span> {/* Always show the ticket count */}
            </div>
            {title === "Cancelled" ? null : <div className="icons">
                <img src="add.svg" alt="Add" />
                <img src="3dotmenu.svg" alt="Menu" />
            </div>}
        </div>
    );

};

export default BoardHeader;
