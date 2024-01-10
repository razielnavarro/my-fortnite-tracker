import Navbar from './components/Navbar';
import Link from 'next/link';
export default function Home() {
    return (
      <>
        <header>
          <Navbar/>
        </header>
  
        <main className="flex flex-col min-h-screen justify-center items-center">
          <h1>Fortnite Stats Tracker</h1>
          <div className="input-container">
            <input type="text" placeholder="Enter your EPIC name" />
          </div>
        </main>
  
        <footer></footer>
      </>
    );
  }