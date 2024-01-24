'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from './components/Navbar';
import Link from 'next/link';
import StatsRetrieval from './components/StatsRetrieval';

export default function Home() {
  const [playerName, setPlayerName] = useState('');
  const router = useRouter();

  const handleInputChange = (event) => {
      setPlayerName(event.target.value);
  };
  
    return (
      <>
        <header>
          <Navbar/>
        </header>
  
        <main className="flex flex-col min-h-screen justify-center items-center">
          <h1>Fortnite Stats Tracker</h1>
          <div className="input-container">
            <input type="text" placeholder="Enter your EPIC name" value = {playerName} onChange={handleInputChange} style={{ color: playerName.length > 0 ? 'blue' : 'black' }}/>
            {/* Use dynamic route for client-side navigation */}
        {playerName.length > 0 ? (
          <Link href={`/profile/${encodeURIComponent(playerName)}`}>
            View Stats
          </Link>
        ) : (
          <span>View Stats</span>
        )}
      </div>
          {/* Pass the input value as a prop to StatsRetrieval */}
          <StatsRetrieval name={playerName} />
          {/* Pass the input value as a prop to StatsCard */}
        </main>
  
        <footer></footer>
      </>
    );
  }