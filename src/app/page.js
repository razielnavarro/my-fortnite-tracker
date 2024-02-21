'use client'
import Navbar from './components/Navbar';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from "react"; 

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className='min-h-screen bg-backgroundDark'>
      <section className="flex flex-col h-[40vh] justify-center items-center mb-1" style={{backgroundImage: 'url("/background/background.png")'}}>
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Fortnite Stats Tracker</h1>
      <div className="flex items-center">
      <label htmlFor="name">
        <input
          className="block h-12 w-full rounded-md border border-slate-800 bg-black px-3 py-2 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:ring-offset-1 focus:ring-offset-slate-50"
          placeholder="Enter your EPIC name"
          name="name"
          type="text"
          id="name"
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      
      <div className="ml-1">
        <Link legacyBehavior
            href={{
            pathname: `/profile/${name}`,
            query: {
            name: name, },
    }}
    prefetch={true}
    ><a className='inline-flex h-12 items-center justify-center rounded-md border border-slate-800 bg-gradient-to-t from-[#35495e] from-0% to-[#2c3e50] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50'>View Stats</a></Link>
    </div>
    </div>
    </section>
    
        {/* Section below the input field which shows leaderboards */}

<section className='flex flex-col items-center mt-20'>
    <h1 className="mb-4 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">Leaderboards</h1>
    <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
    </>
  );
}