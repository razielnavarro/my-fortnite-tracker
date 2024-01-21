import React, { useState, useEffect } from 'react';

const StatsRetrieval = ({ name }) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Make the API request to your server
                const serverUrl = `http://localhost:3001/api/stats?name=${name}`;
                const res = await fetch(serverUrl);

                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await res.json();
                setUserData(data);
            } catch (error) {
                console.error(error.message);
            }
        };

        // Call the fetchData function when the component mounts or when inputs change
        fetchData();
    }, [name]);

    return (
        <>
            {userData && (
                <div>
                    <h1>Player Stats</h1>
                    <p>Username: {userData.data.username}</p>
                    {/* Add more elements to display other relevant data */}
                </div>
            )}
        </>
    );
};

export default StatsRetrieval;
