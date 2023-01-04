import React, { useEffect, useState } from 'react';
import PageLayout from '../layout/PageLayout/PageLayout';

import { useParams } from 'react-router-dom';
import useSpotifyRequest from '../api/useSpotifyRequest';
import VerticalTrackCard from '../components/TrackCards/VerticalTrackCard';
import TrackCard from '../components/TrackCards/TrackCard';

const Artist = () => {
  const params = useParams();
  const [artistTracks, setArtistTracks] = useState<any>();
  const [artistAlbums, setArtistAlbums] = useState<any>();
  const [artist, setArtist] = useState<any>();

  const { handleGetArtistData } = useSpotifyRequest();

  useEffect(() => {
    if (!params.id) return;

    handleGetArtistData(params.id).then((data) => {
      if (!data) return;
      setArtist(data.artist);
      setArtistTracks(data.tracks);
      setArtistAlbums(data.albums);
    });
  }, []);
  return (
    <PageLayout>
      <div className=" flex flex-col gap-6 pl-12 pr-12 pb-12">
        <div
          style={{
            backgroundImage: `url("${artist?.images[0].url}")`
          }}
          className={`flex flex-col gap-4 bg-gradient-to-r p-40 bg-cover bg-center relative`}>
          <div className="absolute left-0 top-0 w-full h-full bg-[#4343434b] flex flex-col justify-center gap-4 p-6">
            <h2 className="font-bold text-7xl">{artist?.name}</h2>
            <p className=" text-sm">{artist?.followers.total.toLocaleString()}Followers</p>
          </div>
        </div>
        <h2 className="font-bold text-2xl">Popular</h2>
        <ul className="flex flex-col gap-4">
          {artistTracks &&
            artistTracks.slice(0, 5).map((track: any, index: number) => {
              return (
                <li key={index}>
                  <VerticalTrackCard
                    artist={track.artists[0].name}
                    image={track.album.images[0].url}
                    name={track.name}
                    id={track.id}
                    duration_ms={track.duration_ms}
                  />
                </li>
              );
            })}
        </ul>
        <h2 className="font-bold text-2xl">Discography</h2>
        <div>
          <ul className="grid grid-rows-1 lg:grid-cols-6 md:grid-cols-4 md:grid-cols-2 gap-4  ">
            {artistTracks &&
              artistAlbums.slice(0, 12).map((album: any, index: number) => {
                return (
                  <li key={index}>
                    <TrackCard
                      artist={album.artists[0].name}
                      image={album.images[0].url}
                      name={album.name}
                      id={album.id}
                      duration_ms={album.duration_ms}
                      uri={album.uri}
                      type={'album'}
                    />
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </PageLayout>
  );
};

export default Artist;
