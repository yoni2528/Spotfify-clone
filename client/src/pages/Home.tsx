import React, { useEffect, useState } from 'react';
import LongTrackCard from '../components/TrackCards/VerticalArtistCard';
import TrackCard from '../components/TrackCards/TrackCard';
import PageLayout from '../layout/PageLayout/PageLayout';

import { useSelector } from 'react-redux';

import useSpotifyRequest from '../api/useSpotifyRequest';
import ContentBlock from '../layout/ContentBlock/ContentBlock';

const Home = () => {
  const [artistList, setArtistList] = useState<any>([]);
  const [recentTracks, setRecentTracks] = useState<any>([]);

  const { handleGetUserPlaylist } = useSpotifyRequest();

  const accessToken = useSelector((state: any) => state.accessToken.accessToken);

  useEffect(() => {
    if (!accessToken) return;
    handleGetUserPlaylist().then((data: any) => {
      setArtistList(data.artists.artists.items);
      setRecentTracks(data.tracks);
    });
  }, [accessToken]);

  return (
    <PageLayout>
      <ContentBlock title="Loved Artists">
        <div className="grid grid-rows-2 lg:grid-cols-3 md:grid-cols-2 gap-8 mt-12">
          {artistList.slice(1, 7).map((track: any, index: any) => {
            return <LongTrackCard key={index} image={track.images[0]?.url} name={track.name} id={track.id} />;
          })}
        </div>
      </ContentBlock>
      <ContentBlock title="Last Played">
        <div className="grid grid-rows-1 lg:grid-cols-6 gap-8 mt-12 md:grid-cols-4 sm:grid-cols-2 ">
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
    </PageLayout>
  );
};

export default Home;
