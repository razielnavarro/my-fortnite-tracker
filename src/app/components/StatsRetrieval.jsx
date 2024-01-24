import React, { useState, useEffect } from 'react';

const StatsRetrieval = ({ name, onFetch }) => {
    const [imageUrl, setImageUrl] = useState(null);
  
    const fetchData = async () => {
      try {
        const serverUrl = `http://localhost:3000/api/stats?name=${name}`;
        const res = await fetch(serverUrl);
  
        if (!res.ok) {
          throw new Error('Failed to fetch data xd');
        }
  
        const data = await res.json();
        setImageUrl(data);  // Assuming the API response directly contains the image URL
        onFetch(data);  // Notify the parent component about the fetched data
      } catch (error) {
        console.error(error.message);
      }
    };
  
    return (
      <div>
        {imageUrl && <img src={imageUrl} alt="Player" />}
        {/* No need for a new button, as it will be triggered from the parent component */}
      </div>
    );
  };
  
  export default StatsRetrieval;