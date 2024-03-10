'use client'
import Navbar from './components/Navbar';
import Countdown from './components/Countdown';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from "react";

const ItemGroup = ({ items }) => {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentItemIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [items]);

  const currentImage = items[currentItemIndex].images.featured || items[currentItemIndex].images.icon;
  const backgroundImagePath = `/rarity/${items[0].rarity.toLowerCase()}.png`;
  const VbucksIcon = '/assets/vbucks.webp';

  return (
    <div className="text-center relative px-2" 
    style={{ 
      position: 'relative',
      width: '100%', 
      height: 'auto',
      overflow: 'hidden',
    }}>
    <img 
      src={backgroundImagePath} 
      alt="Background" 
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }} 
    />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <img src={currentImage} alt={items[0].name} className="h-1/2 w-1/2 object-cover mb-2 md:h-40 md:w-40" />
        <p className="text-white font-bold text-xs md:text-base">{items[0].name}</p>
        <div className="flex items-center">
          <p className="text-white-500 font-bold text-xs md:text-lg">{items[0].price}</p>
          <img src={VbucksIcon} alt="vbucks icon" className="h-4 w-4 ml-1 md:h-6 md:w-6" />
        </div>
      </div>
    </div>
  );
  
};

const ItemSection = ({ section, itemShopData }) => {
  // Group items by name
  const groupedItems = itemShopData && itemShopData.featured
    ? itemShopData.featured.reduce((groups, item) => {
      const itemName = item.name;
      if (!groups[itemName]) {
        groups[itemName] = [];
      }
      groups[itemName].push(item);
      return groups;
    }, {})
    : {};

  // Filter items in the current section
  const sectionItems = section.items
    .map((itemId) => itemShopData.featured.find((item) => item.id === itemId))
    .filter(Boolean);

  // Keep track of processed item names
  const processedItemNames = new Set();

  return (
    <section key={section.key} className='flex flex-col items-center mb-8'>
      <h2 className="mb-4 text-center text-3xl font-extrabold leading-none tracking-tight text-white md:text-2xl lg:text-3xl">{section.displayName}</h2>
      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-5'>
        {sectionItems.map((sectionItem) => {
          const itemName = sectionItem.name;

          if (!processedItemNames.has(itemName)) {
            const itemsWithSameName = groupedItems[itemName];
            processedItemNames.add(itemName);

            if (itemsWithSameName) {
              return <ItemGroup key={itemName} items={itemsWithSameName} />;
            }
          }

          return null;
        })}
      </div>
    </section>
  );
};



export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [itemShopData, setItemShopData] = useState(null);
  const apiKey = process.env.NEXT_PUBLIC_FORTNITE_API_KEY_SHOP;

  useEffect(() => {
    const fetchItemShopData = async () => {
      try {
        const apiUrl = "/api/shop";
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setItemShopData(data);
        console.log("Item Shop Data:", data);
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
        <section className="flex flex-col h-[40vh] justify-center items-center mb-1" style={{ backgroundImage: 'url("/background/background.png")', backgroundSize: 'cover', backgroundPosition: 'top' }}>
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl">Fortnite Stats Tracker</h1>
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
                    name: name,
                  },
                }}
                prefetch={true}
              >
                <a className='inline-flex h-12 items-center justify-center rounded-md border border-slate-800 bg-gradient-to-t from-[#35495e] from-0% to-[#2c3e50] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50'>View Stats</a>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Section below the input field which shows item shop */}
        <section className='flex flex-col items-center mt-12'>
          <h1 className="mb-2 text-center text-4xl font-extrabold leading-none tracking-tight text-white md:text-3xl lg:text-4xl">Daily item shop</h1>
          <div className='mb-20'>
            <Countdown />
          </div>
          {itemShopData &&
            itemShopData.sections &&
            itemShopData.sections.map((section) => (
              <ItemSection key={section.key} section={section} itemShopData={itemShopData} />
            ))}
        </section>
      </main>

      <footer class="bg-gray-900 border-gray-200 md:flex md:items-center md:justify-between p-4 md:p-6 xl:p-8">
        <span className='text-sm font-normal text-white-500 mr-4 md:mr-6'>@2024 Raziel</span>
    <div class="flex sm:justify-center space-x-6">
        <a href="https://www.linkedin.com/in/razielnavarro/" class="text-white-500 hover:text-gray-900">
        <svg xmlns="http://www.w3.org/2000/svg" class='h-5 w-5' fill='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
    <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z M10.954,22h-2.95 v-9.492h2.95V22z M9.449,11.151c-0.951,0-1.72-0.771-1.72-1.72c0-0.949,0.77-1.719,1.72-1.719c0.948,0,1.719,0.771,1.719,1.719 C11.168,10.38,10.397,11.151,9.449,11.151z M22.004,22h-2.948v-4.616c0-1.101-0.02-2.517-1.533-2.517 c-1.535,0-1.771,1.199-1.771,2.437V22h-2.948v-9.492h2.83v1.297h0.04c0.394-0.746,1.356-1.533,2.791-1.533 c2.987,0,3.539,1.966,3.539,4.522V22z"></path>
    </svg>
        </a>
        <a href="https://github.com/razielnavarro" class="text-white-500 hover:text-gray-900">
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clip-rule="evenodd"></path>
            </svg>
        </a>
    </div>
</footer>
    </>
  );
}