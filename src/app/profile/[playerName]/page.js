'use client'
import { useRouter } from 'next/navigation';
import StatsRetrieval from '@/app/components/StatsRetrieval';
import Navbar from '../../components/Navbar';
import PlayerImage from '../../components/PlayerImage';  // Fix the import with the correct case

export default function Page() {
  const router = useRouter();
  const { playerName } = router.query || {};

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <StatsRetrieval name={playerName}>
          {(imageUrl) => (
            <div className="player-image-container">
              {imageUrl && <img src={imageUrl} alt="Player" />}
            </div>
          )}
        </StatsRetrieval>
      </main>
    </>
  );
}