import React, { useEffect, useState } from "react";
import './KanbanBoard.css';
import DisplayCard from "./DisplayCard";
import TicketCard from "./TicketCard";
import BoardHeader from "./BoardHeader";
import { fetchTicketsData } from "../utils/api";

const KanbanBoard = () => {
    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState([]);
    const [isDisplayCardVisible, setDisplayCardVisible] = useState(false);
    const [grouping, setGrouping] = useState('status');
    const [ordering, setOrdering] = useState('priority');

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchTicketsData();
            setTickets(data.tickets);
            setUsers(data.users);
        };
        fetchData();
        const savedGrouping = localStorage.getItem('grouping');
        const savedSortOrder = localStorage.getItem('ordering');
        if (savedGrouping) setGrouping(savedGrouping);
        if (savedSortOrder) setOrdering(savedSortOrder);
    }, []);
    // console.log(users);
    // console.log(tickets);

    const handleClick = () => {
        setDisplayCardVisible(prevState => !prevState);
    }

    const handleOnGroupingChange = (newGrouping) => {
        setGrouping(newGrouping);

        localStorage.setItem('grouping', newGrouping);
    };

    const handleOnOrderingChange = (newSortOrder) => {
        setOrdering(newSortOrder);
        localStorage.setItem('ordering', newSortOrder);
    };

    const groupedTickets = groupTickets(tickets, grouping, users);
    const sortedTickets = sortTickets(groupedTickets, ordering);
    // const sortedTickets = ordering === 'priority' ? sortTicketsByPriority(groupedTickets) : sortTicketsByTitle(groupedTickets);
    const obj = {};
    const arr = ["Backlog", "Todo", "In progress", "Done", "Cancelled"];
    return (
        <div className="body">
            <button className="btn" onClick={handleClick}>
                <img src="Display.svg" alt="Display" /> Display <img src="down.svg" alt="Dropdown" />
            </button>
            {isDisplayCardVisible && (
                <DisplayCard
                    onGroupingChange={handleOnGroupingChange}
                    onOrderingChange={handleOnOrderingChange}
                />
            )}
            <div className="container">
                {sortedTickets.map((group, index) => {
                    obj[group.title] = 1; // Assuming `obj` is defined somewhere

                    return (
                        <div className="kanbanBoard" key={index}>
                            <BoardHeader
                                title={group.title}
                                ticketCount={group.tickets.length}
                                usersData={users}
                            />
                            <div className="section">
                                {group.tickets.map((ticket) => (
                                    <TicketCard ticket={ticket} key={ticket.id} />
                                ))}
                            </div>
                        </div>
                    );
                })}

                {grouping === "status" && arr.map((e) => {
                    if (obj[e] === undefined) {
                        return (
                            <div className="kanbanBoard" key={e}>
                                <BoardHeader
                                    title={e}
                                    ticketCount={0}
                                    usersData={null}
                                />
                            </div>
                        );
                    }
                    return null;

                })}
            </div>



        </div>
    );
};
const getUserName = (userId, users) => {
    const user = (users || []).find(user => user.id === userId);
    return user ? user.name : ''; // Fallback to title if user is not found
};
const groupTickets = (tickets, grouping, users) => {
    const groups = {};
    console.log(tickets);

    tickets.forEach(ticket => {
        console.log(ticket);
        const key = grouping === 'status' ? ticket.status :
            grouping === 'user' ? getUserName(ticket.userId, users) :
                getPriorityLabel(ticket.priority);
        if (!groups[key]) {
            groups[key] = { title: key, tickets: [] };
        }
        groups[key].tickets.push(ticket);
    });
    // console.log(groups);
    return Object.values(groups);
};


const sortTickets = (groups, ordering) => {
    groups.sort((a, b) => {
        const priorityA = getTitlePriority(a.title);
        const priorityB = getTitlePriority(b.title);

        // Compare by priority
        if (priorityA !== priorityB) {
            return priorityB - priorityA; // Descending order
        }

        // If priorities are equal, sort by title alphabetically
        return a.title.localeCompare(b.title); // Ascending order
    });

    console.log(groups.title);
    return groups.map(group => {
        console.log(group);
        const sortedTickets = group.tickets.sort((a, b) => {
            if (ordering === 'priority') {
                return b.priority - a.priority; // Descending order
            } else {
                return a.title.localeCompare(b.title); // Ascending order
            }
        });
        // console.log(sortedTickets);
        return { ...group, tickets: sortedTickets };
    });
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
const getTitlePriority = (title) => {
    // Define the priority for each title
    switch (title) {
        case 'Urgent': return 4;
        case 'High': return 3;
        case 'Medium': return 2;
        case 'Low': return 1;
        case 'No Priority': return 0;

        default: return -1; // If title does not match, assign a low priority
    }
};

export default KanbanBoard;
