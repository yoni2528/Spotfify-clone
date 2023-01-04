import React, { useState } from 'react';
import NewPlayer from './Player';

const PlayerSection = () => {
  const [track, setTrack] = useState<any>({
    name: '',
    artist: '',
    image: ''
  });

  const { name, artist, image } = track;

  const handleTrackDetails = (trackObj: any) => {
    setTrack({
      name: trackObj.name,
      artist: trackObj.artists[0].name,
      image: trackObj.images[0].url,
      id: trackObj.uid
    });
  };

  return (
    <div className="flex items-center justify-end absolute bg-[#181818] border-t-[0.4px] border-gray-700 w-full bottom-0 left-0 h-[90px] lg:justify-center ">
      <div className="flex gap-4 absolute left-5 top-5 ">
        <div
          className="w-12 h-12 bg-cover	rounded-lg"
          style={{
            backgroundImage: `url('${image}')`
          }}></div>
        <div>
          <h3 className="text-sm font-bold">{name}</h3>
          <p className="text-xs mt-1">{artist}</p>
        </div>
      </div>
      <div className="flex w-auto mr-12 lg:mr-0">
        <NewPlayer onTrackChange={handleTrackDetails} />
      </div>
    </div>
  );
};

export default PlayerSection;
