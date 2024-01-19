import Navbar from './components/Navbar';
import Link from 'next/link';
import StatsRetrieval from './components/StatsRetrieval';

export default function Home() {
  const [playerName, setPlayerName] = useState('');

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
            <input type="text" placeholder="Enter your EPIC name" value = {playerName} onChange={handleInputChange}/>
          </div>
          <StatsRetrieval name={playerName} />
        </main>
  
        <footer></footer>
      </>
    );
  }