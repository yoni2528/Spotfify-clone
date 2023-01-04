import React, { useEffect, useState } from 'react';
import LongTrackCard from '../components/TrackCards/VerticalArtistCard';
import TrackCard from '../components/TrackCards/TrackCard';
import PageLayout from '../layout/PageLayout/PageLayout';

import { useSelector } from 'react-redux';

import useSpotifyRequest from '../api/useSpotifyRequest';
import ContentBlock from '../layout/ContentBlock/ContentBlock';

const options = ['Artists', 'Playlist', 'Tracks'];

const Library = () => {
  const [artistList, setArtistList] = useState<any>([]);
  const [recentTracks, setRecentTracks] = useState<any>([]);
  const [playlists, setPlaylists] = useState<any>([]);

  const [option, setOption] = useState('Artists');

  const accessToken = useSelector((state: any) => state.accessToken.accessToken);

  const { handleGetUserPlaylist } = useSpotifyRequest();

  useEffect(() => {
    if (!accessToken) return;
    handleGetUserPlaylist().then((data) => {
      if (!data) return;
      setArtistList(data.artists.artists.items);
      setRecentTracks(data.tracks);
      setPlaylists(data.playlists);
    });
  }, [accessToken]);

  const handleOptionChange = (option: any) => {
    setOption(option);
  };

  return (
    <PageLayout>
      <div className=" flex flex-col ">
        <ul className="flex gap-6 mx-8 mt-8">
          {options.map((opt, index) => {
            return (
              <li key={index}>
                <button
                  onClick={() => {
                    handleOptionChange(opt);
                  }}
                  className={`${opt === option ? 'bg-[#333333] ' : null} font-bold px-4 py-2 rounded-lg`}>
                  {opt}
                </button>
              </li>
            );
          })}
        </ul>
        {option === 'Artists' && (
          <ContentBlock title="Artists">
            <div className="grid grid-rows-2 grid-cols-3 gap-8 mt-12">
              {artistList.map((track: any, index: any) => {
                return <LongTrackCard key={index} image={track.images[0]?.url} name={track.name} id={track.id} />;
              })}
            </div>
          </ContentBlock>
        )}

        {option === 'Tracks' && (
          <ContentBlock title="Tracks">
            <div className="grid grid-rows-1 grid-cols-6 gap-8 mt-12 ">
              {recentTracks.map((track: any, index: any) => {
                return (
                  <TrackCard
                    artist={track.track.artists[0].name}
                    key={index}
                    image={track.track.album.images[0].url}
                    name={track.track.name}
                    id={track.track.id}
                    duration_ms={track.track.duration_ms}
                    artistId={track.track.artists[0].id}
                  />
                );
              })}
            </div>
          </ContentBlock>
        )}
        {option === 'Playlist' && (
          <ContentBlock title="Playlists">
            <div className="grid grid-rows-1 grid-cols-6 gap-8 mt-12 ">
              {playlists.map((playlist: any, index: any) => {
                return (
                  <TrackCard
                    key={index}
                    image={playlist.images[0].url}
                    name={playlist.name}
                    id={playlist.id}
                    uri={playlist.uri}
                    type={'playlist'}
                  />
                );
              })}
            </div>
          </ContentBlock>
        )}
      </div>
    </PageLayout>
  );
};

export default Library;
