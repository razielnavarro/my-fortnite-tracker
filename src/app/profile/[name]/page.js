'use client'
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Link from 'next/link';

export default function Profile() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const [statsData, setStatsData] = useState(null);
  const apiKey = process.env.NEXT_PUBLIC_FORTNITE_API_KEY;

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const accountType = 'epic';
        const timeWindow = 'lifetime';
        const image = 'all';

        const apiUrl = `https://fortnite-api.com/v2/stats/br/v2?name=${name}&accountType=${accountType}&timeWindow=${timeWindow}&image=${image}`;

        const response = await fetch(apiUrl, {
          headers: {
            'Authorization': apiKey,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();

        if (data && data.data) {
          setStatsData(data.data);
          console.log('Received Data:', data.data);
        } else {
          console.error('Invalid data received from the API');
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    if (name) {
      fetchPlayers();
    }
  }, [name]);

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className='min-h-screen bg-backgroundDark'>
        {/* Display the image and other information using statsData */}
        {/* Check if statsData is not null before accessing properties */}
        {statsData && (
          <>
            <div className='flex justify-center items-center'>
            <figure>
              <img className="h-auto max-w-full rounded-lg"src={statsData.image} alt="Stats Image" />
              <figcaption class="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">{name} stats</figcaption>
              </figure>
            </div>
            {/* Display other information from statsData */}
            <div className='flex justify-center items-center pt-4'>
            <Link legacyBehavior href="/"><a className='inline-flex h-12 items-center justify-center rounded-md border border-slate-800 bg-gradient-to-t from-[#35495e] from-0% to-[#2c3e50] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50'>
              Look for another player</a></Link>
            </div>
          </>
        )}
      </main>
    </>
  );
}
