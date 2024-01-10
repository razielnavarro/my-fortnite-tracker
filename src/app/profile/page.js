import Navbar from '../components/Navbar';
import StatsCard from '../components/StatsCard';
import Link from 'next/link'
export default function page() {
    return (
     <>
        <header>
          <Navbar/>
        </header>
        <main>
          <StatsCard/>
        </main>
        </>
    );
}

function statsCard(){
  return(
    <StatsCard></StatsCard>
  )
};