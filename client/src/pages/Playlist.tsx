import React, { useEffect, useState } from 'react';
import PageLayout from '../layout/PageLayout/PageLayout';

import { useParams } from 'react-router-dom';
import useSpotifyRequest from '../api/useSpotifyRequest';
import VerticalTrackCard from '../components/TrackCards/VerticalTrackCard';

const Playlist = () => {
  const params = useParams();
  const [playlist, setPlaylist] = useState<any>();

  const { handleGetPlaylist } = useSpotifyRequest();

  useEffect(() => {
    if (!params.id) return;

    handleGetPlaylist(params.id).then((data) => {
      setPlaylist(data);
    });
  }, []);

  return (
    <PageLayout>
      <div className=" flex flex-col gap-6 pl-12 pr-12 pb-12">
        <div className={`flex gap-4 pr-20 pt-10 pb-10 items-center relative`}>
          <img src={playlist?.images[0].url} className="w-[200px]"></img>
          <div className="flex flex-col gap-6">
            <p className="font-bold text-xs">Playlist</p>
            <h2 className="font-bold text-5xl">{playlist?.name}</h2>
            <p className="font text-s">Total of {playlist && playlist.tracks.total} tracks</p>
          </div>
        </div>
        <ul className="flex flex-col gap-4">
          {playlist &&
            playlist.tracks.items.map((track: any, index: number) => {
              return (
                <li key={index}>
                  <VerticalTrackCard
                    artist={track?.track.artists[0].name}
                    name={track?.track.name}
                    id={track?.track.id}
                    duration_ms={track?.track.duration_ms}
                    position={index + 1}
                  />
                </li>
              );
            })}
        </ul>
      </div>
    </PageLayout>
  );
};

export default Playlist;
