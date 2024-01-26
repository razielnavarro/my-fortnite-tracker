// StatsRetrieval.jsx
import React, { useEffect } from 'react';

const StatsRetrieval = ({ name, onFetch }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/stats?name=${name}`);

        if (!res.ok) {
          throw new Error('Failed to fetch data xd');
        }

        const data = await res.json();
        // Update the state in the parent component using onFetch prop
        onFetch(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    // Fetch data when the name prop changes
    if (name) {
      fetchData();
    }
  }, [name, onFetch]);

  return (
    <div>
      {/* You can add any rendering logic for the fetched data here */}
    </div>
  );
};

export default StatsRetrieval;
