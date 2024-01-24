import React from 'react';
const PlayerImage = ({ imageUrl }) => {
  return (
    <div className="player-image-container">
      {imageUrl && <img src={imageUrl} alt="Player" />}
    </div>
  );
};

export default PlayerImage;
