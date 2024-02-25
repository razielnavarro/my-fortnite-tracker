'use client'
import Navbar from './components/Navbar';
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
  const backgroundImagePath = `/Rarity/${items[0].rarity.toLowerCase()}.png`;

  return (
    <div className="text-center relative" style={{ backgroundImage: `url(${backgroundImagePath})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width: '256px', height: '256px' }}>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <img src={currentImage} alt={items[0].name} className="h-40 w-40 object-cover mb-2" />
        <p className="text-white">{items[0].name}</p>
        <p className="text-green-500">{`${items[0].price} ${items[0].priceIcon}`}</p>
      </div>
    </div>
  );
};

const ItemSection = ({ section, itemShopData }) => {
  return (
    <section key={section.key} className='flex flex-col items-center mt-8'>
      <h2 className="mb-4 text-center text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white">{section.displayName}</h2>
      <div className='grid grid-cols-6 gap-4'>
        {section.items.map((itemId) => {
          const foundItem = itemShopData.featured.find((item) => item.id === itemId);
          return foundItem ? <ItemGroup key={itemId} items={[foundItem]} /> : null;
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

  // Group items by name
  const groupedItems = itemShopData && itemShopData.featured
    ? itemShopData.featured.reduce((groups, item) => {
      const groupName = item.name;
      if (!groups[groupName]) {
        groups[groupName] = [];
      }
      groups[groupName].push(item);
      return groups;
    }, {})
    : {};

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className='min-h-screen bg-backgroundDark'>
        <section className="flex flex-col h-[40vh] justify-center items-center mb-1" style={{ backgroundImage: 'url("/background/background.png")' }}>
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
        <section className='flex flex-col items-center mt-20'>
          <h1 className="mb-4 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">Daily item shop</h1>
          {itemShopData &&
            itemShopData.sections &&
            itemShopData.sections.map((section) => (
              <ItemSection key={section.key} section={section} itemShopData={itemShopData} />
            ))}
        </section>
      </main>
    </>
  );
}