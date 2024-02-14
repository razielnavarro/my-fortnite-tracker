import React from 'react';
import Navbar from '../../components/Navbar';

// Profile component
export default function Profile({ name, imageUrl }) {
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
