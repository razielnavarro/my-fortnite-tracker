'use client'
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';

export default function Page() {
  const router = useRouter();
  const { playerName } = router.query || {};

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
       {/* Display the player's image */}
       {playerName && (
          <img
            src={`/api/stats?name=${encodeURIComponent(playerName)}`}
            alt={`Profile of ${playerName}`}
          />
        )}
      </main>
    </>
  );
}