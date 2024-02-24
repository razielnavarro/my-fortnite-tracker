'use client'
import Navbar from './components/Navbar';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from "react"; 

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [itemShopData, setItemShopData] = useState(null);
  const apiKey = process.env.NEXT_PUBLIC_FORTNITE_API_KEY_SHOP;

  useEffect(() => {
    const fetchItemShopData = async () => {
        try{
            const apiUrl = "https://fnbr.co/api/shop";

            const response = await fetch(apiUrl, {
                headers: {
                    'x-api-key': apiKey
                },
            });
        
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            
            const data = await response.json();

            setItemShopData(data.data);
            console.log("Item Shop Data:", data.data);
        } catch (error) {
            console.error(error.message);
        }
    };

    fetchItemShopData();
}, []);


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
    
        {/* Section below the input field which shows item shop */}

<section className='flex flex-col items-center mt-20'>
    <h1 className="mb-4 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">Daily item shop</h1>
    <div className='grid grid-cols-6 gap-4'>
      {itemShopData && itemShopData.featured && itemShopData.featured.map((item) => (
        <div key={item.id} className="text-center">
        <img
        src={item.images.gallery}
        alt={item.name}
        className="h-40 w-40 object-cover mx-auto mb-2"/>
        <p className="text-white">{item.name}</p>
        <p className="text-green-500">{`${item.price} ${item.priceIcon}`}</p>
        </div>
      ))}
    </div>
      </section>
      </main>
    </>
  );
}