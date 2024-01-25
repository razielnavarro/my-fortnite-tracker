'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from './components/Navbar';
import Link from 'next/link';
import StatsRetrieval from './components/StatsRetrieval';

export default function Home() {
  const [playerName, setPlayerName] = useState('');
  const [fetchedData, setFetchedData] = useState(null);
  const router = useRouter();

  const handleInputChange = (event) => {
    setPlayerName(event.target.value);
  };

  const handleViewStatsClick = async () => {
    await fetchData();
    // Redirect to the profile page after fetching the data
    router.push(`/profile/${encodeURIComponent(playerName)}`);
  };

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/stats?name=${playerName}`);

      if (!res.ok) {
        throw new Error('Failed to fetch data xd');
      }

      const data = await res.json();
      setFetchedData(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <header>
        <Navbar />
      </header>

      <main className="flex flex-col min-h-screen justify-center items-center">
        <h1>Fortnite Stats Tracker</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter your EPIC name"
            value={playerName}
            onChange={handleInputChange}
            style={{ color: playerName.length > 0 ? 'blue' : 'black' }}
          />
          {/* Trigger the fetchData function on button click */}
          <button onClick={handleViewStatsClick}>View Stats</button>
        </div>
        {/* Pass the input value and the onFetch function to StatsRetrieval */}
        <StatsRetrieval name={playerName} onFetch={setFetchedData} />
      </main>

      <footer></footer>
    </>
  );
}