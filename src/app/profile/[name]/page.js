'use client'
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import { useEffect, useState } from 'react';

export default function Profile() {
  const router = useRouter();
  const { name } = router.query || {};
  const imageUrl = `/api/stats?name=` + name; // Assuming your API route is correctly configured

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <h1>{name}'s Profile</h1>
        {imageUrl && <img src={imageUrl} alt={`${name}'s Fortnite Stats`} />}
      </main>
    </>
  );
}
