import React, { useState, useEffect } from 'react';

const StatsRetrieval = ({ name }) => {
    const [userData, setUserData] = useState(null);
    const timeWindow = 'lifetime'; // Set timeWindow to a constant value
    const accountType = 'epic'; // Set accountType to a constant value

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Construct the API URL with user input parameters
                const apiUrl = `https://fortnite-api.com/v2/stats/br/v2?name=${name}&accountType=${accountType}&timeWindow=${timeWindow}`;
                const res = await fetch(apiUrl);

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
    }, [name, accountType, timeWindow]);

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