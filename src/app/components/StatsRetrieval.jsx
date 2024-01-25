import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StatsRetrieval = ({ name, onFetch }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serverUrl = `/api/stats?name=${name}`;
        const response = await axios.get(serverUrl);

        if (response.status !== 200) {
          throw new Error('Failed to fetch data xd');
        }

        const data = response.data;
        setImageUrl(data.data.image);
        onFetch(data);  // Notify the parent component about the fetched data
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();  // Call fetchData when the component mounts or when 'name' changes
  }, [name, onFetch]);

  return (
    <div>
      {imageUrl && <img src={imageUrl} alt="Player" />}
      {/* No need for a new button, as it will be triggered from the parent component */}
    </div>
  );
};

export default StatsRetrieval;
