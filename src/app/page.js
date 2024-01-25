'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from './components/Navbar';
import Link from 'next/link';
import StatsRetrieval from './components/StatsRetrieval';
import ViewStats from './components/ViewStats';
import InputText from './components/inputText';

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
        <div className="input-container flex items-center">
          <InputText placeholder="Enter your EPIC name"
            value={playerName}
            onChange={handleInputChange}/>
          {/* Trigger the fetchData function on button click */}
          <div className="ml-1">
          <ViewStats onClick={handleViewStatsClick}/>
          </div>
        </div>
        {/* Pass the input value and the onFetch function to StatsRetrieval */}
        <StatsRetrieval name={playerName} onFetch={setFetchedData} />
      </main>

      <footer></footer>
    </>
  );
}