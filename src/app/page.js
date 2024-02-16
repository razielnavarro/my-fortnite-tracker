'use client'
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import { useRouter } from 'next/navigation';



export default function Home() {

  const [statsData, setStatsData] = useState(null);
  const router = useRouter();
  
  const fetchPlayers = async (name, accountType, timeWindow, image) => {
    try {
      const apiUrl = `https://fortnite-api.com/v2/stats/br/v2?name=${name}&accountType=${accountType}&timeWindow=${timeWindow}&image=${image}`;
      const response = await fetch(apiUrl, {
        headers: {
          'Authorization': '7f63a1da-a518-49b2-84ab-6777a1775b36',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const accountType = 'epic';
    const timeWindow = 'lifetime';
    const image = 'all';

    try {
      const data = await fetchPlayers(name, accountType, timeWindow, image);

      // Check if the data is not empty or undefined
      if (data && data.data) {
        setStatsData(data.data);

        // Log the received data to the console
        console.log('Received Data:', data.data);
        router.push(`/profile/${encodeURIComponent(name)}`);
      } else {
        // Handle the case where the data is not as expected
        console.error('Invalid data received from the API');
      }
    } catch (error) {
      // Handle error (display a message to the user, etc.)
    }
  };

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="flex flex-col min-h-screen justify-center items-center mb-1">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Fortnite Stats Tracker</h1>
        
        <form className="flex items-center" onSubmit={handleSubmit}>
          <label htmlFor="name">
            <input
              className="block h-12 w-full rounded-md border border-slate-800 bg-black px-3 py-2 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:ring-offset-1 focus:ring-offset-slate-50"
              placeholder="Enter your EPIC name"
              name="name"
              type="text"
              id="name"
            />
          </label>
          <div className="ml-1">
            <button
              className="inline-flex h-12 items-center justify-center rounded-md border border-slate-800 bg-gradient-to-t from-[#35495e] from-0% to-[#2c3e50] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
              type="submit"
            >
              View Stats
            </button>
          </div>
        </form>

        {/* Section below the input field which shows leaderboards */}

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