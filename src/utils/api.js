export const fetchTicketsData = async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Data not fetched!");
        }
        return await response.json();
    } catch (err) {
        console.error("Error occurred:", err);
        return { tickets: [], users: [] }; // Return empty data on error
    }
};
