// StatsRetrieval.jsx
import React, { useState, useEffect } from 'react';

const StatsRetrieval = ({ name, children }) => {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Make the API request to your server
                const serverUrl = `http://localhost:3000/api/stats?name=${name}`;
                const res = await fetch(serverUrl);

                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await res.json();
                setImageUrl(data.imageUrl);
                console.log('Received imageUrl: ', data.imageUrl);
            } catch (error) {
                console.error(error.message);
            }
        };

        // Call the fetchData function when the component mounts or when inputs change
        fetchData();
    }, [name]);

    // Check if children is a function, then call it with imageUrl
    if (typeof children === 'function') {
        return children(imageUrl);
    }

    // Default return if children is not a function
    return null;
};

export default StatsRetrieval;
