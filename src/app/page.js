'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from './components/Navbar';

export default function Home() {
  const [fetchedData, setFetchedData] = useState(null);
  const router = useRouter();

  const makeApiCall = async (event) => {
    event.preventDefault()
    try {
      const formData = new FormData(event.target)
      const playerName = formData.get('username');
      const response = await fetch('/api/stats?name=${playerName}', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch dataD xXdDX');
      }

      const data = await response.json();
      setFetchedData(data);

      // Redirect to the profile page after fetching the data
      router.push(`/profile/${encodeURIComponent(playerName)}`);
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
        <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Fortnite Stats Tracker</h1>
        

        <form className='flex items-center' action='/api/stats' method='GET' onSubmit={makeApiCall}>
          <label htmlFor='username'>
          <input className='block h-12 w-full rounded-md border border-slate-800 bg-black px-3 py-2 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:ring-offset-1 focus:ring-offset-slate-50' 
          placeholder='Enter your EPIC name' 
          name='username' 
          type='text'
          id='username'/>
          </label>
          <div className="ml-1">
          <button className='inline-flex h-12 items-center justify-center rounded-md border border-slate-800 bg-gradient-to-t from-[#35495e] from-0% to-[#2c3e50] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50'
          type='submit'
          >View Stats</button>
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