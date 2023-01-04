import React, { useEffect, useState } from 'react';
import PageLayout from '../layout/PageLayout/PageLayout';

import { useParams } from 'react-router-dom';
import useSpotifyRequest from '../api/useSpotifyRequest';
import VerticalTrackCard from '../components/TrackCards/VerticalTrackCard';

const Albums = () => {
  const params = useParams();
  const [albumTracks, setAlbumTracks] = useState<any>();
  const [album, setAlbum] = useState<any>();

  const { handleGetAlbumData } = useSpotifyRequest();

  useEffect(() => {
    if (!params.id) return;

    handleGetAlbumData(params.id).then((data) => {
      if (!data) return;
      setAlbum(data.album);
      setAlbumTracks(data.tracks);
    });
  }, []);

  return (
    <PageLayout>
      <div className=" flex flex-col gap-6 pl-12 pr-12 pb-12">
        <div className={`flex gap-4 pr-20 pt-10 pb-10 items-center relative`}>
          <img src={album?.images[0].url} className="w-[200px] "></img>
          <div className="flex flex-col gap-6">
            <p className="font-bold text-xs">ALBUM</p>
            <h2 className="font-bold text-5xl">{album?.name}</h2>
            <p className="font text-s">{album && album.artists[0].name}</p>
          </div>
        </div>
        <ul className="flex flex-col gap-4">
          {albumTracks &&
            albumTracks.map((track: any, index: number) => {
              return (
                <li key={index}>
                  <VerticalTrackCard
                    artist={track?.artists[0].name}
                    name={track?.name}
                    id={track?.id}
                    duration_ms={track?.duration_ms}
                    position={track.track_number}
                  />
                </li>
              );
            })}
        </ul>
      </div>
    </PageLayout>
  );
};

export default Albums;
