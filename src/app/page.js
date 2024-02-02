'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from './components/Navbar';
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
      <main className="flex flex-col min-h-screen justify-center items-center mb-1">
        {/* <div className='absolute -z-10 w-full'>
        <Image src={background} alt='background image' className='w-full'/>
        </div> */}
        <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Fortnite Stats Tracker</h1>
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
        <section className='flex justify-center items-center mt-20'>
        <div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Player
                </th>
                <th scope="col" class="px-6 py-3">
                    Wins
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Ananda
                </th>
                <td class="px-6 py-4">
                    3210
                </td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Razant
                </th>
                <td class="px-6 py-4">
                    2911
                </td>
            </tr>
            <tr class="bg-white dark:bg-gray-800">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Antonio
                </th>
                <td class="px-6 py-4">
                    1952
                </td>
            </tr>
        </tbody>
    </table>
</div>
      </section>
      </main>
      <footer></footer>
    </>
  );
}