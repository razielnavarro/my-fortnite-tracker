'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from './components/Navbar';
import Link from 'next/link';
import StatsRetrieval from './components/StatsRetrieval';
import StatsCard from './components/StatsCard';

export default function Home() {
  const [playerName, setPlayerName] = useState('');
  const router = useRouter();

  const handleInputChange = (event) => {
      setPlayerName(event.target.value);
  };

  const handleStatsPageRedirect = () => {
    // Redirect to the StatsCard page with the playerName as a query parameter
    router.push({
        pathname: './components/StatsCard', // Update the path to match your actual StatsCard page path
        query: { playerName: playerName }
    });
};
    return (
      <>
        <header>
          <Navbar/>
        </header>
  
        <main className="flex flex-col min-h-screen justify-center items-center">
          <h1>Fortnite Stats Tracker</h1>
          <div className="input-container">
            <input type="text" placeholder="Enter your EPIC name" value = {playerName} onChange={handleInputChange}/>
            <button onClick={handleStatsPageRedirect}>View Stats</button>
          </div>
          {/* Pass the input value as a prop to StatsRetrieval */}
          <StatsRetrieval name={playerName} />
          {/* Pass the input value as a prop to StatsCard */}
          {playerName && <StatsCard playerName={playerName} />}
        </main>
  
        <footer></footer>
      </>
    );
  }